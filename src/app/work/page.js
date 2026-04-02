import WorkPageClient from "./WorkPageClient";
import { getPortfolioGroups } from "./drivePortfolio";
import { fallbackPortfolioGroups, portfolioRootId } from "./portfolioData";

export const revalidate = 3600;

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
