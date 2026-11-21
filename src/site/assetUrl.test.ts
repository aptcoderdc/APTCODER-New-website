import { describe, expect, it } from "vitest";
import { siteBase } from "./assetUrl";

describe("site base for public files", () => {
  it("keeps paths absolute on the custom domain, whatever form the root base takes", () => {
    // A relative base ("./") made the logo ask for /school/images/... on /school/ (a 404).
    for (const base of ["", "./", "/"]) expect(siteBase(base)).toBe("");
  });

  it("prefixes a project-site sub-path", () => {
    expect(siteBase("/archive-unpack-and-play/")).toBe("/archive-unpack-and-play");
  });
});
