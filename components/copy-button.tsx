"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import type { Event } from "@/lib/events";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export const CopyButton = ({
  value,
  className,
  variant = "ghost",
  event,
  children,
  ...props
}: React.ComponentProps<typeof Button> & {
  value: string;
  src?: string;
  event?: Event["name"];
}) => {
  const { copyToClipboard, isCopied } = useCopyToClipboard({
    onCopy: () => {
      if (event) {
        trackEvent({
          name: event,
          properties: {
            code: value,
          },
        });
      }
    },
    timeout: 1000,
  });

  const handleCopy = useCallback(async () => {
    await copyToClipboard(value);
  }, [value, copyToClipboard]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot="copy-button"
          size={children ? "sm" : "icon"}
          variant={variant}
          className={cn(
            children
              ? ""
              : "bg-code absolute top-3 right-2 z-10 size-7 hover:opacity-100 focus-visible:opacity-100",
            className
          )}
          onClick={handleCopy}
          {...props}
        >
          <span className="sr-only">Copy</span>
          {isCopied ? (
            <CheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {isCopied ? "Copied" : "Copy to Clipboard"}
      </TooltipContent>
    </Tooltip>
  );
};
