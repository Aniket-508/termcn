import { findNeighbour } from "fumadocs-core/page-tree";
import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsTableOfContents } from "@/components/docs-toc";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatTitleFromSlug } from "@/lib/docs";
import { getPageImage, source } from "@/lib/source";
import { absoluteUrl } from "@/lib/utils";
import { mdxComponents } from "@/mdx-components";
import { BreadcrumbJsonLd } from "@/seo/json-ld";
import { createPageMetadata } from "@/seo/metadata";

export const revalidate = false;
export const dynamic = "force-static";
export const dynamicParams = false;

export const generateStaticParams = () => source.generateParams();

export const generateMetadata = async (props: {
  params: Promise<{ slug?: string[] }>;
}) => {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const doc = page.data;
  const ogImage = getPageImage(page).url;

  return createPageMetadata({
    description: doc.description,
    ogImage,
    ogType: "article",
    path: page.url,
    title: doc.title,
  });
};

const buildBreadcrumbs = (
  slugs: string[],
  pageTitle: string,
  pageUrl: string
) => {
  const items: { name: string; path: string }[] = [{ name: "Home", path: "/" }];

  if (slugs.length === 0) {
    items.push({ name: pageTitle, path: pageUrl });
    return items;
  }

  items.push({ name: "Docs", path: "/docs" });

  let currentPath = "/docs";
  for (let i = 0; i < slugs.length - 1; i += 1) {
    currentPath += `/${slugs[i]}`;
    items.push({ name: formatTitleFromSlug(slugs[i]), path: currentPath });
  }

  items.push({ name: pageTitle, path: pageUrl });
  return items;
};

const Page = async (props: { params: Promise<{ slug?: string[] }> }) => {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) {
    notFound();
  }

  const doc = page.data;
  const MdxContent = doc.body;
  const neighbours = await findNeighbour(source.pageTree, page.url);
  const raw = await page.data.getText("raw");

  const { links } = doc as { links?: { doc?: string; api?: string } };
  const breadcrumbs = buildBreadcrumbs(page.slugs, doc.title, page.url);

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <div
        data-slot="docs"
        className="flex items-stretch text-[1.05rem] sm:text-[15px] xl:w-full"
      >
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="h-(--top-spacing) shrink-0" />
          <div className="mx-auto flex w-full max-w-2xl min-w-0 flex-1 flex-col gap-8 px-4 py-6 text-neutral-800 md:px-0 lg:py-8 dark:text-neutral-300">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight sm:text-3xl xl:text-4xl">
                    {doc.title}
                  </h1>
                  <div className="docs-nav flex items-center gap-2">
                    <div className="hidden sm:block">
                      <DocsCopyPage page={raw} url={absoluteUrl(page.url)} />
                    </div>
                    <div className="ml-auto flex gap-2">
                      {neighbours.previous && (
                        <Button
                          variant="secondary"
                          size="icon"
                          className="extend-touch-target size-8 shadow-none md:size-7"
                          asChild
                        >
                          <Link href={neighbours.previous.url}>
                            <ArrowLeftIcon />
                            <span className="sr-only">Previous</span>
                          </Link>
                        </Button>
                      )}
                      {neighbours.next && (
                        <Button
                          variant="secondary"
                          size="icon"
                          className="extend-touch-target size-8 shadow-none md:size-7"
                          asChild
                        >
                          <Link href={neighbours.next.url}>
                            <span className="sr-only">Next</span>
                            <ArrowRightIcon />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {doc.description && (
                  <p className="text-muted-foreground text-[1.05rem] text-balance sm:text-base">
                    {doc.description}
                  </p>
                )}
              </div>
              {links ? (
                <div className="flex items-center space-x-2 pt-4">
                  {links?.doc && (
                    <Badge asChild variant="secondary">
                      <Link href={links.doc} target="_blank" rel="noreferrer">
                        Docs <ArrowUpRightIcon />
                      </Link>
                    </Badge>
                  )}
                  {links?.api && (
                    <Badge asChild variant="secondary">
                      <Link href={links.api} target="_blank" rel="noreferrer">
                        API Reference <ArrowUpRightIcon />
                      </Link>
                    </Badge>
                  )}
                </div>
              ) : null}
            </div>
            <div className="w-full flex-1 *:data-[slot=alert]:first:mt-0">
              <MdxContent components={mdxComponents} />
            </div>
          </div>
          <div className="mx-auto hidden h-16 w-full max-w-2xl items-center gap-2 px-4 sm:flex md:px-0">
            {neighbours.previous && (
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="shadow-none"
              >
                <Link href={neighbours.previous.url}>
                  <ArrowLeftIcon /> {neighbours.previous.name}
                </Link>
              </Button>
            )}
            {neighbours.next && (
              <Button
                variant="secondary"
                size="sm"
                className="ml-auto shadow-none"
                asChild
              >
                <Link href={neighbours.next.url}>
                  {neighbours.next.name} <ArrowRightIcon />
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[calc(100svh-var(--footer-height)+2rem)] w-72 flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
          <div className="h-(--top-spacing) shrink-0" />
          {doc.toc?.length ? (
            <div className="no-scrollbar overflow-y-auto px-8">
              <DocsTableOfContents toc={doc.toc} />
              <div className="h-12" />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Page;
