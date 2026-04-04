import { Box, Text } from "ink";
import React from "react";

import { useTheme } from "@/components/ui/theme-provider";

export interface DividerProps {
  variant?: "single" | "double" | "bold";
  orientation?: "horizontal" | "vertical";
  color?: string;
  label?: string;
  height?: number;
  width?: number;
}

const HORIZONTAL_CHARS: Record<NonNullable<DividerProps["variant"]>, string> = {
  bold: "━",
  double: "═",
  single: "─",
};

const VERTICAL_CHARS: Record<NonNullable<DividerProps["variant"]>, string> = {
  bold: "┃",
  double: "║",
  single: "│",
};

export const Divider = function Divider({
  variant = "single",
  orientation = "horizontal",
  color,
  label,
  height = 1,
  width,
}: DividerProps) {
  const theme = useTheme();
  const resolvedColor = color ?? theme.colors.border;
  const hChar = HORIZONTAL_CHARS[variant];
  const vChar = VERTICAL_CHARS[variant];

  if (orientation === "vertical") {
    const lines = Array.from({ length: height }, (_, i) => i);
    return (
      <Box flexDirection="column">
        {lines.map((i) => (
          <Text key={i} color={resolvedColor}>
            {vChar}
          </Text>
        ))}
      </Box>
    );
  }

  // Horizontal
  if (label) {
    return (
      <Box flexDirection="row" width={width}>
        <Text color={resolvedColor}>
          {hChar}
          {hChar}
          {hChar}{" "}
        </Text>
        <Text color={resolvedColor}>{label}</Text>
        <Text color={resolvedColor}>
          {" "}
          {hChar}
          {hChar}
          {hChar}
        </Text>
        <Box flexGrow={1}>
          <Text color={resolvedColor}>{hChar.repeat(1)}</Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box width={width ?? "100%"}>
      <Text color={resolvedColor} wrap="truncate">
        {hChar.repeat(width ?? 80)}
      </Text>
    </Box>
  );
};
