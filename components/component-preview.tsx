import { promises as fs } from "node:fs";
import path from "node:path";

import { ComponentSource } from "@/components/component-source";
import { ExamplePreview } from "@/components/example-preview";
import { TerminalPreview } from "@/components/terminal-preview";
import { highlightCode } from "@/lib/highlight-code";

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
      <TerminalPreview>
        <ExamplePreview name={name} />
      </TerminalPreview>
      {source && <ComponentSource name={name} />}
    </>
  );
};
