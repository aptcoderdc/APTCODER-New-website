import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/site/seo";
import LegalPage from "@/site/components/legal/LegalPage";
import { privacyPolicy } from "@/site/data/legal/privacyPolicy";

const TITLE = "APTCODER | Privacy Policy";
const DESCRIPTION =
  "How SNN EDUWORLD Private Limited (APTCODER) collects, uses, shares and protects your personal information.";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    pageHead({
      path: "/privacy-policy",
      title: TITLE,
      description: DESCRIPTION,
    }),
  component: PrivacyPolicyRoute,
});

function PrivacyPolicyRoute() {
  return <LegalPage document={privacyPolicy} />;
}
