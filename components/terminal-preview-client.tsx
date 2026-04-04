"use client";

import "ink-web/css";
import "@xterm/xterm/css/xterm.css";
import { InkTerminalBox } from "ink-web";
import { useCallback, useState } from "react";

import { MacWindow } from "@/components/mac-window";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { terminalThemeMap, terminalThemeOptions } from "@/lib/terminal-themes";

export interface TerminalPreviewClientProps {
  children: React.ReactElement;
  defaultThemeKey?: keyof typeof terminalThemeMap;
  rows?: number;
}

const TerminalPreviewClient = ({
  children,
  defaultThemeKey = "default",
  rows = 18,
}: TerminalPreviewClientProps) => {
  const [themeKey, setThemeKey] =
    useState<keyof typeof terminalThemeMap>(defaultThemeKey);
  const activeTheme = terminalThemeMap[themeKey] ?? terminalThemeMap.default;

  const handleThemeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setThemeKey(event.target.value as keyof typeof terminalThemeMap);
    },
    []
  );

  return (
    <MacWindow
      className="mt-6"
      title="Terminal"
      trailing={
        <NativeSelect size="sm" value={themeKey} onChange={handleThemeChange}>
          {terminalThemeOptions.map((theme) => (
            <NativeSelectOption key={theme.value} value={theme.value}>
              {theme.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      }
    >
      <InkTerminalBox focus loading="skeleton" padding={12} rows={rows}>
        <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
      </InkTerminalBox>
    </MacWindow>
  );
};

export default TerminalPreviewClient;
