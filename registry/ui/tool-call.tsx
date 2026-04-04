import { Box, Text } from "ink";
import React, { useState, useEffect, useRef } from "react";

import { useTheme } from "@/components/ui/theme-provider";
import { useAnimation } from "@/hooks/use-animation";
import { useInput } from "@/hooks/use-input";

export type ToolCallStatus = "pending" | "running" | "success" | "error";

export interface ToolCallProps {
  name: string;
  args?: Record<string, unknown>;
  status: ToolCallStatus;
  result?: unknown;
  duration?: number;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const ToolCall = function ToolCall({
  name,
  args,
  status,
  result,
  duration,
  collapsible = true,
  defaultCollapsed = true,
}: ToolCallProps) {
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());
  const frame = useAnimation(12);

  const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const spinnerIcon = spinnerFrames[frame % spinnerFrames.length]!;

  useEffect(() => {
    if (status !== "running") {
      return;
    }
    startRef.current = Date.now();
    const id = setInterval(() => {
      setElapsed(Date.now() - startRef.current);
    }, 100);
    return () => clearInterval(id);
  }, [status]);

  useInput((input, key) => {
    if (collapsible && (key.return || input === " ")) {
      setCollapsed((c) => !c);
    }
  });

  const statusIcon = () => {
    switch (status) {
      case "pending": {
        return <Text dimColor>○</Text>;
      }
      case "running": {
        return <Text color={theme.colors.primary}>{spinnerIcon}</Text>;
      }
      case "success": {
        return <Text color={theme.colors.success ?? "green"}>✓</Text>;
      }
      case "error": {
        return <Text color={theme.colors.error ?? "red"}>✗</Text>;
      }
    }
  };

  const durationText =
    duration !== undefined
      ? `${duration}ms`
      : status === "running"
        ? `${elapsed}ms`
        : null;

  return (
    <Box flexDirection="column">
      <Box gap={1}>
        {statusIcon()}
        <Text
          color={
            status === "error"
              ? (theme.colors.error ?? "red")
              : status === "success"
                ? (theme.colors.success ?? "green")
                : status === "running"
                  ? theme.colors.primary
                  : theme.colors.mutedForeground
          }
          bold={status !== "pending"}
        >
          {name}
        </Text>
        {durationText && (
          <Text dimColor color={theme.colors.mutedForeground}>
            ({durationText})
          </Text>
        )}
        {collapsible && (
          <Text dimColor color={theme.colors.mutedForeground}>
            {collapsed ? "▶" : "▼"}
          </Text>
        )}
      </Box>

      {!collapsed && (
        <Box flexDirection="column" paddingLeft={2}>
          {args && Object.keys(args).length > 0 && (
            <Box flexDirection="column">
              <Text dimColor color={theme.colors.mutedForeground}>
                Args:
              </Text>
              {Object.entries(args).map(([k, v]) => (
                <Box key={k} gap={1}>
                  <Text color={theme.colors.accent}>{k}:</Text>
                  <Text dimColor>{JSON.stringify(v)}</Text>
                </Box>
              ))}
            </Box>
          )}
          {result !== undefined && (
            <Box flexDirection="column">
              <Text dimColor color={theme.colors.mutedForeground}>
                Result:
              </Text>
              <Text dimColor>
                {typeof result === "string"
                  ? result
                  : JSON.stringify(result, null, 2)}
              </Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
