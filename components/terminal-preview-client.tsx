"use client";

import "ink-web/css";
import "@xterm/xterm/css/xterm.css";
import { InkTerminalBox } from "ink-web";
import { useEffect, useMemo } from "react";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { useConfig } from "@/hooks/use-config";
import { terminalThemeMap } from "@/lib/terminal-themes";

export interface TerminalPreviewClientProps {
  children: React.ReactElement;
  defaultThemeKey?: keyof typeof terminalThemeMap;
  onReady?: () => void;
  rows?: number;
}

const TerminalPreviewClient = ({
  children,
  defaultThemeKey,
  onReady,
  rows = 18,
}: TerminalPreviewClientProps) => {
  const [config, setConfig] = useConfig();
  const themeKey = config.terminalThemeKey;

  useEffect(() => {
    if (defaultThemeKey === undefined) {
      return;
    }
    setConfig((c) => ({ ...c, terminalThemeKey: defaultThemeKey }));
  }, [defaultThemeKey, setConfig]);

  const baseTheme = useMemo(() => terminalThemeMap[themeKey], [themeKey]);

  const xtermTheme = useMemo(
    () => ({
      background: baseTheme.colors.background,
      cursor: baseTheme.colors.foreground,
      foreground: baseTheme.colors.foreground,
      selectionBackground: baseTheme.colors.selection,
      selectionForeground: baseTheme.colors.selectionForeground,
    }),
    [baseTheme]
  );

  return (
    <div
      className="terminal-preview-root"
      style={
        {
          "--ink-terminal-bg": xtermTheme.background,
        } as React.CSSProperties
      }
    >
      <InkTerminalBox
        loading={false}
        padding={10}
        rows={rows}
        termOptions={{ theme: xtermTheme }}
        onReady={onReady}
      >
        <ThemeProvider theme={baseTheme}>{children}</ThemeProvider>
      </InkTerminalBox>
    </div>
  );
};

export default TerminalPreviewClient;
