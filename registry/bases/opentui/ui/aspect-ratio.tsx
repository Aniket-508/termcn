/* @jsxImportSource @opentui/react */
import type { ReactNode } from "react";
export interface AspectRatioProps {
  children: ReactNode;
  ratio?: number;
  width?: number;
}
export const AspectRatio = function AspectRatio({
  children,
  ratio = 16 / 9,
  width = 80,
}: AspectRatioProps) {
  const height = Math.round(width / ratio / 2);
  return <box overflow="hidden">{children}</box>;
};
