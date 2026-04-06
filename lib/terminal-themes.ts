import { formatLabelFromSlug } from "@/lib/utils";
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

export const terminalThemeMap = {
  catppuccin: catppuccinTheme,
  default: defaultTheme,
  dracula: draculaTheme,
  "high-contrast": highContrastTheme,
  "high-contrast-light": highContrastLightTheme,
  monokai: monokaiTheme,
  nord: nordTheme,
  "one-dark": oneDarkTheme,
  solarized: solarizedTheme,
  "tokyo-night": tokyoNightTheme,
} as const;

const themes = Object.values(terminalThemeMap);

export const terminalThemeOptions = themes.map((t) => ({
  label: formatLabelFromSlug(t.name),
  value: t.name,
}));

export const themePrimaryBySlug: Record<string, string> = Object.fromEntries(
  themes.map((t) => [t.name, t.colors.primary])
);
