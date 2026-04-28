/* eslint-disable no-inline-comments -- turbopackIgnore must annotate dynamic imports inline. */
import type { Node as PageTreeNode } from "fumadocs-core/page-tree";

import { ROUTES } from "@/constants/routes";
import { isComponentsFolder } from "@/lib/docs";
import { getCategoryFolders, getFolderPages } from "@/lib/page-tree";
import type { PageTreeFolder } from "@/lib/page-tree";
import { absoluteUrl } from "@/lib/utils";

interface DocsPageTree {
  children: PageTreeNode[];
}

const CODE_FENCE_REGEX = /```[\s\S]*?```/g;
const COMPONENT_PREVIEW_BLOCK_REGEX =
  /<ComponentPreview([^>]*)>[\s\S]*?<\/ComponentPreview>/g;
const COMPONENT_PREVIEW_SELF_CLOSING_REGEX = /<ComponentPreview([^>]*)\/>/g;
const COMPONENT_SOURCE_SELF_CLOSING_REGEX = /<ComponentSource([^>]*)\/>/g;
const COMPONENTS_LIST_SELF_CLOSING_REGEX = /<ComponentsList([^>]*)\/>/g;
const DOCS_MARKDOWN_LINK_REGEX = /\]\((\/docs(?:\/[^)#\s]+)?)(#[^)]+)?\)/g;
const IMPORT_REGEX = /^import\s.+$/gm;
const JSX_WRAPPER_REGEX = /^<\/?[A-Z][^>]*>\s*$/gm;
const MANY_BLANK_LINES_REGEX = /\n{3,}/g;
const PROTECTED_CODE_FENCE_REGEX = /%%TERMCN_CODE_FENCE_(\d+)%%/g;
const PUBLIC_BASE_NAME = "ink";

const removeFrontmatter = (content: string) =>
  content.replace(/^---\n[\s\S]*?\n---\n?/, "");

const protectCodeFences = (content: string) => {
  const fences: string[] = [];
  const protectedContent = content.replaceAll(CODE_FENCE_REGEX, (match) => {
    const index = fences.push(match) - 1;
    return `%%TERMCN_CODE_FENCE_${index}%%`;
  });

  return {
    content: protectedContent,
    restore: (value: string) =>
      value.replaceAll(
        PROTECTED_CODE_FENCE_REGEX,
        (_, index) => fences[Number(index)] ?? ""
      ),
  };
};

const attr = (attrs: string, name: string) =>
  attrs.match(new RegExp(`\\s${name}=["']([^"']+)["']`))?.[1];

const hasBooleanAttr = (attrs: string, name: string) =>
  new RegExp(`\\s${name}(\\s|/|>)`).test(attrs);

const docsMarkdownUrl = (url: string) =>
  absoluteUrl(
    url.startsWith(ROUTES.DOCS) && !url.endsWith(".md") ? `${url}.md` : url
  );

const normalizeDocsMarkdownLinks = (content: string) =>
  content.includes("](/docs")
    ? content.replaceAll(
        DOCS_MARKDOWN_LINK_REGEX,
        (_, pathname, hash = "") => `](${docsMarkdownUrl(pathname)}${hash})`
      )
    : content;

const componentListMarkdown = (pageTree: DocsPageTree, attrs: string) => {
  const folderName = attr(attrs, "folderName") ?? "Components";
  const category = attr(attrs, "category");
  const base = attr(attrs, "base") ?? PUBLIC_BASE_NAME;
  const folder = pageTree.children.find(
    (node): node is PageTreeFolder =>
      node.type === "folder" && node.name === folderName
  );

  if (!folder) {
    return "";
  }

  if (!isComponentsFolder(folder)) {
    const pages = getFolderPages(folder, base);
    const allPages = pages.length > 0 ? pages : getFolderPages(folder);

    return allPages
      .map((page) => `- [${page.name}](${docsMarkdownUrl(page.url)})`)
      .join("\n");
  }

  const categories = getCategoryFolders(folder, base);
  const visibleCategories = category
    ? categories.filter(
        (cat) =>
          cat.$id === category ||
          String(cat.$id ?? "").endsWith(`/${category}`) ||
          (typeof cat.name === "string" &&
            cat.name.toLowerCase() === category.toLowerCase())
      )
    : categories;

  return visibleCategories
    .flatMap((cat) => getFolderPages(cat))
    .map((page) => `- [${page.name}](${docsMarkdownUrl(page.url)})`)
    .join("\n");
};

const componentSourceMarkdown = async (attrs: string) => {
  const name = attr(attrs, "name");
  const src = attr(attrs, "src");
  const title = attr(attrs, "title");
  const language = attr(attrs, "language");
  const base = attr(attrs, "base") ?? PUBLIC_BASE_NAME;
  const candidates = src
    ? [src]
    : [
        `examples/${base}/${name}.tsx`,
        `registry/bases/${base}/ui/${name}.tsx`,
        ...(base === PUBLIC_BASE_NAME ? [`registry/ui/${name}.tsx`] : []),
      ];

  let code: string | null = null;

  if (name || src) {
    const [{ readFile }, path] = await Promise.all([
      import(/* turbopackIgnore: true */ "node:fs/promises"),
      import(/* turbopackIgnore: true */ "node:path"),
    ]);

    for (const candidate of candidates) {
      try {
        code = await readFile(path.join(process.cwd(), candidate), "utf-8");
      } catch {
        code = null;
      }

      if (code) {
        break;
      }
    }
  }

  if (src && !code) {
    try {
      const { readFileFromRoot } = await import(
        /* turbopackIgnore: true */ "./read-file"
      );
      code = await readFileFromRoot(src);
    } catch {
      code = null;
    }
  }

  if (!code) {
    return "";
  }

  const lang =
    language ?? title?.split(".").pop() ?? src?.split(".").pop() ?? "tsx";
  return `\`\`\`${lang}\n${code.trim()}\n\`\`\``;
};

const replaceAsync = async (
  content: string,
  regex: RegExp,
  replacement: (match: RegExpMatchArray) => Promise<string> | string
) => {
  const matches = [...content.matchAll(regex)];
  if (matches.length === 0) {
    return content;
  }

  const replacements = await Promise.all(
    matches.map(async (match) => ({
      markdown: await replacement(match),
      source: match[0],
    }))
  );

  let result = content;
  for (const { source, markdown } of replacements) {
    result = result.replace(source, markdown);
  }

  return result;
};

export const processMdxForLLMs = async (
  raw: string,
  pageTree: DocsPageTree
) => {
  const protectedFences = protectCodeFences(removeFrontmatter(raw));
  let content = protectedFences.content
    .replaceAll(IMPORT_REGEX, "")
    .replaceAll(COMPONENTS_LIST_SELF_CLOSING_REGEX, (_, attrs) =>
      componentListMarkdown(pageTree, attrs)
    );

  content = await replaceAsync(
    content,
    COMPONENT_SOURCE_SELF_CLOSING_REGEX,
    (match) => componentSourceMarkdown(match[1] ?? "")
  );

  content = await replaceAsync(
    content,
    COMPONENT_PREVIEW_BLOCK_REGEX,
    (match) =>
      hasBooleanAttr(match[1] ?? "", "hideCode")
        ? ""
        : componentSourceMarkdown(match[1] ?? "")
  );

  content = await replaceAsync(
    content,
    COMPONENT_PREVIEW_SELF_CLOSING_REGEX,
    (match) =>
      hasBooleanAttr(match[1] ?? "", "hideCode")
        ? ""
        : componentSourceMarkdown(match[1] ?? "")
  );

  const cleaned = content
    .replaceAll(JSX_WRAPPER_REGEX, "")
    .replaceAll(MANY_BLANK_LINES_REGEX, "\n\n")
    .trim();

  return protectedFences.restore(normalizeDocsMarkdownLinks(cleaned)).trim();
};
