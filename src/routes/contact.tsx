import { createFileRoute } from "@tanstack/react-router"
import { pageHead } from "@/site/seo"
import ContactPage from "@/site/pages/ContactPage"

import { useSiteNavigate } from "@/site/useSiteNavigate"

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead({
      path: "/contact",
      title: "APTCODER | Contact Us",
      description: "Get in touch with APTCODER to book a class or partner with us.",
    }),
  component: () => {
    const navigate = useSiteNavigate()
    return <><ContactPage navigate={navigate} /></>
  },
})
