"use client";

import "ink-web/css";
import "@xterm/xterm/css/xterm.css";
import { InkTerminalBox } from "ink-web";
import { useEffect } from "react";

import { ThemeProvider } from "@/components/ui/theme-provider";
import { useConfig } from "@/hooks/use-config";
import { terminalThemeMap } from "@/lib/terminal-themes";

export interface InkPreviewProps {
  children: React.ReactElement;
  theme?: keyof typeof terminalThemeMap;
  onReady?: () => void;
  rows?: number;
}

const InkPreview = ({
  children,
  theme,
  onReady,
  rows = 18,
}: InkPreviewProps) => {
  const [config, setConfig] = useConfig();
  const themeKey = config.terminalThemeKey;

  useEffect(() => {
    if (theme === undefined) {
      return;
    }
    setConfig((c) => ({ ...c, terminalThemeKey: theme }));
  }, [theme, setConfig]);

  return (
    <InkTerminalBox loading={false} padding={12} rows={rows} onReady={onReady}>
      <ThemeProvider theme={terminalThemeMap[themeKey]}>
        {children}
      </ThemeProvider>
    </InkTerminalBox>
  );
};

export default InkPreview;
