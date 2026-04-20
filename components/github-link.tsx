import { unstable_cache } from "next/cache";

import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { GITHUB, LINK } from "@/constants/links";
import { UTM_PARAMS } from "@/constants/site";
import { addQueryParams } from "@/lib/url";

import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const getStargazerCount = unstable_cache(
  async () => {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB.user}/${GITHUB.repo}`,
        {
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
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

export const GitHubLink = async () => {
  const stargazersCount = await getStargazerCount();

  return (
    <Tooltip>
      <TooltipTrigger>
        <Button asChild size="sm" variant="ghost">
          <a
            href={addQueryParams(LINK.GITHUB, UTM_PARAMS)}
            target="_blank"
            rel="noopener"
          >
            <GithubIcon className="-translate-y-px" />
            <span className="text-xs text-muted-foreground tabular-nums">
              {new Intl.NumberFormat("en-US", {
                compactDisplay: "short",
                notation: "compact",
              })
                .format(stargazersCount)
                .toLowerCase()}
            </span>
          </a>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {new Intl.NumberFormat("en-US").format(stargazersCount)} stars
      </TooltipContent>
    </Tooltip>
  );
};
