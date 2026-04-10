import type { Node as PageTreeNode } from "fumadocs-core/page-tree";

import { PUBLIC_BASE_NAME } from "@/registry/bases";

export type PageTreeFolder = Extract<PageTreeNode, { type: "folder" }>;
export type PageTreePage = Extract<PageTreeNode, { type: "page" }>;

export const getAllPagesFromFolder = (
  folder: PageTreeFolder
): PageTreePage[] => {
  const pages: PageTreePage[] = [];

  for (const child of folder.children) {
    if (child.type === "page") {
      pages.push(child);
    } else if (child.type === "folder") {
      pages.push(...getAllPagesFromFolder(child));
    }
  }

  return pages;
};

const matchesBase = (folder: PageTreeFolder, base: string): boolean =>
  folder.$id === base ||
  (typeof folder.name === "string" && folder.name.toLowerCase() === base);

export const getCategoryFoldersForBase = (
  componentsFolder: PageTreeFolder,
  currentBase: string
): PageTreeFolder[] => {
  for (const child of componentsFolder.children) {
    if (child.type !== "folder") {
      continue;
    }
    if (matchesBase(child, currentBase)) {
      return child.children.filter(
        (c): c is PageTreeFolder => c.type === "folder"
      );
    }
  }
  return [];
};

export const getPagesFromFolder = (folder: PageTreeFolder): PageTreePage[] =>
  folder.children.filter(
    (child): child is PageTreePage => child.type === "page"
  );

export const getCurrentBase = (pathname: string): string => {
  const match = pathname.match(/\/docs\/components\/([^/]+)\//);
  return match ? match[1] : PUBLIC_BASE_NAME;
};
