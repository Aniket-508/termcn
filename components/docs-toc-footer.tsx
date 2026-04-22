"use client";

import { Button } from "@/components/ui/button";
import { LINK } from "@/constants/links";
import { UTM_PARAMS } from "@/constants/site";
import { useFeedback } from "@/hooks/use-feedback";
import { addQueryParams } from "@/lib/url";
import { cn } from "@/lib/utils";

export const DocsTocFooter = ({ className }: React.ComponentProps<"div">) => {
  const playClick = useFeedback({ haptic: false, sound: "click" });

  return (
    <div
      className={cn(
        "group relative flex flex-col gap-2 rounded-lg bg-surface p-6 text-sm text-surface-foreground",
        className
      )}
    >
      <div className="text-base leading-tight font-semibold text-balance group-hover:underline">
        Beautiful emails, made simple
      </div>
      <p className="text-muted-foreground leading-snug">
        Ready-to-use React components for the email, built on <u>React Email</u>
        , distributed via shadcn.
      </p>
      <Button variant="outline" size="sm" className="mt-2">
        Go to emailcn.dev
      </Button>
      <a
        href={addQueryParams(LINK.EMAILCN, UTM_PARAMS)}
        target="_blank"
        rel="noreferrer"
        className="absolute inset-0 rounded-lg"
        aria-hidden
        tabIndex={-1}
        onClick={playClick}
      >
        <span className="sr-only">
          Open EmailCN components documentation (emailcn.dev)
        </span>
      </a>
    </div>
  );
};
