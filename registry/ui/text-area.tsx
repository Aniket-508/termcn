import { Box, Text } from "ink";
import React, { useState } from "react";

import { useTheme } from "@/components/ui/theme-provider";
import { useFocus } from "@/hooks/use-focus";
import { useInput } from "@/hooks/use-input";

export interface TextAreaProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
  id?: string;
  /** Border style. Default: 'round' */
  borderStyle?:
    | "single"
    | "double"
    | "round"
    | "bold"
    | "singleDouble"
    | "doubleSingle"
    | "classic";
  /** Horizontal padding. Default: 1 */
  paddingX?: number;
  /** Cursor character shown when focused. Default: '█' */
  cursor?: string;
}

export const TextArea = function TextArea({
  value: controlledValue,
  onChange,
  onSubmit,
  placeholder = "",
  rows = 4,
  label,
  id,
  borderStyle = "round",
  paddingX = 1,
  cursor = "█",
}: TextAreaProps) {
  const [internalValue, setInternalValue] = useState("");
  const [cursorLine, setCursorLine] = useState(0);
  const [cursorCol, setCursorCol] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const theme = useTheme();
  const { isFocused } = useFocus({ id });

  const value = controlledValue ?? internalValue;

  function setValue(newVal: string) {
    onChange ? onChange(newVal) : setInternalValue(newVal);
  }

  function getLines(v: string): string[] {
    return v.split("\n");
  }

  function joinLines(lines: string[]): string {
    return lines.join("\n");
  }

  useInput((input, key) => {
    if (!isFocused) {
      return;
    }

    const lines = getLines(value);

    if (key.return && key.ctrl) {
      onSubmit?.(value);
      return;
    }

    // Enter adds a newline (unless at row limit)
    if (key.return) {
      const totalLines = lines.length;
      if (totalLines >= rows && cursorLine === rows - 1) {
        // At row limit on last visible row — do nothing
        return;
      }
      const currentLine = lines[cursorLine] ?? "";
      const before = currentLine.slice(0, cursorCol);
      const after = currentLine.slice(cursorCol);
      const newLines = [
        ...lines.slice(0, cursorLine),
        before,
        after,
        ...lines.slice(cursorLine + 1),
      ];
      setValue(joinLines(newLines));
      const newLine = cursorLine + 1;
      setCursorLine(newLine);
      setCursorCol(0);
      if (newLine >= scrollOffset + rows) {
        setScrollOffset(newLine - rows + 1);
      }
      return;
    }

    if (key.backspace || key.delete) {
      const currentLine = lines[cursorLine] ?? "";
      if (cursorCol > 0) {
        // Delete character before cursor on same line
        const newLine =
          currentLine.slice(0, cursorCol - 1) + currentLine.slice(cursorCol);
        const newLines = [
          ...lines.slice(0, cursorLine),
          newLine,
          ...lines.slice(cursorLine + 1),
        ];
        setValue(joinLines(newLines));
        setCursorCol(cursorCol - 1);
      } else if (cursorLine > 0) {
        // Merge with previous line
        const prevLine = lines[cursorLine - 1] ?? "";
        const mergedLine = prevLine + currentLine;
        const newLines = [
          ...lines.slice(0, cursorLine - 1),
          mergedLine,
          ...lines.slice(cursorLine + 1),
        ];
        setValue(joinLines(newLines));
        const newLineIdx = cursorLine - 1;
        setCursorLine(newLineIdx);
        setCursorCol(prevLine.length);
        if (newLineIdx < scrollOffset) {
          setScrollOffset(newLineIdx);
        }
      }
      return;
    }

    if (key.leftArrow) {
      if (cursorCol > 0) {
        setCursorCol(cursorCol - 1);
      } else if (cursorLine > 0) {
        const prevLine = lines[cursorLine - 1] ?? "";
        const newLineIdx = cursorLine - 1;
        setCursorLine(newLineIdx);
        setCursorCol(prevLine.length);
        if (newLineIdx < scrollOffset) {
          setScrollOffset(newLineIdx);
        }
      }
      return;
    }

    if (key.rightArrow) {
      const currentLine = lines[cursorLine] ?? "";
      if (cursorCol < currentLine.length) {
        setCursorCol(cursorCol + 1);
      } else if (cursorLine < lines.length - 1) {
        const newLineIdx = cursorLine + 1;
        setCursorLine(newLineIdx);
        setCursorCol(0);
        if (newLineIdx >= scrollOffset + rows) {
          setScrollOffset(newLineIdx - rows + 1);
        }
      }
      return;
    }

    if (key.upArrow) {
      if (cursorLine > 0) {
        const newLineIdx = cursorLine - 1;
        const targetLine = lines[newLineIdx] ?? "";
        setCursorLine(newLineIdx);
        setCursorCol(Math.min(cursorCol, targetLine.length));
        if (newLineIdx < scrollOffset) {
          setScrollOffset(newLineIdx);
        }
      }
      return;
    }

    if (key.downArrow) {
      if (cursorLine < lines.length - 1) {
        const newLineIdx = cursorLine + 1;
        const targetLine = lines[newLineIdx] ?? "";
        setCursorLine(newLineIdx);
        setCursorCol(Math.min(cursorCol, targetLine.length));
        if (newLineIdx >= scrollOffset + rows) {
          setScrollOffset(newLineIdx - rows + 1);
        }
      }
      return;
    }

    if (key.escape || key.tab) {
      return;
    }

    if (input && input.length > 0) {
      const currentLine = lines[cursorLine] ?? "";
      const newLine =
        currentLine.slice(0, cursorCol) + input + currentLine.slice(cursorCol);
      const newLines = [
        ...lines.slice(0, cursorLine),
        newLine,
        ...lines.slice(cursorLine + 1),
      ];
      setValue(joinLines(newLines));
      setCursorCol(cursorCol + input.length);
    }
  });

  const borderColor = isFocused ? theme.colors.focusRing : theme.colors.border;
  const lines = getLines(value);
  const visibleLines = lines.slice(scrollOffset, scrollOffset + rows);

  // Pad to always show `rows` rows
  const paddedLines: string[] = [...visibleLines];
  while (paddedLines.length < rows) {
    paddedLines.push("");
  }

  const isEmpty = value.length === 0;

  return (
    <Box flexDirection="column">
      {label && <Text bold>{label}</Text>}
      <Box
        flexDirection="column"
        borderStyle={borderStyle}
        borderColor={borderColor}
        paddingX={paddingX}
      >
        {paddedLines.map((line, rowIdx) => {
          const absoluteLineIdx = rowIdx + scrollOffset;
          const isActiveLine = isFocused && absoluteLineIdx === cursorLine;

          if (isEmpty && rowIdx === 0) {
            return (
              <Box key={rowIdx} flexDirection="row">
                <Text color={theme.colors.mutedForeground}>{placeholder}</Text>
                {isFocused && (
                  <Text color={theme.colors.focusRing}>{cursor}</Text>
                )}
              </Box>
            );
          }

          if (isActiveLine) {
            const before = line.slice(0, cursorCol);
            const after = line.slice(cursorCol);
            return (
              <Box key={rowIdx} flexDirection="row">
                <Text color={theme.colors.foreground}>{before}</Text>
                <Text color={theme.colors.focusRing}>{cursor}</Text>
                <Text color={theme.colors.foreground}>{after}</Text>
              </Box>
            );
          }

          return (
            <Box key={rowIdx}>
              <Text color={theme.colors.foreground}>{line}</Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
