/* @jsxImportSource @opentui/react */
import React from "react";
import type { ReactNode } from "react";
export interface GridProps {
  columns: number;
  gap?: number;
  children: ReactNode;
}
export const Grid = function Grid({ columns, gap = 0, children }: GridProps) {
  const items = React.Children.toArray(children);
  const rows: ReactNode[][] = [];
  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }
  return (
    <box flexDirection="column">
      {rows.map((row, rowIdx) => (
        <box key={rowIdx} flexDirection="row">
          {row.map((cell, colIdx) => (
            <box key={colIdx} flexGrow={1}>
              {cell}
            </box>
          ))}
        </box>
      ))}
    </box>
  );
};
