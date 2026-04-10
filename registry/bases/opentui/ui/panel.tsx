/* @jsxImportSource @opentui/react */
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
      {title ? (
        <box
          paddingLeft={paddingX}
          paddingRight={paddingX}
          borderStyle="single"
          borderColor={borderColor ?? theme.colors.border}
        >
          <text fg={titleColor ?? theme.colors.primary}>
            <b>{title}</b>
          </text>
        </box>
      ) : null}
      <box
        flexDirection="column"
        paddingLeft={paddingX}
        paddingRight={paddingX}
        paddingTop={paddingY}
        paddingBottom={paddingY}
      >
        {children}
      </box>
    </>
  );

  if (!bordered) {
    return <box flexDirection="column">{inner}</box>;
  }

  return (
    <box
      flexDirection="column"
      borderStyle={borderStyle ?? theme.border.style}
      borderColor={borderColor ?? theme.colors.border}
    >
      {inner}
    </box>
  );
};
