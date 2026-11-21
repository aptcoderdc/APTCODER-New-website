import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/site/seo";
import LegalPage from "@/site/components/legal/LegalPage";
import { termsAndConditions } from "@/site/data/legal/termsAndConditions";

const TITLE = "APTCODER | Terms & Conditions";
const DESCRIPTION =
  "The terms and conditions for accessing and using APTCODER’s website, applications and services.";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () =>
    pageHead({
      path: "/terms-and-conditions",
      title: TITLE,
      description: DESCRIPTION,
    }),
  component: TermsRoute,
});

function TermsRoute() {
  return <LegalPage document={termsAndConditions} />;
}
