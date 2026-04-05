import { Box, Text } from "ink";
import React, { useState } from "react";
import type { ReactNode } from "react";

import { useInput } from "@/hooks/use-input";

export interface ScrollViewProps {
  height: number;
  children: ReactNode;
  showScrollbar?: boolean;
  scrollbarColor?: string;
}

export const ScrollView = function ScrollView({
  height,
  children,
  showScrollbar = true,
  scrollbarColor = "gray",
}: ScrollViewProps) {
  const [scrollTop, setScrollTop] = useState(0);

  useInput((input, key) => {
    if (key.upArrow) {
      setScrollTop((s) => Math.max(0, s - 1));
    } else if (key.downArrow) {
      setScrollTop((s) => s + 1);
    } else if (key.pageUp) {
      setScrollTop((s) => Math.max(0, s - height));
    } else if (key.pageDown) {
      setScrollTop((s) => s + height);
    }
  });

  return (
    <Box flexDirection="row" height={height} overflow="hidden">
      <Box flexGrow={1} flexDirection="column" marginTop={-scrollTop as number}>
        {children}
      </Box>
      {showScrollbar && (
        <Box width={1} flexDirection="column" height={height}>
          <Text color={scrollbarColor}>{"│".repeat(height)}</Text>
        </Box>
      )}
    </Box>
  );
};
