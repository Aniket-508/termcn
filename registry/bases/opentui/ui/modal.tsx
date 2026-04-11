/* @jsxImportSource @opentui/react */
import { useKeyboard } from "@opentui/react";
import type { ReactNode } from "react";

import { useTheme } from "@/components/ui/theme-provider";

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

export const Modal = ({
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
}: ModalProps) => {
  const theme = useTheme();
  const resolvedBorderColor = borderColor ?? theme.colors.primary;

  useKeyboard((key) => {
    if (!open) {
      return;
    }
    if (key.name === "escape") {
      onClose?.();
    }
  });

  if (!open) {
    return null;
  }

  return (
    <box
      flexDirection="column"
      borderColor={resolvedBorderColor}
      paddingLeft={paddingX}
      paddingRight={paddingX}
      paddingTop={paddingY}
      paddingBottom={paddingY}
    >
      {title && (
        <box
          marginBottom={1}
          borderStyle={titleBorderStyle}
          borderColor={theme.colors.border}
          paddingLeft={1}
          paddingRight={1}
        >
          <text fg={resolvedBorderColor}>
            <b>{title}</b>
          </text>
        </box>
      )}
      <box flexDirection="column">{children}</box>
      {closeHint !== false && (
        <box marginTop={1}>
          <text fg="#666">{closeHint}</text>
        </box>
      )}
    </box>
  );
};
