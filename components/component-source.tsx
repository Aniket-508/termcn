import { promises as fs } from "node:fs";
import path from "node:path";

import { highlightCode } from "@/lib/highlight-code";

import { ComponentSourceCollapsible } from "./component-source-collapsible";
import { CopyButton } from "./copy-button";

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

export const ComponentSource = async ({
  name,
  title,
  collapsible = true,
}: {
  name: string;
  title?: string;
  collapsible?: boolean;
}) => {
  const code = await resolveSourceFile(name);
  if (!code) {
    return null;
  }

  const highlighted = await highlightCode(code, "tsx");

  if (!collapsible) {
    return (
      <figure className="group bg-code text-code-foreground relative mt-6 overflow-hidden rounded-lg text-sm">
        {title && (
          <figcaption className="border-border/50 text-muted-foreground border-b px-4 py-2 text-sm">
            {title}
          </figcaption>
        )}
        <div className="relative">
          <CopyButton
            value={code}
            className="absolute top-3 right-2 z-10 size-7 opacity-70 hover:opacity-100"
          />
          <div
            className="max-h-[450px] overflow-auto [&_span]:text-(--shiki-light) dark:[&_span]:text-(--shiki-dark)"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </div>
      </figure>
    );
  }

  return (
    <ComponentSourceCollapsible
      code={code}
      highlightedCode={highlighted}
      title={title}
    />
  );
};
