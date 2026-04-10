import { Box, Text } from "ink";
import type { ReactNode } from "react";

import { useTheme } from "@/components/ui/theme-provider";
import { useInput } from "@/hooks/use-input";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: string;
  width?: number;
  children?: ReactNode;
  borderStyle?:
    | "single"
    | "double"
    | "round"
    | "bold"
    | "singleDouble"
    | "doubleSingle"
    | "classic";
  borderColor?: string;
  paddingX?: number;
  paddingY?: number;
  titleBorderStyle?:
    | "single"
    | "double"
    | "round"
    | "bold"
    | "singleDouble"
    | "doubleSingle"
    | "classic";
  closeHint?: string | false;
}

export const Modal = function Modal({
  open,
  onClose,
  title,
  width = 60,
  children,
  borderStyle = "round",
  borderColor,
  paddingX = 1,
  paddingY = 0,
  titleBorderStyle = "single",
  closeHint = "Press Esc to close",
}: ModalProps) {
  const theme = useTheme();
  const resolvedBorderColor = borderColor ?? theme.colors.primary;

  useInput(
    (input, key) => {
      if (!open) {
        return;
      }
      if (key.escape) {
        onClose?.();
      }
    },
    { isActive: open }
  );

  if (!open) {
    return null;
  }

  return (
    <Box
      flexDirection="column"
      borderStyle={borderStyle}
      borderColor={resolvedBorderColor}
      width={width}
      paddingX={paddingX}
      paddingY={paddingY}
    >
      {title && (
        <Box
          marginBottom={1}
          borderStyle={titleBorderStyle}
          borderColor={theme.colors.border}
          paddingX={1}
        >
          <Text bold color={resolvedBorderColor}>
            {title}
          </Text>
        </Box>
      )}
      <Box flexDirection="column">{children}</Box>
      {closeHint !== false && (
        <Box marginTop={1}>
          <Text color={theme.colors.mutedForeground} dimColor>
            {closeHint}
          </Text>
        </Box>
      )}
    </Box>
  );
};
