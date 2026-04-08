"use client";

import { createDynamicTerminal } from "ink-web/next";

import { ComponentSource } from "@/components/component-source";
import { ExamplePreview } from "@/components/example-preview";
// import { OpenTuiPreview } from "@/components/opentui-preview";
import type { ExampleFramework } from "@/lib/examples";
import type { terminalThemeMap } from "@/lib/terminal-themes";
import { cn } from "@/lib/utils";

import type { InkPreviewProps } from "./ink-preview";
import { MacWindow } from "./mac-window";
import { TerminalTheme } from "./terminal-theme";

const InkPreview = createDynamicTerminal<InkPreviewProps>(
  async () => {
    const m = await import("./ink-preview");
    return m.default;
  },
  {
    loading: "spinner",
  }
);

export const ComponentPreview = ({
  framework = "ink",
  name,
  title,
  className,
  hideCode = false,
  theme,
}: {
  name: string;
  title: string;
  className?: string;
  framework?: ExampleFramework;
  hideCode?: boolean;
  theme?: keyof typeof terminalThemeMap;
}) => {
  const preview =
    framework === "opentui" ? (
      // <OpenTuiPreview>
      <ExamplePreview framework={framework} name={name} />
    ) : (
      // </OpenTuiPreview>
      <InkPreview theme={theme}>
        <ExamplePreview framework={framework} name={name} />
      </InkPreview>
    );

  return (
    <MacWindow
      className={cn("mt-6", className)}
      title={title}
      trailing={<TerminalTheme />}
    >
      {preview}
      {!hideCode && <ComponentSource framework={framework} name={name} />}
    </MacWindow>
  );
};
