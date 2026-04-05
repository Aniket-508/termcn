"use client";

import type { LinkProps } from "next/link";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ROUTES } from "@/constants/routes";
import type { source } from "@/lib/source";
import { cn } from "@/lib/utils";

const TOP_LEVEL_SECTIONS = [
  { href: ROUTES.DOCS, name: "Get Started" },
  {
    href: ROUTES.DOCS_COMPONENTS,
    name: "Components",
  },
  {
    href: ROUTES.DOCS_REGISTRY,
    name: "Registry",
  },
  {
    href: ROUTES.DOCS_MCP,
    name: "MCP Server",
  },
];

const MobileLink = ({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: LinkProps & {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    router.push(href.toString());
    onOpenChange?.(false);
  }, [router, href, onOpenChange]);

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn("text-2xl font-medium", className)}
      {...props}
    >
      {children}
    </Link>
  );
};

export const MobileNav = ({
  tree,
  items,
  className,
}: {
  tree: typeof source.pageTree;
  items: { href: string; label: string }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 !p-0 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className
          )}
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] -rotate-45" : "top-1"
                )}
              />
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-0.5 w-4 transition-all duration-100",
                  open ? "top-[0.4rem] rotate-45" : "top-2.5"
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
          <span className="flex h-8 items-center text-lg leading-none font-medium">
            Menu
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) overflow-y-auto rounded-none border-none p-0 shadow-none backdrop-blur duration-100"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-12 overflow-auto px-6 py-6">
          <div className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              Menu
            </div>
            <div className="flex flex-col gap-3">
              <MobileLink href={ROUTES.HOME} onOpenChange={setOpen}>
                Home
              </MobileLink>
              {items.map((item) => (
                <MobileLink
                  key={item.href}
                  href={item.href}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-muted-foreground text-sm font-medium">
              Sections
            </div>
            <div className="flex flex-col gap-3">
              {TOP_LEVEL_SECTIONS.map(({ name, href }) => (
                <MobileLink key={name} href={href} onOpenChange={setOpen}>
                  {name}
                </MobileLink>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-8">
            {tree?.children?.map((group) => {
              if (group.type === "folder") {
                return (
                  <div key={group.$id} className="flex flex-col gap-4">
                    <div className="text-muted-foreground text-sm font-medium">
                      {group.name}
                    </div>
                    <div className="flex flex-col gap-3">
                      {group.children.map((item) => {
                        if (item.type === "page") {
                          return (
                            <MobileLink
                              key={`${item.url}-${group.$id}`}
                              href={item.url}
                              onOpenChange={setOpen}
                            >
                              {item.name}
                            </MobileLink>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
