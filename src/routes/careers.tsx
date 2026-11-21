import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/site/seo";
import CareersPage from "@/site/pages/CareersPage";

import { useSiteNavigate } from "@/site/useSiteNavigate";

const TITLE = "APTCODER | Careers";
const DESCRIPTION =
  "Careers at APTCODER: see current openings and send us your resume to join the team making technology education accessible to every child.";

export const Route = createFileRoute("/careers")({
  head: () =>
    pageHead({
      path: "/careers",
      title: TITLE,
      description: DESCRIPTION,
    }),
  component: CareersRoute,
});

function CareersRoute() {
  const navigate = useSiteNavigate();
  return <CareersPage navigate={navigate} />;
}
