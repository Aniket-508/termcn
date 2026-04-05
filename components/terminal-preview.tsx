"use client";

import { createDynamicTerminal } from "ink-web/next";

import { MacWindow } from "@/components/mac-window";
import type { TerminalPreviewClientProps } from "@/components/terminal-preview-client";
import { TerminalTheme } from "@/components/terminal-theme";

const TerminalPreviewClient = createDynamicTerminal<TerminalPreviewClientProps>(
  async () => {
    const m = await import("./terminal-preview-client");
    return m.default;
  },
  {
    loading: "spinner",
  }
);

export const TerminalPreview = (props: TerminalPreviewClientProps) => (
  <MacWindow className="mt-6" title="Terminal" trailing={<TerminalTheme />}>
    <TerminalPreviewClient {...props} />
  </MacWindow>
);
