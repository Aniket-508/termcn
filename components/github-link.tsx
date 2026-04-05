import Link from "next/link";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GITHUB, LINK } from "@/constants/links";

const GitHubMark = ({ className }: { className?: string }) => (
  <svg
    aria-hidden
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 1C5.923 1 1 5.923 1 12c0 4.867 3.154 8.986 7.526 10.437.55.1.748-.235.748-.522 0-.257-.009-.934-.014-1.832-3.066.665-3.711-1.477-3.711-1.477-.5-1.27-1.222-1.607-1.222-1.607-.998-.682.076-.668.076-.668 1.103.078 1.683 1.132 1.683 1.132.98 1.678 2.573 1.193 3.199.912.099-.71.383-1.193.697-1.468-2.448-.278-5.02-1.224-5.02-5.455 0-1.205.43-2.189 1.134-2.96-.113-.279-.491-1.397.108-2.91 0 0 .926-.297 3.033 1.131.879-.244 1.822-.366 2.761-.371.936.005 1.88.127 2.762.371 2.105-1.428 3.03-1.131 3.03-1.131.6 1.513.223 2.631.11 2.91.706.771 1.132 1.755 1.132 2.96 0 4.243-2.574 5.173-5.033 5.45.395.34.747 1.01.747 2.037 0 1.468-.013 2.652-.013 3.014 0 .29.196.627.753.52C19.85 20.98 23 16.864 23 12 23 5.923 18.077 1 12 1Z" />
  </svg>
);

export const StarsCount = async () => {
  const data = await fetch(
    `https://api.github.com/repos/${GITHUB.user}/${GITHUB.repo}`,
    {
      next: { revalidate: 86_400 },
    }
  );
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
    <Link href={LINK.GITHUB} target="_blank" rel="noreferrer">
      <GitHubMark className="size-4" />
      <Suspense fallback={<Skeleton className="h-4" />}>
        <StarsCount />
      </Suspense>
    </Link>
  </Button>
);
