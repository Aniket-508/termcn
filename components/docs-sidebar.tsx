"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import type { DocsConfig } from "@/lib/docs";

export const DocsSidebar = ({
  tree,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  tree: DocsConfig["sidebarNav"];
}) => {
  const pathname = usePathname();

  return (
    <Sidebar
      className="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--header-height)-var(--footer-height))] bg-transparent lg:flex"
      collapsible="none"
      {...props}
    >
      <SidebarContent className="no-scrollbar px-2 pb-12">
        <div className="h-(--top-spacing) shrink-0" />
        {tree.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-muted-foreground font-medium">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-0.5">
                {group.items.map((navItem) => (
                  <SidebarMenuItem key={navItem.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={navItem.href === pathname}
                      className="data-[active=true]:bg-accent data-[active=true]:border-accent relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                    >
                      <Link href={navItem.href ?? ""}>{navItem.title}</Link>
                    </SidebarMenuButton>
                    {navItem.items?.length ? (
                      <SidebarMenuSub>
                        {navItem.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              isActive={subItem.href === pathname}
                              className="data-[active=true]:bg-accent data-[active=true]:border-accent relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md"
                            >
                              <Link href={subItem.href ?? ""}>
                                {subItem.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
};
