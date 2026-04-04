"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Event } from "@/lib/events";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export const copyToClipboardWithMeta = (value: string, event?: Event) => {
  navigator.clipboard.writeText(value);
  if (event) {
    trackEvent(event);
  }
};

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
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => setHasCopied(false), 1000);
  }, []);

  const handleCopy = useCallback(() => {
    copyToClipboardWithMeta(
      value,
      event
        ? {
            name: event,
            properties: {
              code: value,
            },
          }
        : undefined
    );
    setHasCopied(true);
  }, [value, event]);

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
          {hasCopied ? (
            <CheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {hasCopied ? "Copied" : "Copy to Clipboard"}
      </TooltipContent>
    </Tooltip>
  );
};
