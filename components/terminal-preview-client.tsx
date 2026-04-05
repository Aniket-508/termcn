"use client";

import "ink-web/css";
import "@xterm/xterm/css/xterm.css";
import { InkTerminalBox } from "ink-web";
import { useEffect } from "react";

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

  return (
    <InkTerminalBox loading={false} padding={12} rows={rows} onReady={onReady}>
      <ThemeProvider theme={terminalThemeMap[themeKey]}>
        {children}
      </ThemeProvider>
    </InkTerminalBox>
  );
};

export default TerminalPreviewClient;
