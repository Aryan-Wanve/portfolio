import WorkPageClient from "./WorkPageClient";
import { getPortfolioGroups } from "./drivePortfolio";
import { fallbackPortfolioGroups, portfolioRootId } from "./portfolioData";

export const metadata = {
  title: "Portfolio Work",
  description:
    "Browse Aryan Wanve's video portfolio across ads, brand films, cinematic edits, events, talking head videos, short films, and motion-led visual work.",
  alternates: {
    canonical: "/work/",
  },
  openGraph: {
    title: "Aryan Wanve Portfolio Work",
    description:
      "A browsable video portfolio of ads, brand films, events, cinematic edits, and creator-led visual work by Aryan Wanve.",
    url: "/work/",
  },
};

export default async function WorkPage() {
  const groups = await getPortfolioGroups();
  const isDynamic = groups !== fallbackPortfolioGroups;

  return (
    <WorkPageClient
      groups={groups}
      portfolioRootId={portfolioRootId}
      isDynamic={isDynamic}
    />
  );
}
