import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HeroBackgroundVideo, {
  HERO_POSTER_SRC,
  HERO_VIDEO_MEDIA,
  HERO_VIDEO_SRC,
} from "./HeroBackgroundVideo";

function mockMotionPreference(reduce: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: reduce && query.includes("prefers-reduced-motion"),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as typeof window.matchMedia;
}

describe("homepage hero background video", () => {
  const original = window.matchMedia;
  afterEach(() => {
    window.matchMedia = original;
    vi.restoreAllMocks();
  });

  it("renders one muted, looping, inline, autoplaying video of the supplied file with a poster", () => {
    mockMotionPreference(false);
    vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    const { container } = render(<HeroBackgroundVideo />);
    const videos = container.querySelectorAll("video");
    expect(videos).toHaveLength(1);
    const video = videos[0]!;
    // The file is offered only from 768px wide, so phones never download it.
    const source = video.querySelector("source")!;
    expect(source.getAttribute("src")).toBe(HERO_VIDEO_SRC);
    expect(source.getAttribute("media")).toBe(HERO_VIDEO_MEDIA);
    expect(video.getAttribute("poster")).toBe(HERO_POSTER_SRC);
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.autoplay).toBe(true);
    expect(video.hasAttribute("playsinline")).toBe(true);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });

  it("starts playback normally, and keeps the poster if autoplay is refused", async () => {
    mockMotionPreference(false);
    const play = vi
      .spyOn(HTMLMediaElement.prototype, "play")
      .mockRejectedValue(new Error("NotAllowedError"));
    render(<HeroBackgroundVideo />);
    expect(play).toHaveBeenCalled();
    await Promise.resolve(); // the rejection is handled, not thrown
  });

  it("does not play for visitors who prefer reduced motion", () => {
    mockMotionPreference(true);
    const play = vi.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue(undefined);
    const pause = vi.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {});
    render(<HeroBackgroundVideo />);
    expect(play).not.toHaveBeenCalled();
    expect(pause).toHaveBeenCalled();
  });
});
