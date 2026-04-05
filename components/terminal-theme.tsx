"use client";

import { useCallback } from "react";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import type { TerminalThemeKey } from "@/hooks/use-config";
import { useConfig } from "@/hooks/use-config";
import { terminalThemeOptions } from "@/lib/terminal-themes";

export const TerminalTheme = () => {
  const [config, setConfig] = useConfig();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value as TerminalThemeKey;
      setConfig((c) => ({ ...c, terminalThemeKey: value }));
    },
    [setConfig]
  );

  return (
    <NativeSelect
      size="sm"
      value={config.terminalThemeKey}
      onChange={handleChange}
    >
      {terminalThemeOptions.map((theme) => (
        <NativeSelectOption key={theme.value} value={theme.value}>
          {theme.label}
        </NativeSelectOption>
      ))}
    </NativeSelect>
  );
};
