import { createFileRoute } from "@tanstack/react-router"
import { pageHead } from "@/site/seo"
import SchoolPage from "@/site/pages/SchoolPage"

import { useSiteNavigate } from "@/site/useSiteNavigate"

export const Route = createFileRoute("/school")({
  head: () =>
    pageHead({
      path: "/school",
      title: "APTCODER | For Schools",
      description: "Bring APTCODER's coding and AI curriculum to your school.",
    }),
  component: () => {
    const navigate = useSiteNavigate()
    return <><SchoolPage navigate={navigate} /></>
  },
})
