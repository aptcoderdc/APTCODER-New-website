import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/site/seo";
import VernaticsPage from "@/site/pages/VernaticsPage";

import { useSiteNavigate } from "@/site/useSiteNavigate";

const TITLE = "APTCODER | Vernatics Robotics";
const DESCRIPTION =
  "With Vernatics by APTCODER, children learn coding by programming a real robot: make it move, explore sensors, light up its LED matrix and watch their instructions come to life.";

export const Route = createFileRoute("/vernatics")({
  head: () =>
    pageHead({
      path: "/vernatics",
      title: TITLE,
      description: DESCRIPTION,
      image: {
        url: "/videos/vernatics-poster.jpg",
        width: 960,
        height: 540,
        alt: "The Vernatics coding robot",
      },
    }),
  component: VernaticsRoute,
});

function VernaticsRoute() {
  const navigate = useSiteNavigate();
  return <VernaticsPage navigate={navigate} />;
}
