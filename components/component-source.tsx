import { promises as fs } from "node:fs";
import path from "node:path";

import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper";
import { highlightCode } from "@/lib/highlight-code";
import { cn } from "@/lib/utils";

import { CopyButton } from "./copy-button";
import { getIconForLanguageExtension } from "./icons";

const readOptional = async (filePath: string): Promise<string | null> => {
  try {
    return await fs.readFile(filePath, "utf-8");
  } catch {
    return null;
  }
};

const resolveSourceFile = async (name: string): Promise<string | null> => {
  const root = process.cwd();
  const examplePath = path.join(root, "examples", `${name}.tsx`);
  const registryPath = path.join(root, "registry", "ui", `${name}.tsx`);
  return (
    (await readOptional(examplePath)) ?? (await readOptional(registryPath))
  );
};

const ComponentCode = ({
  code,
  highlightedCode,
  language,
  title,
}: {
  code: string;
  highlightedCode: string;
  language: string;
  title: string | undefined;
}) => (
  <figure data-rehype-pretty-code-figure="" className="[&>pre]:max-h-96">
    {title && (
      <figcaption
        data-rehype-pretty-code-title=""
        className="flex items-center gap-2 text-code-foreground [&_svg]:size-4 [&_svg]:text-code-foreground [&_svg]:opacity-70"
        data-language={language}
      >
        {getIconForLanguageExtension(language)}
        {title}
      </figcaption>
    )}
    <CopyButton value={code} event="copy_primitive_code" />
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
  </figure>
);

export const ComponentSource = async ({
  name,
  title,
  collapsible = true,
  className,
  language,
}: {
  name: string;
  title?: string;
  collapsible?: boolean;
  className?: string;
  language?: string;
}) => {
  const code = await resolveSourceFile(name);
  if (!code) {
    return null;
  }

  const lang = language ?? title?.split(".").pop() ?? "tsx";
  const highlightedCode = await highlightCode(code, lang);

  if (!collapsible) {
    return (
      <div className={cn("relative", className)}>
        <ComponentCode
          code={code}
          highlightedCode={highlightedCode}
          language={lang}
          title={title}
        />
      </div>
    );
  }

  return (
    <CodeCollapsibleWrapper
      className={className}
      navTriggerClassName={cn(!title && "top-3")}
    >
      <ComponentCode
        code={code}
        highlightedCode={highlightedCode}
        language={lang}
        title={title}
      />
    </CodeCollapsibleWrapper>
  );
};
