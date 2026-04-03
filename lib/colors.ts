import { colors } from "@/lib/registry-colors";

interface ColorItem {
  name: string;
  id: string;
  scale: number;
  className: string;
  hex: string;
  rgb: string;
  hsl: string;
  foreground: string;
  oklch: string;
  var: string;
}

export interface ColorPalette {
  name: string;
  colors: ColorItem[];
}

export const getColorFormat = (color: Color) => ({
  className: `bg-${color.name}-100`,
  hex: color.hex,
  hsl: color.hsl,
  oklch: color.oklch,
  rgb: color.rgb,
  var: `--color-${color.name}-${color.scale}`,
});

export type ColorFormat = keyof ReturnType<typeof getColorFormat>;

const toLinear = (number: number): number => {
  const base = number / 255;
  return base <= 0.040_45 ? base / 12.92 : ((base + 0.055) / 1.055) ** 2.4;
};

const getForegroundFromBackground = (rgb: string) => {
  const [r, g, b] = rgb.split(" ").map(Number);

  const luminance =
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  return luminance > 0.179 ? "#000" : "#fff";
};

export const getColors = (): ColorPalette[] => {
  const tailwindColors = Object.entries(colors)
    .map(([name, color]) => {
      if (!Array.isArray(color)) {
        return null;
      }

      return {
        colors: color.map((c) => {
          const rgb = c.rgb.replace(/^rgb\((\d+),(\d+),(\d+)\)$/, "$1 $2 $3");

          return {
            ...c,
            className: `${name}-${c.scale}`,
            foreground: getForegroundFromBackground(rgb),
            hsl: c.hsl.replace(
              /^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/,
              "$1 $2 $3"
            ),
            id: `${name}-${c.scale}`,
            name,
            oklch: `oklch(${c.oklch.replace(
              /^oklch\(([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\)$/,
              "$1 $2 $3"
            )})`,
            rgb,
            var: `--color-${name}-${c.scale}`,
          };
        }),
        name,
      };
    })
    .filter((item): item is ColorPalette => item !== null);

  return tailwindColors;
};

export type Color = ReturnType<typeof getColors>[number]["colors"][number];
