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
