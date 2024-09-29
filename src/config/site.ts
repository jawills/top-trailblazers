import { env } from "~/env"

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Top Trailblazers",
  description:
    "Check your trailblazer rank with Shadcn components",
  url:
    env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://toptrailblazers.online",
  links: { github: "https://github.com/jawills/top-trailblazers" },
}