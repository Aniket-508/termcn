"use client";

import { createDynamicTerminal } from "ink-web/next";

import { ExamplePreview } from "@/components/example-preview";
import type { InkPreviewProps } from "@/components/ink-preview";
import type { ExampleFramework } from "@/lib/examples";
import type { terminalThemeMap } from "@/lib/terminal-themes";

const InkPreview = createDynamicTerminal<InkPreviewProps>(
  async () => {
    const m = await import("./ink-preview");
    return m.default;
  },
  {
    loading: "spinner",
  }
);

export interface TerminalPreviewProps {
  framework: ExampleFramework;
  name: string;
  theme?: keyof typeof terminalThemeMap;
}

export const TerminalPreview = ({
  framework,
  name,
  theme,
}: TerminalPreviewProps) => {
  if (framework === "opentui") {
    return (
      //   <OpenTuiPreview>
      <ExamplePreview framework={framework} name={name} />
      //   </OpenTuiPreview>
    );
  }

  return (
    <InkPreview theme={theme}>
      <ExamplePreview framework={framework} name={name} />
    </InkPreview>
  );
};
