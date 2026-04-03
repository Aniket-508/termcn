import { colors } from "@/lib/registry-colors"

type ColorItem = {
  name: string
  id: string
  scale: number
  className: string
  hex: string
  rgb: string
  hsl: string
  foreground: string
  oklch: string
  var: string
}

export type ColorPalette = {
  name: string
  colors: ColorItem[]
}

export function getColorFormat(color: Color) {
  return {
    className: `bg-${color.name}-100`,
    hex: color.hex,
    rgb: color.rgb,
    hsl: color.hsl,
    oklch: color.oklch,
    var: `--color-${color.name}-${color.scale}`,
  }
}

export type ColorFormat = keyof ReturnType<typeof getColorFormat>

export function getColors(): ColorPalette[] {
  const tailwindColors = Object.entries(colors)
    .map(([name, color]) => {
      if (!Array.isArray(color)) {
        return null
      }

      return {
        name,
        colors: color.map((c) => {
          const rgb = c.rgb.replace(/^rgb\((\d+),(\d+),(\d+)\)$/, "$1 $2 $3")

          return {
            ...c,
            name,
            id: `${name}-${c.scale}`,
            className: `${name}-${c.scale}`,
            var: `--color-${name}-${c.scale}`,
            rgb,
            hsl: c.hsl.replace(
              /^hsl\(([\d.]+),([\d.]+%),([\d.]+%)\)$/,
              "$1 $2 $3"
            ),
            oklch: `oklch(${c.oklch.replace(
              /^oklch\(([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\)$/,
              "$1 $2 $3"
            )})`,
            foreground: getForegroundFromBackground(rgb),
          }
        }),
      }
    })
    .filter((item): item is ColorPalette => item !== null)

  return tailwindColors
}

export type Color = ReturnType<typeof getColors>[number]["colors"][number]

function getForegroundFromBackground(rgb: string) {
  const [r, g, b] = rgb.split(" ").map(Number)

  function toLinear(number: number): number {
    const base = number / 255
    return base <= 0.04045 ? base / 12.92 : ((base + 0.055) / 1.055) ** 2.4
  }

  const luminance =
    0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)

  return luminance > 0.179 ? "#000" : "#fff"
}
