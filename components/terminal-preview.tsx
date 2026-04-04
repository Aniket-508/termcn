"use client";

import TerminalPreviewClient from "@/components/terminal-preview-client";

export interface TerminalPreviewProps {
  children: React.ReactElement;
  defaultThemeKey?:
    | "default"
    | "dracula"
    | "nord"
    | "catppuccin"
    | "monokai"
    | "solarized"
    | "tokyo-night"
    | "one-dark"
    | "high-contrast"
    | "high-contrast-light";
  rows?: number;
}

export const TerminalPreview = (props: TerminalPreviewProps) => (
  <TerminalPreviewClient {...props} />
);
