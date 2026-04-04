import { Box, Text } from "ink";
import React from "react";
import type { ReactNode } from "react";

import { useTheme } from "@/components/ui/theme-provider";

export interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  isVisible?: boolean;
  /** Border style of the tooltip box. Default: 'single' */
  borderStyle?:
    | "single"
    | "double"
    | "round"
    | "bold"
    | "singleDouble"
    | "doubleSingle"
    | "classic";
  /** Border/arrow color. Default: theme.colors.border */
  borderColor?: string;
  /** Horizontal padding of the tooltip box. Default: 1 */
  paddingX?: number;
  /** Vertical padding of the tooltip box. Default: 0 */
  paddingY?: number;
  /** Gap between tooltip and trigger for left/right positions. Default: 1 */
  gap?: number;
  /** Arrow shown below tooltip (top position). Default: '↓' */
  arrowDown?: string;
  /** Arrow shown above tooltip (bottom position). Default: '↑' */
  arrowUp?: string;
}

export const Tooltip = function Tooltip({
  children,
  content,
  position = "top",
  isVisible = false,
  borderStyle = "single",
  borderColor,
  paddingX = 1,
  paddingY = 0,
  gap = 1,
  arrowDown = "↓",
  arrowUp = "↑",
}: TooltipProps) {
  const theme = useTheme();
  const resolvedBorderColor = borderColor ?? theme.colors.border;

  const tooltipBox = (
    <Box
      borderStyle={borderStyle}
      borderColor={resolvedBorderColor}
      paddingX={paddingX}
      paddingY={paddingY}
    >
      <Text color={theme.colors.foreground}>{content}</Text>
    </Box>
  );

  if (!isVisible) {
    return <Box>{children}</Box>;
  }

  if (position === "top") {
    return (
      <Box flexDirection="column" alignItems="flex-start">
        {tooltipBox}
        <Text color={theme.colors.mutedForeground}>{arrowDown}</Text>
        <Box>{children}</Box>
      </Box>
    );
  }

  if (position === "bottom") {
    return (
      <Box flexDirection="column" alignItems="flex-start">
        <Box>{children}</Box>
        <Text color={theme.colors.mutedForeground}>{arrowUp}</Text>
        {tooltipBox}
      </Box>
    );
  }

  if (position === "left") {
    return (
      <Box flexDirection="row" alignItems="center" gap={gap}>
        {tooltipBox}
        <Box>{children}</Box>
      </Box>
    );
  }

  // right
  return (
    <Box flexDirection="row" alignItems="center" gap={gap}>
      <Box>{children}</Box>
      {tooltipBox}
    </Box>
  );
};
