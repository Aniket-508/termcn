import { LINK } from "@/constants/links";
import { SITE } from "@/constants/site";

export const SiteFooter = () => (
  <footer className="group-has-[.section-soft]/body:bg-surface/40 3xl:fixed:bg-transparent group-has-[.docs-nav]/body:pb-20 group-has-[.docs-nav]/body:sm:pb-0 dark:bg-transparent">
    <div className="container-wrapper px-4 xl:px-6">
      <div className="flex h-(--footer-height) items-center justify-between">
        <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
          Built by{" "}
          <a
            href={LINK.PORTFOLIO}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {SITE.author.name}
          </a>
          . The source code is available on{" "}
          <a
            href={LINK.GITHUB}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </div>
      </div>
    </div>
  </footer>
);
