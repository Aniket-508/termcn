import { Box, Text } from "ink";

import { useTheme } from "@/components/ui/theme-provider";

export interface ProgressBarProps {
  // 0–100
  value: number;
  // if set, value is current, total is max
  total?: number;
  width?: number;
  showPercent?: boolean;
  showEta?: boolean;
  fillChar?: string;
  emptyChar?: string;
  color?: string;
  label?: string;
}

export const ProgressBar = function ProgressBar({
  value,
  total,
  width = 30,
  showPercent = true,
  showEta: _showEta = false,
  fillChar = "█",
  emptyChar = "░",
  color,
  label,
}: ProgressBarProps) {
  const theme = useTheme();
  const resolvedColor = color ?? theme.colors.primary;

  const percent =
    total === undefined
      ? Math.min(100, Math.round(value))
      : Math.min(100, Math.round((value / total) * 100));
  const filled = Math.round((percent / 100) * width);
  const empty = width - filled;

  const bar = fillChar.repeat(filled) + emptyChar.repeat(empty);

  return (
    <Box flexDirection="column">
      {label && <Text>{label}</Text>}
      <Box gap={1}>
        <Text color={resolvedColor}>{bar}</Text>
        {showPercent && (
          <Text color={theme.colors.mutedForeground}>{percent}%</Text>
        )}
        {total !== undefined && (
          <Text color={theme.colors.mutedForeground} dimColor>
            {value}/{total}
          </Text>
        )}
      </Box>
    </Box>
  );
};
