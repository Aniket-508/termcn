import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/lib/config";

export const StarsCount = async () => {
  const repoPath = siteConfig.links.github.replace("https://github.com/", "");
  // Cache for 1 day (86400 seconds)
  const data = await fetch(`https://api.github.com/repos/${repoPath}`, {
    next: { revalidate: 86_400 },
  });
  const json = await data.json();

  return (
    <span className="text-muted-foreground text-xs tabular-nums">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : (json.stargazers_count?.toLocaleString() ?? "0")}
    </span>
  );
};

export const GitHubLink = () => (
  <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
    <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
      <IconBrandGithub className="size-4" />
      <React.Suspense fallback={<Skeleton className="h-4" />}>
        <StarsCount />
      </React.Suspense>
    </Link>
  </Button>
);
