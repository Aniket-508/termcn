import { defaultTheme } from "@/components/ui/theme-provider";
import { catppuccinTheme } from "@/lib/terminal-themes/catppuccin";
import { draculaTheme } from "@/lib/terminal-themes/dracula";
import {
  highContrastLightTheme,
  highContrastTheme,
} from "@/lib/terminal-themes/highContrast";
import { monokaiTheme } from "@/lib/terminal-themes/monokai";
import { nordTheme } from "@/lib/terminal-themes/nord";
import { oneDarkTheme } from "@/lib/terminal-themes/oneDark";
import { solarizedTheme } from "@/lib/terminal-themes/solarized";
import { tokyoNightTheme } from "@/lib/terminal-themes/tokyoNight";

export const terminalThemeOptions = [
  { label: "Default", value: "default" },
  { label: "Dracula", value: "dracula" },
  { label: "Nord", value: "nord" },
  { label: "Catppuccin", value: "catppuccin" },
  { label: "Monokai", value: "monokai" },
  { label: "Solarized", value: "solarized" },
  { label: "Tokyo Night", value: "tokyo-night" },
  { label: "One Dark", value: "one-dark" },
  { label: "High Contrast", value: "high-contrast" },
  { label: "High Contrast Light", value: "high-contrast-light" },
] as const;

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
