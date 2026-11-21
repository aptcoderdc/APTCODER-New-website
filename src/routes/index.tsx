import { createFileRoute } from "@tanstack/react-router"
import { pageHead, organizationJsonLd, websiteJsonLd } from "@/site/seo"
import HomePage from "@/site/pages/HomePage"
import CredibilityStrip from "@/site/components/CredibilityStrip"
import { useSiteNavigate } from "@/site/useSiteNavigate"

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      path: "/",
      title: "APTCODER | Home",
      description: "Live coding, AI and app development classes for school students, in English and Hindi.",
      jsonLd: [organizationJsonLd(), websiteJsonLd()],
    }),
  component: () => {
    const navigate = useSiteNavigate()
    return <><CredibilityStrip /><HomePage navigate={navigate} /></>
  },
})
