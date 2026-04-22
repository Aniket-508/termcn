import { LINK } from "@/constants/links";
import { UTM_PARAMS } from "@/constants/site";
import { addQueryParams } from "@/lib/url";

import { GithubIcon } from "./icons";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const GitHubStars = ({
  stargazersCount,
}: {
  stargazersCount: number;
}) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button asChild size="sm" variant="ghost" sound="click">
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
