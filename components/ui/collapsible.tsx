"use client";

import { useSound } from "@web-kits/audio/react";
import { Collapsible as CollapsiblePrimitive } from "radix-ui";
import { useCallback, useRef } from "react";

import { collapse, expand } from "@/audio/core";

const Collapsible = ({
  onOpenChange,
  sounds = false,
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.Root> & {
  sounds?: boolean;
}) => {
  const playExpand = useSound(expand);
  const playCollapse = useSound(collapse);
  const wasOpen = useRef(false);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (sounds) {
        if (open && !wasOpen.current) {
          playExpand();
        } else if (!open && wasOpen.current) {
          playCollapse();
        }
        wasOpen.current = open;
      }
      onOpenChange?.(open);
    },
    [onOpenChange, playCollapse, playExpand, sounds]
  );

  if (!sounds) {
    return (
      <CollapsiblePrimitive.Root
        data-slot="collapsible"
        onOpenChange={onOpenChange}
        {...props}
      />
    );
  }

  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible"
      onOpenChange={handleOpenChange}
      {...props}
    />
  );
};

const CollapsibleTrigger = ({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleTrigger>) => (
  <CollapsiblePrimitive.CollapsibleTrigger
    data-slot="collapsible-trigger"
    {...props}
  />
);

const CollapsibleContent = ({
  ...props
}: React.ComponentProps<typeof CollapsiblePrimitive.CollapsibleContent>) => (
  <CollapsiblePrimitive.CollapsibleContent
    data-slot="collapsible-content"
    {...props}
  />
);

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
