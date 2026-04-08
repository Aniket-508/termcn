import type { Node as PageTreeNode } from "fumadocs-core/page-tree";

import { DEFAULT_DOCS_FRAMEWORK, isDocsFramework } from "@/lib/docs";
import type { ExampleFramework } from "@/lib/examples";

export type PageTreeFolder = Extract<PageTreeNode, { type: "folder" }>;
export type PageTreePage = Extract<PageTreeNode, { type: "page" }>;

export const getPagesFromFolder = (folder: PageTreeFolder): PageTreePage[] => {
  const pages: PageTreePage[] = [];

  for (const child of folder.children) {
    if (child.type === "page") {
      pages.push(child);
    } else if (child.type === "folder") {
      pages.push(...getPagesFromFolder(child));
    }
  }

  return pages;
};

export const getCurrentFramework = (pathname: string): ExampleFramework => {
  const frameworkMatch = pathname.match(/\/docs\/components\/(ink|opentui)\//);

  return frameworkMatch && isDocsFramework(frameworkMatch[1])
    ? frameworkMatch[1]
    : DEFAULT_DOCS_FRAMEWORK;
};
