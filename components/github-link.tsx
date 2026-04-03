import { IconBrandGithub } from "@tabler/icons-react"
import Link from "next/link"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { siteConfig } from "@/lib/config"

export function GitHubLink() {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <IconBrandGithub className="size-4" />
        <React.Suspense fallback={<Skeleton className="h-4" />}>
          <StarsCount />
        </React.Suspense>
      </Link>
    </Button>
  )
}

export async function StarsCount() {
  const repoPath = siteConfig.links.github.replace("https://github.com/", "")
  const data = await fetch(`https://api.github.com/repos/${repoPath}`, {
    next: { revalidate: 86400 }, // Cache for 1 day (86400 seconds)
  })
  const json = await data.json()

  return (
    <span className="text-muted-foreground text-xs tabular-nums">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : (json.stargazers_count?.toLocaleString() ?? "0")}
    </span>
  )
}
