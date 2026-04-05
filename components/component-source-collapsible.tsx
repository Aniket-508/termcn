"use client";

import { ChevronDownIcon } from "lucide-react";
import { useCallback, useState } from "react";

import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ComponentSourceCollapsible = ({
  code,
  highlightedCode,
  title,
}: {
  code: string;
  highlightedCode: string;
  title?: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = useCallback(() => {
    setExpanded(true);
  }, []);

  return (
    <figure className="group bg-code text-code-foreground relative mt-6 overflow-hidden rounded-lg text-sm">
      {title && (
        <figcaption className="border-border/50 text-muted-foreground border-b px-4 py-2 text-sm">
          {title}
        </figcaption>
      )}
      <div className="relative">
        <CopyButton
          value={code}
          className="absolute top-3 right-2 z-10 size-7 opacity-70 hover:opacity-100"
        />
        <div
          className={cn(
            "overflow-hidden [&_span]:text-(--shiki-light) dark:[&_span]:text-(--shiki-dark)",
            expanded ? "max-h-[450px] overflow-auto" : "max-h-[120px]"
          )}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
        {!expanded && (
          <div className="from-code absolute inset-x-0 bottom-0 flex items-end justify-center bg-linear-to-t from-90% pb-2 pt-12">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExpand}
              className="gap-1"
            >
              View Code
              <ChevronDownIcon className="size-3.5" />
            </Button>
          </div>
        )}
      </div>
    </figure>
  );
};
