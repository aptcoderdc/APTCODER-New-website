import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/site/seo";
import CnatPage from "@/site/pages/CnatPage";

import { useSiteNavigate } from "@/site/useSiteNavigate";

const TITLE = "APTCODER | C-NAT Coding Olympiad";
const DESCRIPTION =
  "C-NAT is India’s Coding Olympiad by APTCODER: choose your track, take the challenge and earn recognition. Think. Code. Compete. Get Recognised.";

export const Route = createFileRoute("/c-nat")({
  head: () =>
    pageHead({
      path: "/c-nat",
      title: TITLE,
      description: DESCRIPTION,
    }),
  component: CnatRoute,
});

function CnatRoute() {
  const navigate = useSiteNavigate();
  return <CnatPage navigate={navigate} />;
}
