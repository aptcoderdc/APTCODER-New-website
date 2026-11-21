import { createFileRoute } from "@tanstack/react-router"
import { pageHead } from "@/site/seo"
import AboutPage from "@/site/pages/AboutPage"

import { useSiteNavigate } from "@/site/useSiteNavigate"

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      path: "/about",
      title: "APTCODER | About Us",
      description: "Learn about APTCODER's mission to teach kids coding and future-ready skills.",
    }),
  component: () => {
    const navigate = useSiteNavigate()
    return <><AboutPage navigate={navigate} /></>
  },
})
