/* @jsxImportSource @opentui/react */
import type { ReactNode } from "react";

import { useTheme } from "@/components/ui/theme-provider";
export interface BulletListItemProps {
  label: string;
  bold?: boolean;
  color?: string;
  children?: ReactNode;
}
export interface BulletListTreeItemProps {
  label: string;
  color?: string;
}
export interface BulletListCheckItemProps {
  label: string;
  done?: boolean;
  color?: string;
}
const BulletListRoot = function BulletListRoot({
  children,
}: {
  children: ReactNode;
}) {
  return <box flexDirection="column">{children}</box>;
};
const BulletListItem = function BulletListItem({
  label,
  bold: boldText = false,
  color,
  children,
}: BulletListItemProps) {
  const theme = useTheme();
  return (
    <box flexDirection="column">
      <box flexDirection="row">
        <text fg={color ?? theme.colors.primary}>{"● "}</text>
        {boldText ? (
          <text fg={color}>
            <b>{label}</b>
          </text>
        ) : (
          <text fg={color}>{label}</text>
        )}
      </box>
      {children}
    </box>
  );
};
const BulletListSub = function BulletListSub({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <box flexDirection="column" paddingLeft={2}>
      {children}
    </box>
  );
};
const BulletListTreeItem = function BulletListTreeItem({
  label,
  color,
}: BulletListTreeItemProps) {
  const theme = useTheme();
  return (
    <box flexDirection="row">
      <text fg={theme.colors.mutedForeground}>{"└ "}</text>
      <text fg={color}>{label}</text>
    </box>
  );
};
const BulletListCheckItem = function BulletListCheckItem({
  label,
  done = false,
  color,
}: BulletListCheckItemProps) {
  const theme = useTheme();
  const icon = done ? "■" : "□";
  const resolvedColor =
    color ?? (done ? theme.colors.success : theme.colors.mutedForeground);
  return (
    <box flexDirection="row">
      <text fg={resolvedColor}>{`${icon} `}</text>
      <text fg={done ? undefined : color}>{label}</text>
    </box>
  );
};
export const BulletList = Object.assign(BulletListRoot, {
  CheckItem: BulletListCheckItem,
  Item: BulletListItem,
  Sub: BulletListSub,
  TreeItem: BulletListTreeItem,
});
