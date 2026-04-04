import { Box, Text } from "ink";
import React from "react";

import { useTheme } from "@/components/ui/theme-provider";

export type LineChartDataPoint = number | { label?: string; value: number };

export interface LineChartProps {
  data: LineChartDataPoint[];
  width?: number;
  height?: number;
  title?: string;
  color?: string;
  showAxes?: boolean;
}

const getValue = function getValue(d: LineChartDataPoint): number {
  return typeof d === "number" ? d : d.value;
};

const getLabel = function getLabel(d: LineChartDataPoint): string {
  return typeof d === "number" ? "" : (d.label ?? "");
};

const normalize = function normalize(
  value: number,
  min: number,
  max: number,
  rows: number
): number {
  if (max === min) {
    return Math.floor(rows / 2);
  }
  return Math.round(((value - min) / (max - min)) * (rows - 1));
};

// Characters used to draw the line
const PLOT_CHAR = "●";
const _CONNECT_H = "─";
const CONNECT_UP = "╱";
const CONNECT_DOWN = "╲";
const _CONNECT_FLAT = "─";
const AXIS_V = "│";
const AXIS_H = "─";
const AXIS_CORNER = "└";
const AXIS_TICK_V = "┤";
// unused but defined for completeness
const _AXIS_TICK_H = "┬";

export const LineChart = function LineChart({
  data,
  width = 40,
  height = 10,
  title,
  color,
  showAxes = true,
}: LineChartProps) {
  const theme = useTheme();
  const resolvedColor = color ?? theme.colors.primary;

  if (data.length === 0) {
    return <Text color={theme.colors.mutedForeground}>No data</Text>;
  }

  const values = data.map(getValue);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  // Reserve space for Y-axis if showing axes
  const yAxisWidth = showAxes ? String(Math.round(maxVal)).length + 2 : 0;
  const chartWidth = Math.max(4, width - yAxisWidth);

  // Sample data to fit chartWidth columns
  const numPoints = data.length;
  const sampledIndices = Array.from({ length: chartWidth }, (_, i) =>
    Math.round((i / (chartWidth - 1)) * (numPoints - 1))
  );
  const sampledValues = sampledIndices.map((si) => values[si] ?? 0);
  const sampledData = sampledIndices.map((si) => data[si]);

  // Build a grid: height rows x chartWidth cols, default empty
  const grid: string[][] = Array.from({ length: height }, () =>
    Array.from({ length: chartWidth }, () => " ")
  );

  // Plot points and connectors
  const normalizedRows = sampledValues.map(
    (v) => height - 1 - normalize(v, minVal, maxVal, height)
  );

  for (let col = 0; col < chartWidth; col += 1) {
    const row = normalizedRows[col];
    // Draw plot point
    grid[row][col] = PLOT_CHAR;

    // Draw connector to next point
    if (col < chartWidth - 1) {
      const nextRow = normalizedRows[col + 1]!;
      if (nextRow === row) {
        // flat — connector sits on same row, but plot char takes priority; skip middle
      } else if (nextRow < row) {
        // going up
        let r = row - 1;
        while (r > nextRow) {
          grid[r][col] = AXIS_V;
          r -= 1;
        }
        if (grid[nextRow][col] === " ") {
          grid[nextRow][col] = CONNECT_UP;
        }
      } else {
        // going down
        let r = row + 1;
        while (r < nextRow) {
          grid[r][col] = AXIS_V;
          r += 1;
        }
        if (grid[nextRow][col] === " ") {
          grid[nextRow][col] = CONNECT_DOWN;
        }
      }
    }
  }

  // Y-axis labels
  const yLabels = Array.from({ length: height }, (_, i) => {
    const rowVal =
      minVal + ((height - 1 - i) / (height - 1)) * (maxVal - minVal);
    // Only show label for top, mid, bottom rows
    if (i === 0 || i === Math.floor(height / 2) || i === height - 1) {
      return String(Math.round(rowVal));
    }
    return "";
  });

  return (
    <Box flexDirection="column">
      {title && (
        <Text bold color={theme.colors.primary}>
          {title}
        </Text>
      )}
      {grid.map((row, rowIdx) => (
        <Box key={rowIdx} flexDirection="row">
          {showAxes && (
            <Text color={theme.colors.mutedForeground}>
              {String(yLabels[rowIdx] ?? "").padStart(yAxisWidth - 1)}
              {AXIS_TICK_V}
            </Text>
          )}
          {row.map((cell, colIdx) => {
            const isPlot = cell === PLOT_CHAR;
            return (
              <Text
                key={colIdx}
                color={isPlot ? resolvedColor : theme.colors.mutedForeground}
              >
                {cell}
              </Text>
            );
          })}
        </Box>
      ))}
      {showAxes && (
        <Box flexDirection="row">
          <Text color={theme.colors.mutedForeground}>
            {" ".repeat(yAxisWidth - 1)}
            {AXIS_CORNER}
            {AXIS_H.repeat(chartWidth)}
          </Text>
        </Box>
      )}
      {/* X-axis labels — show first, mid, last */}
      {showAxes && (
        <Box flexDirection="row">
          <Text color={theme.colors.mutedForeground}>
            {" ".repeat(yAxisWidth)}
          </Text>
          {sampledData.map((d, idx) => {
            const lbl = getLabel(d);
            if (
              idx === 0 ||
              idx === Math.floor(chartWidth / 2) ||
              idx === chartWidth - 1
            ) {
              return (
                <Text key={idx} color={theme.colors.mutedForeground}>
                  {lbl || String(idx)}
                </Text>
              );
            }
            return <Text key={idx}> </Text>;
          })}
        </Box>
      )}
    </Box>
  );
};
