import { unstable_cache } from "next/cache";

import { GITHUB } from "@/constants/links";

import { GitHubStars } from "./github-stars";

const getStargazerCount = unstable_cache(
  async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB.user}/${GITHUB.repo}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      if (!response.ok) {
        return 0;
      }

      const json = (await response.json()) as { stargazers_count?: number };
      return Number(json?.stargazers_count) || 0;
    } catch {
      return 0;
    }
  },
  ["github-stargazer-count"],
  { revalidate: 86_400 }
);

export const NavItemGithub = async () => {
  const stargazersCount = await getStargazerCount();

  return <GitHubStars stargazersCount={stargazersCount} />;
};
