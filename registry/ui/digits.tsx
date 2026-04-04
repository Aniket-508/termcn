import { Box, Text } from "ink";
import React from "react";

import { useTheme } from "@/components/ui/theme-provider";

export type DigitSize = "sm" | "md" | "lg";

export interface DigitsProps {
  value: string | number;
  color?: string;
  size?: DigitSize;
}

// 7-segment style: each digit is 3 chars wide × 3 rows tall
// Using box-drawing characters: ─ │ ╭ ╮ ╰ ╯ ┼
// Row layout:
//   row 0: top segment    e.g. " ─ " or "   "
//   row 1: middle segment e.g. "│ │" or "  │"
//   row 2: mid-bar        e.g. " ─ " or "   "
//   row 3: lower sides    e.g. "│ │" or "  │"
//   row 4: bottom segment e.g. " ─ " or "   "
// For 'md' we use 3×5, for 'lg' we use 5×5

// 3-wide × 5-row representation for each digit/symbol (7-segment style)
const SEGMENTS_MD: Record<string, string[]> = {
  " ": ["   ", "   ", "   ", "   ", "   "],
  "-": ["   ", "   ", " ─ ", "   ", "   "],
  ".": ["   ", "   ", "   ", "   ", " ● "],
  "0": ["╭─╮", "│ │", "│ │", "│ │", "╰─╯"],
  "1": ["  │", "  │", "  │", "  │", "  │"],
  "2": ["╭─╮", "  │", "╭─╯", "│  ", "╰─╴"],
  "3": ["╭─╮", "  │", " ─┤", "  │", "╰─╯"],
  "4": ["╷ ╷", "│ │", "╰─┤", "  │", "  ╵"],
  "5": ["╭─╴", "│  ", "╰─╮", "  │", "╰─╯"],
  "6": ["╭─╴", "│  ", "├─╮", "│ │", "╰─╯"],
  "7": ["╭─╮", "  │", "  │", "  │", "  ╵"],
  "8": ["╭─╮", "│ │", "├─┤", "│ │", "╰─╯"],
  "9": ["╭─╮", "│ │", "╰─┤", "  │", "╰─╯"],
  ":": ["   ", " ● ", "   ", " ● ", "   "],
};

// 5-wide × 5-row for lg size
const SEGMENTS_LG: Record<string, string[]> = {
  " ": ["     ", "     ", "     ", "     ", "     "],
  "-": ["     ", "     ", " ─── ", "     ", "     "],
  ".": ["     ", "     ", "     ", "     ", "  ●  "],
  "0": ["╭───╮", "│   │", "│   │", "│   │", "╰───╯"],
  "1": ["   ╷ ", "   │ ", "   │ ", "   │ ", "   ╵ "],
  "2": ["╭───╮", "    │", " ───╯", "│    ", "╰───╴"],
  "3": ["╭───╮", "    │", " ───┤", "    │", "╰───╯"],
  "4": ["╷   ╷", "│   │", "╰───┤", "    │", "    ╵"],
  "5": ["╭───╴", "│    ", "╰───╮", "    │", "╰───╯"],
  "6": ["╭───╴", "│    ", "├───╮", "│   │", "╰───╯"],
  "7": ["╭───╮", "    │", "    │", "    │", "    ╵"],
  "8": ["╭───╮", "│   │", "├───┤", "│   │", "╰───╯"],
  "9": ["╭───╮", "│   │", "╰───┤", "    │", "╰───╯"],
  ":": ["     ", "  ●  ", "     ", "  ●  ", "     "],
};

const getSegmentMap = function getSegmentMap(
  size: DigitSize
): Record<string, string[]> {
  return size === "lg" ? SEGMENTS_LG : SEGMENTS_MD;
};

const getFallback = function getFallback(size: DigitSize): string[] {
  const w = size === "lg" ? 5 : 3;
  const bar = "─".repeat(w - 2);
  const side = `│${" ".repeat(w - 2)}│`;
  return [`╭${bar}╮`, side, side, side, `╰${bar}╯`];
};

export const Digits = function Digits({
  value,
  color,
  size = "md",
}: DigitsProps) {
  const theme = useTheme();
  const resolvedColor = color ?? theme.colors.primary;
  const str = String(value);

  if (size === "sm") {
    return (
      <Text color={resolvedColor} bold>
        {str}
      </Text>
    );
  }

  const segMap = getSegmentMap(size);
  const fallback = getFallback(size);
  const chars = [...str];
  const rows = 5;

  return (
    <Box flexDirection="column">
      {Array.from({ length: rows }, (_, rowIdx) => (
        <Box key={rowIdx} flexDirection="row">
          {chars.map((ch, charIdx) => {
            const segments = segMap[ch] ?? fallback;
            const rowStr =
              segments[rowIdx] ?? " ".repeat(size === "lg" ? 5 : 3);
            return (
              <Text key={charIdx} color={resolvedColor}>
                {rowStr}{" "}
              </Text>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};
