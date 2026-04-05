import { Box } from "ink";
import type { ReactNode } from "react";

export interface ChatThreadProps {
  maxHeight?: number;
  autoScroll?: boolean;
  children?: ReactNode;
}

export const ChatThread = function ChatThread({
  maxHeight,
  autoScroll = true,
  children,
}: ChatThreadProps) {
  // autoScroll is kept as a conceptual prop — in Ink's static rendering model,
  // the latest content naturally appears at the bottom. The prop is accepted for
  // API compatibility and future enhancement.
  void autoScroll;

  const containerProps = maxHeight
    ? { height: maxHeight, overflow: "hidden" as const }
    : {
        /* noop */
      };

  return (
    <Box flexDirection="column" {...containerProps}>
      {children}
    </Box>
  );
};
