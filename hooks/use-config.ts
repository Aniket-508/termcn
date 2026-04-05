import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

import { terminalThemeMap } from "@/lib/terminal-themes";

export type TerminalThemeKey = keyof typeof terminalThemeMap;

export interface Config {
  packageManager: "npm" | "yarn" | "pnpm" | "bun";
  installationType: "cli" | "manual";
  terminalThemeKey: TerminalThemeKey;
}

const CONFIG_DEFAULT: Config = {
  installationType: "cli",
  packageManager: "pnpm",
  terminalThemeKey: "default",
};

const jsonStorage = createJSONStorage<Config>(() => localStorage);

const configStorage = {
  getItem: (key: string, initial: Config): Config => {
    const stored = jsonStorage.getItem(key, initial);
    const themeCandidate = stored.terminalThemeKey;
    const terminalThemeKey =
      themeCandidate !== undefined && themeCandidate in terminalThemeMap
        ? themeCandidate
        : initial.terminalThemeKey;
    return {
      installationType: stored.installationType ?? initial.installationType,
      packageManager: stored.packageManager ?? initial.packageManager,
      terminalThemeKey,
    };
  },
  removeItem: jsonStorage.removeItem,
  setItem: jsonStorage.setItem,
};

const configAtom = atomWithStorage<Config>(
  "config",
  CONFIG_DEFAULT,
  configStorage
);

export const useConfig = () => useAtom(configAtom);
