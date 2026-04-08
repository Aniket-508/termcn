import Link from "next/link";

import { formatTitleFromSlug, getDocsRoute } from "@/lib/docs";
import type { ExampleFramework } from "@/lib/examples";
import { cn } from "@/lib/utils";

export const ComponentPreviewTabs = ({
  className,
  framework,
  frameworks,
  slug,
}: {
  className?: string;
  framework: ExampleFramework;
  frameworks: readonly ExampleFramework[];
  slug: string[];
}) => (
  <div className={cn("inline-flex w-full items-center gap-6", className)}>
    {frameworks.map((item) => (
      <Link
        key={item}
        href={getDocsRoute(slug, item)}
        data-active={framework === item}
        className="relative inline-flex items-center justify-center gap-1 pt-1 pb-0.5 text-base font-medium text-muted-foreground transition-colors after:absolute after:inset-x-0 after:bottom-[-4px] after:h-0.5 after:bg-foreground after:opacity-0 after:transition-opacity hover:text-foreground data-[active=true]:text-foreground data-[active=true]:after:opacity-100"
      >
        {formatTitleFromSlug(item)}
      </Link>
    ))}
  </div>
);
