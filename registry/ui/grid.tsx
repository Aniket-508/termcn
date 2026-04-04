import { Box } from "ink";
import React, { Children } from "react";
import type { ReactNode } from "react";

export interface GridProps {
  columns: number;
  gap?: number;
  children: ReactNode;
}

export const Grid = function Grid({ columns, gap = 0, children }: GridProps) {
  // eslint-disable-next-line react/no-react-children
  const items = Children.toArray(children);
  const rows: ReactNode[][] = [];

  for (let i = 0; i < items.length; i += columns) {
    rows.push(items.slice(i, i + columns));
  }

  return (
    <Box flexDirection="column" gap={gap}>
      {rows.map((row, rowIdx) => (
        // eslint-disable-next-line react/no-array-index-key
        <Box key={rowIdx} flexDirection="row" gap={gap}>
          {row.map((cell, colIdx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Box key={colIdx} flexGrow={1}>
              {cell}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
