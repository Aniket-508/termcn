import { promises as fs } from "node:fs";
import path from "node:path";

import { highlightCode } from "@/lib/highlight-code";

import { ComponentSourceCollapsible } from "./component-source-collapsible";
import { ExamplePreview } from "./example-preview";
import { TerminalPreview } from "./terminal-preview";

const resolveExampleSource = async (
  name: string
): Promise<{ code: string; html: string } | null> => {
  const root = process.cwd();

  const examplePath = path.join(root, "examples", `${name}.tsx`);
  try {
    const code = await fs.readFile(examplePath, "utf-8");
    const html = await highlightCode(code, "tsx");
    return { code, html };
  } catch {
    return null;
  }
};

export const ComponentPreview = async ({
  name,
  hideCode = false,
}: {
  name: string;
  hideCode?: boolean;
}) => {
  const source = hideCode ? null : await resolveExampleSource(name);

  return (
    <>
      <TerminalPreview defaultThemeKey="default">
        <ExamplePreview name={name} />
      </TerminalPreview>
      {source && (
        <ComponentSourceCollapsible
          code={source.code}
          highlightedCode={source.html}
        />
      )}
    </>
  );
};
