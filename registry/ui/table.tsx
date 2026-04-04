import { Box, Text } from "ink";
import React, { useState, useMemo } from "react";

import { useTheme } from "@/components/ui/theme-provider";
import { useInput } from "@/hooks/use-input";

export interface Column<T = Record<string, unknown>> {
  key: keyof T & string;
  header: string;
  width?: number;
  align?: "left" | "right" | "center";
}

export interface TableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  selectable?: boolean;
  onSelect?: (row: T) => void;
  maxRows?: number;
  borderColor?: string;
  /** Border style. Default: 'round' */
  borderStyle?:
    | "single"
    | "double"
    | "round"
    | "bold"
    | "singleDouble"
    | "doubleSingle"
    | "classic";
  /** Column separator string. Default: ' │ ' */
  columnSeparator?: string;
  /** Row separator fill character. Default: '─' */
  rowSeparatorChar?: string;
}

const pad = function pad(
  str: string,
  width: number,
  align: "left" | "right" | "center" = "left"
): string {
  const s = String(str);
  if (s.length >= width) {
    return s.slice(0, width);
  }
  const diff = width - s.length;
  if (align === "right") {
    return " ".repeat(diff) + s;
  }
  if (align === "center") {
    const left = Math.floor(diff / 2);
    const right = diff - left;
    return " ".repeat(left) + `${s} `.repeat(right);
  }
  return `${s} `.repeat(diff);
};

export function Table<
  T extends Record<string, unknown> = Record<string, unknown>,
>({
  data,
  columns,
  sortable = false,
  selectable = false,
  onSelect,
  maxRows = 20,
  borderColor,
  borderStyle = "round",
  columnSeparator = " │ ",
  rowSeparatorChar = "─",
}: TableProps<T>) {
  const theme = useTheme();
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [activeRow, setActiveRow] = useState(0);
  const [sortColIdx, setSortColIdx] = useState(0);

  const resolvedBorderColor = borderColor ?? theme.colors.border;

  const sorted = useMemo(() => {
    if (!sortKey) {
      return data;
    }
    return [...data].toSorted((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const visible = sorted.slice(0, maxRows);

  useInput((input, key) => {
    if (key.upArrow) {
      setActiveRow((r) => Math.max(0, r - 1));
    } else if (key.downArrow) {
      setActiveRow((r) => Math.min(visible.length - 1, r + 1));
    } else if (key.return && selectable) {
      onSelect?.(visible[activeRow] as T);
    } else if (sortable && key.leftArrow) {
      setSortColIdx((i) => Math.max(0, i - 1));
    } else if (sortable && key.rightArrow) {
      setSortColIdx((i) => Math.min(columns.length - 1, i + 1));
    } else if (sortable && input === "s") {
      const col = columns[sortColIdx];
      if (!col) {
        return;
      }
      if (sortKey === col.key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(col.key);
        setSortDir("asc");
      }
    }
  });

  const colWidths = columns.map((col) => {
    const dataMax = data.reduce(
      (max, row) => Math.max(max, String(row[col.key] ?? "").length),
      0
    );
    return col.width ?? Math.max(col.header.length, dataMax) + 2;
  });

  const headerRow = columns
    .map((col, i) =>
      pad(col.header, colWidths[i] ?? col.header.length, col.align)
    )
    .join(columnSeparator);
  const separator = colWidths
    .map((w) => rowSeparatorChar.repeat(w))
    .join(`${rowSeparatorChar}┼${rowSeparatorChar}`);

  return (
    <Box
      flexDirection="column"
      borderStyle={borderStyle}
      borderColor={resolvedBorderColor}
    >
      {/* Header */}
      <Box paddingX={1}>
        <Text bold color={theme.colors.primary}>
          {headerRow}
        </Text>
      </Box>
      <Box paddingX={1}>
        <Text color={resolvedBorderColor}>{separator}</Text>
      </Box>
      {/* Rows */}
      {visible.map((row, rowIdx) => {
        const isActive = rowIdx === activeRow && selectable;
        const cells = columns
          .map((col, i) =>
            pad(String(row[col.key] ?? ""), colWidths[i] ?? 8, col.align)
          )
          .join(columnSeparator);
        return (
          <Box key={rowIdx} paddingX={1}>
            <Text
              color={
                isActive
                  ? theme.colors.selectionForeground
                  : theme.colors.foreground
              }
              inverse={isActive}
            >
              {cells}
            </Text>
          </Box>
        );
      })}
      {data.length > maxRows && (
        <Box paddingX={1}>
          <Text color={theme.colors.mutedForeground} dimColor>
            … {data.length - maxRows} more rows
          </Text>
        </Box>
      )}
    </Box>
  );
}
