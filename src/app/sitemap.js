import { siteUrl } from "../lib/site";

export const dynamic = "force-static";

const routes = [
  {
    url: siteUrl,
    priority: 1,
  },
  {
    url: `${siteUrl}/work/`,
    priority: 0.9,
  },
];

export default function sitemap() {
  return routes.map((route) => ({
    ...route,
    lastModified: new Date(),
    changeFrequency: "weekly",
  }));
}
