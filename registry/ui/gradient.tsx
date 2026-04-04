import { Box, Text } from "ink";
import React from "react";

export interface GradientProps {
  children: string;
  colors: string[];
  bold?: boolean;
}

interface RGB {
  r: number;
  g: number;
  b: number;
}

const parseHex = function parseHex(hex: string): RGB {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3 ? [...clean].map((c) => c + c).join("") : clean;
  return {
    b: Number.parseInt(full.slice(4, 6), 16),
    g: Number.parseInt(full.slice(2, 4), 16),
    r: Number.parseInt(full.slice(0, 2), 16),
  };
};

const toHex = function toHex({ r, g, b }: RGB): string {
  return `#${[r, g, b]
    .map((v) =>
      Math.round(Math.max(0, Math.min(255, v)))
        .toString(16)
        .padStart(2, "0")
    )
    .join("")}`;
};

const lerpColor = function lerpColor(a: RGB, b: RGB, t: number): RGB {
  return {
    b: a.b + (b.b - a.b) * t,
    g: a.g + (b.g - a.g) * t,
    r: a.r + (b.r - a.r) * t,
  };
};

export interface GradientChar {
  char: string;
  color: string;
}

export const gradientText = function gradientText(
  text: string,
  colors: string[]
): GradientChar[] {
  if (colors.length === 0) {
    return [...text].map((char) => ({ char, color: "" }));
  }
  if (colors.length === 1) {
    return [...text].map((char) => ({ char, color: colors[0] }));
  }

  const parsedColors = colors.map(parseHex);
  const segments = colors.length - 1;
  const len = text.length;

  return [...text].map((char, i) => {
    if (len <= 1) {
      return { char, color: colors[0] };
    }
    // Position in [0, segments]
    const pos = (i / (len - 1)) * segments;
    const segIndex = Math.min(Math.floor(pos), segments - 1);
    const t = pos - segIndex;
    const color = toHex(
      lerpColor(parsedColors[segIndex], parsedColors[segIndex + 1], t)
    );
    return { char, color };
  });
};

export const Gradient = function Gradient({
  children,
  colors,
  bold = false,
}: GradientProps) {
  const chars = gradientText(children, colors);

  return (
    <Box flexDirection="row">
      {chars.map((item, idx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={idx} color={item.color} bold={bold}>
          {item.char}
        </Text>
      ))}
    </Box>
  );
};
