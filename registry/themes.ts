import type { Theme as TerminalTheme } from "@/components/ui/theme-provider";
import type { BaseName } from "@/registry/bases";
import { catppuccinTheme } from "@/registry/themes/catppuccin";
import { defaultTheme } from "@/registry/themes/default";
import { draculaTheme } from "@/registry/themes/dracula";
import {
  highContrastLightTheme,
  highContrastTheme,
} from "@/registry/themes/high-contrast";
import { monokaiTheme } from "@/registry/themes/monokai";
import { nordTheme } from "@/registry/themes/nord";
import { oneDarkTheme } from "@/registry/themes/one-dark";
import { solarizedTheme } from "@/registry/themes/solarized";
import { tokyoNightTheme } from "@/registry/themes/tokyo-night";

const SHARED_BASES = ["ink", "opentui"] as const satisfies readonly BaseName[];

export interface RegistryThemeDefinition {
  bases: readonly BaseName[];
  description: string;
  name: string;
  theme: TerminalTheme;
  title: string;
  type: "registry:theme";
}

export const THEMES = [
  {
    bases: SHARED_BASES,
    description: "The default Termcn dark theme.",
    name: "default",
    theme: defaultTheme,
    title: "Default",
    type: "registry:theme",
  },
  {
    bases: SHARED_BASES,
    description: "A soft pastel Catppuccin palette for terminal UIs.",
    name: "catppuccin",
    theme: catppuccinTheme,
    title: "Catppuccin",
    type: "registry:theme",
  },
  {
    bases: SHARED_BASES,
    description: "Dracula-inspired purple-forward theme.",
    name: "dracula",
    theme: draculaTheme,
    title: "Dracula",
    type: "registry:theme",
  },
  {
    bases: SHARED_BASES,
    description: "WCAG-friendly dark high-contrast theme.",
    name: "high-contrast",
    theme: highContrastTheme,
    title: "High Contrast",
    type: "registry:theme",
  },
  {
    bases: SHARED_BASES,
    description: "WCAG-friendly light high-contrast theme.",
    name: "high-contrast-light",
    theme: highContrastLightTheme,
    title: "High Contrast Light",
    type: "registry:theme",
  },
  {
    bases: SHARED_BASES,
    description: "Classic Monokai-inspired editor palette.",
    name: "monokai",
    theme: monokaiTheme,
    title: "Monokai",
    type: "registry:theme",
  },
  {
    bases: SHARED_BASES,
    description: "Nord-inspired cool blue-gray palette.",
    name: "nord",
    theme: nordTheme,
    title: "Nord",
    type: "registry:theme",
  },
  {
    bases: SHARED_BASES,
    description: "One Dark-inspired terminal theme.",
    name: "one-dark",
    theme: oneDarkTheme,
    title: "One Dark",
    type: "registry:theme",
  },
  {
    bases: SHARED_BASES,
    description: "Solarized-inspired balanced low-contrast theme.",
    name: "solarized",
    theme: solarizedTheme,
    title: "Solarized",
    type: "registry:theme",
  },
  {
    bases: SHARED_BASES,
    description: "Tokyo Night-inspired deep blue palette.",
    name: "tokyo-night",
    theme: tokyoNightTheme,
    title: "Tokyo Night",
    type: "registry:theme",
  },
] as const satisfies readonly RegistryThemeDefinition[];

export type RegistryTheme = (typeof THEMES)[number];
export type RegistryThemeName = RegistryTheme["name"];

export const THEME_NAMES = THEMES.map((theme) => theme.name) as [
  RegistryThemeName,
  ...RegistryThemeName[],
];

export const TERMINAL_THEME_MAP = Object.fromEntries(
  THEMES.map((theme) => [theme.name, theme.theme])
) as Record<RegistryThemeName, TerminalTheme>;

export const TERMINAL_THEME_OPTIONS = THEMES.map((theme) => ({
  label: theme.title,
  value: theme.name,
}));

export const THEME_PRIMARY_BY_NAME: Record<string, string> = Object.fromEntries(
  THEMES.map((theme) => [theme.name, theme.theme.colors.primary])
);

export const getTheme = (name: RegistryThemeName) =>
  THEMES.find((theme) => theme.name === name);

export const getThemesForBase = (base: BaseName) =>
  THEMES.filter((theme) => theme.bases.includes(base));
