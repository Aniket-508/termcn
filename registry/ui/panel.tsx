import { Box, Text } from "ink";
import type { ReactNode } from "react";

import { useTheme } from "@/components/ui/theme-provider";

export interface PanelProps {
  title?: string;
  titleColor?: string;
  borderColor?: string;
  borderStyle?:
    | "single"
    | "double"
    | "round"
    | "bold"
    | "singleDouble"
    | "doubleSingle"
    | "classic";
  /** Show a border around the panel. Default: true */
  bordered?: boolean;
  width?: number;
  height?: number;
  paddingX?: number;
  paddingY?: number;
  children?: ReactNode;
}

export const Panel = function Panel({
  title,
  titleColor,
  borderColor,
  borderStyle,
  bordered = true,
  width,
  height,
  paddingX = 1,
  paddingY = 0,
  children,
}: PanelProps) {
  const theme = useTheme();

  const inner = (
    <>
      {title && (
        <Box
          paddingX={paddingX}
          borderStyle="single"
          borderColor={borderColor ?? theme.colors.border}
        >
          <Text bold color={titleColor ?? theme.colors.primary}>
            {title}
          </Text>
        </Box>
      )}
      <Box flexDirection="column" paddingX={paddingX} paddingY={paddingY}>
        {children}
      </Box>
    </>
  );

  if (!bordered) {
    return (
      <Box flexDirection="column" width={width} height={height}>
        {inner}
      </Box>
    );
  }

  return (
    <Box
      flexDirection="column"
      borderStyle={borderStyle ?? theme.border.style}
      borderColor={borderColor ?? theme.colors.border}
      width={width}
      height={height}
    >
      {inner}
    </Box>
  );
};
