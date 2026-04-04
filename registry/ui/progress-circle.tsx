import { Box, Text } from "ink";
import React from "react";

import { useTheme } from "@/components/ui/theme-provider";

export type ProgressCircleSize = "sm" | "md" | "lg";

export interface ProgressCircleProps {
  value: number;
  size?: ProgressCircleSize;
  color?: string;
  label?: string;
  showPercent?: boolean;
}

const BRAILLE_CHARS = ["○", "◔", "◑", "◕", "●", "◉", "⬤", "●"];

// 3×3 arc chars for md/lg sizes
const _MD_TOP = ["▄▄▄", "▄██▄"];
const _MD_MID_EMPTY = "█   █";
const _MD_MID_FILL = "█████";
const _MD_BOT = ["▀▀▀", "▀██▀"];

const getSmChar = function getSmChar(value: number): string {
  const clamped = Math.max(0, Math.min(100, value));
  const step = Math.floor((clamped / 100) * 7);
  return BRAILLE_CHARS[step];
};

export const ProgressCircle = function ProgressCircle({
  value,
  size = "sm",
  color,
  label,
  showPercent = false,
}: ProgressCircleProps) {
  const theme = useTheme();
  const clamped = Math.max(0, Math.min(100, value));
  const resolvedColor = color ?? theme.colors.primary;

  if (size === "sm") {
    const char = getSmChar(clamped);
    return (
      <Box flexDirection="column" alignItems="flex-start">
        <Box flexDirection="row" gap={1}>
          <Text color={resolvedColor}>{char}</Text>
          {showPercent && (
            <Text color={theme.colors.muted}>{Math.round(clamped)}%</Text>
          )}
        </Box>
        {label && <Text color={theme.colors.muted}>{label}</Text>}
      </Box>
    );
  }

  // md and lg: render percentage inside compact brackets
  // lg adds more padding / a border ring
  const percentLabel = `${Math.round(clamped)}%`;

  if (size === "md") {
    return (
      <Box flexDirection="column" alignItems="flex-start">
        <Box flexDirection="row">
          <Text color={resolvedColor}>⟨</Text>
          <Text color={resolvedColor} bold>
            {percentLabel}
          </Text>
          <Text color={resolvedColor}>⟩</Text>
        </Box>
        {label && <Text color={theme.colors.muted}>{label}</Text>}
      </Box>
    );
  }

  // lg: 3-line arc representation
  // 0.0 → 1.0
  const fillLevel = clamped / 100;
  // Top arc always shown; mid row fills from bottom; bot arc always shown
  const topArc = " ▄█▄";
  const midLeft = "█";
  const midRight = "█";
  const midInner = fillLevel >= 0.5 ? "███" : "   ";
  const botArc = " ▀█▀";

  return (
    <Box flexDirection="column" alignItems="flex-start">
      <Text color={resolvedColor}>{topArc}</Text>
      <Box flexDirection="row">
        <Text color={resolvedColor}>{midLeft}</Text>
        <Text color={fillLevel > 0 ? resolvedColor : theme.colors.muted}>
          {midInner}
        </Text>
        <Text color={resolvedColor}>{midRight}</Text>
      </Box>
      <Text color={resolvedColor}>{botArc}</Text>
      {showPercent && <Text color={theme.colors.muted}>{percentLabel}</Text>}
      {label && <Text color={theme.colors.muted}>{label}</Text>}
    </Box>
  );
};
