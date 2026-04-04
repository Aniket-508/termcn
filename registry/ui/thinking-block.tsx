import { Box, Text } from "ink";
import React, { useState } from "react";

import { useTheme } from "@/components/ui/theme-provider";
import { useInput } from "@/hooks/use-input";

export interface ThinkingBlockProps {
  content: string;
  streaming?: boolean;
  defaultCollapsed?: boolean;
  label?: string;
  tokenCount?: number;
  duration?: number;
}

export const ThinkingBlock = function ThinkingBlock({
  content,
  streaming = false,
  defaultCollapsed = true,
  label = "Reasoning",
  tokenCount,
  duration,
}: ThinkingBlockProps) {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  useInput((input, key) => {
    if (key.return || input === " ") {
      setCollapsed((c) => !c);
    }
  });

  const tokenStr =
    tokenCount === undefined ? null : `${tokenCount.toLocaleString()} tokens`;
  const durationStr =
    duration === undefined ? null : `${(duration / 1000).toFixed(1)}s`;

  const headerParts = [
    streaming ? "Thinking..." : label,
    tokenStr,
    durationStr,
  ].filter(Boolean);

  const headerText = headerParts.join(" · ");

  return (
    <Box
      flexDirection="column"
      borderStyle="single"
      borderColor={theme.colors.border}
      paddingX={1}
    >
      {/* Toggle header */}
      <Box gap={1}>
        <Text color={theme.colors.mutedForeground}>
          {collapsed ? "▶" : "▼"}
        </Text>
        <Text
          color={
            streaming ? theme.colors.primary : theme.colors.mutedForeground
          }
          dimColor={!streaming}
        >
          {headerText}
        </Text>
      </Box>

      {/* Content (when expanded) */}
      {!collapsed && (
        <Box flexDirection="column" paddingTop={1}>
          <Text color={theme.colors.mutedForeground} dimColor wrap="wrap">
            {content}
          </Text>
        </Box>
      )}
    </Box>
  );
};
