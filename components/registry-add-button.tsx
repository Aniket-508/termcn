"use client";

import { PlusIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { CodeBlockCommand } from "@/components/code-block-command";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

export const RegistryAddButton = ({
  children,
  className,
  registry,
  size = "sm",
  variant = "ghost",
  onClick,
  ...props
}: {
  registry: { name: string } | string;
} & Omit<React.ComponentProps<typeof Button>, "children"> & {
    children?: React.ReactNode;
  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const registryName = typeof registry === "string" ? registry : registry.name;

  const commands = useMemo(
    () => ({
      bun: `bunx --bun shadcn@latest registry add ${registryName}`,
      npm: `npx shadcn@latest registry add ${registryName}`,
      pnpm: `pnpm dlx shadcn@latest registry add ${registryName}`,
      yarn: `yarn shadcn@latest registry add ${registryName}`,
    }),
    [registryName]
  );

  const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackEvent({
      name: "click_registry_add_button",
      properties: {
        registry: registryName,
      },
    });
    onClick?.(e);
  };

  const trigger = (
    <Button
      size={size}
      variant={variant}
      className={cn(className)}
      onClick={handleTriggerClick}
      {...props}
    >
      {children ?? (
        <>
          <PlusIcon />
          <span className="hidden sm:inline">Add</span>
        </>
      )}
    </Button>
  );

  return (
    <>
      {isMobile ? (
        <Drawer open={isOpen} onOpenChange={setIsOpen} sounds>
          <DrawerTrigger asChild>{trigger}</DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Add Registry</DrawerTitle>
              <DrawerDescription>
                Run this command to add {registryName} to your project.
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <CodeBlockCommand
                __bun__={commands.bun}
                __npm__={commands.npm}
                __pnpm__={commands.pnpm}
                __yarn__={commands.yarn}
                copyEvent="copy_registry_command"
              />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button size="sm">Done</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen} sounds>
          <DialogTrigger asChild>{trigger}</DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Registry</DialogTitle>
              <DialogDescription className="text-balance">
                Run this command to add {registryName} to your project.
              </DialogDescription>
            </DialogHeader>
            <CodeBlockCommand
              __bun__={commands.bun}
              __npm__={commands.npm}
              __pnpm__={commands.pnpm}
              __yarn__={commands.yarn}
              copyEvent="copy_registry_command"
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button size="sm">Done</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
