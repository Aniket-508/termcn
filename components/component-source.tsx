import { promises as fs } from "node:fs";
import path from "node:path";

import { CodeCollapsibleWrapper } from "@/components/code-collapsible-wrapper";
import type { ExampleFramework } from "@/lib/examples";
import { highlightCode } from "@/lib/highlight-code";
import { getRegistryUiSourceCandidates } from "@/lib/registry";
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

const resolveSourceFile = async ({
  filePath,
  framework,
  name,
}: {
  filePath?: string;
  framework?: ExampleFramework;
  name?: string;
}): Promise<string | null> => {
  const root = process.cwd();

  if (filePath) {
    const resolvedPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(root, filePath);
    return readOptional(resolvedPath);
  }

  if (!name) {
    return null;
  }

  const examplePath = framework
    ? path.join(root, "examples", framework, `${name}.tsx`)
    : path.join(root, "examples", "ink", `${name}.tsx`);
  const alternateExamplePath = path.join(root, "examples", `${name}.tsx`);
  const registryPaths = getRegistryUiSourceCandidates({ framework, name }).map(
    (candidate) => path.join(root, candidate)
  );

  const registryCode = await (async () => {
    for (const registryPath of registryPaths) {
      const code = await readOptional(registryPath);

      if (code) {
        return code;
      }
    }

    return null;
  })();

  return (
    (await readOptional(examplePath)) ??
    (framework === undefined
      ? await readOptional(alternateExamplePath)
      : null) ??
    registryCode
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
  filePath,
  framework,
  title,
  collapsible = true,
  className,
  language,
}: {
  name?: string;
  filePath?: string;
  framework?: ExampleFramework;
  title?: string;
  collapsible?: boolean;
  className?: string;
  language?: string;
}) => {
  const code = await resolveSourceFile({ filePath, framework, name });
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
