import Link from "next/link";

import { CommandMenu } from "@/components/command-menu";
import { GitHubLink } from "@/components/github-link";
import { LogoMark } from "@/components/logo";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeSwitcher } from "@/components/mode-switcher";
import { SponsorLink } from "@/components/sponsor-link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { SITE } from "@/constants/site";
import { source } from "@/lib/source";

const navItems = [
  { href: ROUTES.DOCS, label: "Docs" },
  { href: ROUTES.DOCS_COMPONENTS, label: "Components" },
  { href: ROUTES.DOCS_TEMPLATES, label: "Templates" },
];

export const SiteHeader = () => {
  const { pageTree } = source;

  return (
    <header className="bg-background sticky top-0 z-50 w-full">
      <div className="container-wrapper 3xl:fixed:px-0 px-6">
        <div className="3xl:fixed:container flex h-(--header-height) items-center gap-2">
          <MobileNav
            tree={pageTree}
            items={navItems}
            className="flex lg:hidden"
          />
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden size-8 lg:flex"
          >
            <Link href="/">
              <LogoMark className="size-5" />
              <span className="sr-only">{SITE.NAME}</span>
            </Link>
          </Button>
          <MainNav items={navItems} className="hidden lg:flex" />
          <div className="ml-auto flex items-center gap-2 md:flex-1 md:justify-end">
            <div className="hidden w-full flex-1 md:flex md:w-auto md:flex-none">
              <CommandMenu tree={pageTree} navItems={navItems} />
            </div>
            <GitHubLink />
            <SponsorLink />
            <ModeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
