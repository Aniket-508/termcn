import Link from "next/link";

import type { PageTreeFolder, PageTreePage } from "@/lib/page-tree";
import { getPagesFromFolder } from "@/lib/page-tree";
import { source } from "@/lib/source";

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

export const ComponentsList = ({
  folderName = "Components",
  category,
}: {
  folderName?: string;
  category?: string;
}) => {
  const folder = getFolder(folderName);
  if (!folder) {
    return null;
  }

  if (category) {
    const categoryFolder = folder.children.find(
      (child): child is PageTreeFolder =>
        child.type === "folder" &&
        String(child.$id ?? "").endsWith(`/${category}`)
    );
    if (!categoryFolder) {
      return null;
    }
    const pages = getPagesFromFolder(categoryFolder);
    return <ComponentGrid pages={pages} />;
  }

  const categories = folder.children.filter(
    (child): child is PageTreeFolder => child.type === "folder"
  );

  if (categories.length === 0) {
    const pages = getPagesFromFolder(folder);
    return <ComponentGrid pages={pages} />;
  }

  return (
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
};
