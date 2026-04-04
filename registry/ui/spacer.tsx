import { Box } from "ink";
import React from "react";

export interface SpacerProps {
  size?: number;
  direction?: "horizontal" | "vertical";
}

export const Spacer = function Spacer({
  size,
  direction = "horizontal",
}: SpacerProps) {
  if (size === undefined) {
    return <Box flexGrow={1} />;
  }

  if (direction === "vertical") {
    return <Box height={size} />;
  }

  return <Box width={size} />;
};
