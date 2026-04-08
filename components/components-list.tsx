import Link from "next/link";

import { isComponentsFolder } from "@/lib/docs";
import type { PageTreeFolder, PageTreePage } from "@/lib/page-tree";
import { getCategoryFoldersForBase, getPagesFromFolder } from "@/lib/page-tree";
import { source } from "@/lib/source";
import { PUBLIC_BASE_NAME } from "@/registry/bases";

const getFolder = (name: string): PageTreeFolder | undefined => {
  for (const node of source.pageTree.children) {
    if (node.type === "folder" && node.name === name) {
      return node;
    }
  }
};

const ComponentGrid = ({ pages }: { pages: PageTreePage[] }) => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
    {pages.map((component) => (
      <Link
        key={component.$id}
        href={component.url}
        className="inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline md:text-base"
      >
        {component.name}
      </Link>
    ))}
  </div>
);

const CategoryGrid = ({ categories }: { categories: PageTreeFolder[] }) => (
  <div className="flex flex-col gap-10">
    {categories.map((cat) => {
      const pages = getPagesFromFolder(cat);
      if (pages.length === 0) {
        return null;
      }

      return (
        <div key={cat.$id}>
          <h3 className="font-heading mb-4 text-lg font-medium tracking-tight">
            {cat.name}
          </h3>
          <ComponentGrid pages={pages} />
        </div>
      );
    })}
  </div>
);

export const ComponentsList = ({
  folderName = "Components",
  category,
  base = PUBLIC_BASE_NAME,
}: {
  folderName?: string;
  category?: string;
  base?: string;
}) => {
  const folder = getFolder(folderName);
  if (!folder) {
    return null;
  }

  if (!isComponentsFolder(folder)) {
    const pages = getPagesFromFolder(folder);
    if (pages.length === 0) {
      return null;
    }
    return <ComponentGrid pages={pages} />;
  }

  const categories = getCategoryFoldersForBase(folder, base);

  if (category) {
    const match = categories.find(
      (cat) =>
        cat.$id === category ||
        String(cat.$id ?? "").endsWith(`/${category}`) ||
        (typeof cat.name === "string" &&
          cat.name.toLowerCase() === category.toLowerCase())
    );
    if (!match) {
      return null;
    }
    return <ComponentGrid pages={getPagesFromFolder(match)} />;
  }

  if (categories.length === 0) {
    return null;
  }

  return <CategoryGrid categories={categories} />;
};
