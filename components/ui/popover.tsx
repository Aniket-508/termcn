"use client";

import { useSound } from "@web-kits/audio/react";
import { Popover as PopoverPrimitive } from "radix-ui";
import { useCallback, useRef } from "react";

import { dropdownClose, dropdownOpen } from "@/audio/core";
import { cn } from "@/lib/utils";

const Popover = ({
  onOpenChange,
  sounds = false,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root> & {
  sounds?: boolean;
}) => {
  const playOpen = useSound(dropdownOpen);
  const playClose = useSound(dropdownClose);
  const wasOpen = useRef(false);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (sounds) {
        if (open && !wasOpen.current) {
          playOpen();
        } else if (!open && wasOpen.current) {
          playClose();
        }
        wasOpen.current = open;
      }
      onOpenChange?.(open);
    },
    [onOpenChange, playClose, playOpen, sounds]
  );

  if (!sounds) {
    return (
      <PopoverPrimitive.Root
        data-slot="popover"
        onOpenChange={onOpenChange}
        {...props}
      />
    );
  }

  return (
    <PopoverPrimitive.Root
      data-slot="popover"
      onOpenChange={handleOpenChange}
      {...props}
    />
  );
};

const PopoverTrigger = ({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) => (
  <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
);

const PopoverContent = ({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      data-slot="popover-content"
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
);

const PopoverAnchor = ({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) => (
  <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
);

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger };
