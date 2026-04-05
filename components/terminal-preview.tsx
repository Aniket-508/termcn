"use client";

import { createDynamicTerminal } from "ink-web/next";

import { MacWindow } from "@/components/mac-window";
import type { TerminalPreviewClientProps } from "@/components/terminal-preview-client";
import { TerminalTheme } from "@/components/terminal-theme";
import { cn } from "@/lib/utils";

const TerminalPreviewClient = createDynamicTerminal<TerminalPreviewClientProps>(
  async () => {
    const m = await import("./terminal-preview-client");
    return m.default;
  },
  {
    loading: "spinner",
  }
);

export const TerminalPreview = ({
  className,
  title = "Terminal",
  ...props
}: TerminalPreviewClientProps & { className?: string; title?: string }) => (
  <MacWindow
    className={cn("mt-6", className)}
    title={title}
    trailing={<TerminalTheme />}
  >
    <TerminalPreviewClient {...props} />
  </MacWindow>
);
