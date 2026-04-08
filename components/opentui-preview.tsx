"use client";

import "@xterm/xterm/css/xterm.css";
import { Terminal } from "@xterm/xterm";
import { useEffect, useMemo, useRef } from "react";

import { useConfig } from "@/hooks/use-config";
import { terminalThemeMap } from "@/lib/terminal-themes";

export interface OpenTuiFramePreviewProps {
  cols?: number;
  frames: string[];
  interval?: number;
  rows?: number;
}

const toXtermTheme = (
  theme: (typeof terminalThemeMap)[keyof typeof terminalThemeMap]
) => ({
  background: theme.colors.background,
  black: theme.colors.background,
  blue: theme.colors.info,
  brightBlack: theme.colors.mutedForeground,
  brightBlue: theme.colors.infoForeground,
  brightCyan: theme.colors.accentForeground,
  brightGreen: theme.colors.successForeground,
  brightMagenta: theme.colors.secondaryForeground,
  brightRed: theme.colors.errorForeground,
  brightWhite: theme.colors.primaryForeground,
  brightYellow: theme.colors.warningForeground,
  cursor: theme.colors.primary,
  cursorAccent: theme.colors.background,
  cyan: theme.colors.accent,
  foreground: theme.colors.foreground,
  green: theme.colors.success,
  magenta: theme.colors.secondary,
  red: theme.colors.error,
  selectionBackground: theme.colors.selection,
  selectionForeground: theme.colors.selectionForeground,
  white: theme.colors.foreground,
  yellow: theme.colors.warning,
});

export const OpenTuiPreview = ({
  cols = 56,
  frames,
  interval = 80,
  rows = 18,
}: OpenTuiFramePreviewProps) => {
  const [config] = useConfig();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const terminalRef = useRef<Terminal | null>(null);
  const theme = useMemo(
    () => terminalThemeMap[config.terminalThemeKey],
    [config.terminalThemeKey]
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const terminal = new Terminal({
      allowTransparency: false,
      cols,
      cursorBlink: false,
      cursorStyle: "block",
      disableStdin: true,
      fontFamily: "var(--font-geist-mono), monospace",
      fontSize: 14,
      lineHeight: 1.2,
      rows,
      theme: toXtermTheme(theme),
    });

    terminal.open(containerRef.current);
    terminalRef.current = terminal;

    return () => {
      terminal.dispose();
      terminalRef.current = null;
    };
  }, [cols, rows, theme]);

  useEffect(() => {
    const terminal = terminalRef.current;
    if (!terminal || frames.length === 0) {
      return;
    }

    let frameIndex = 0;

    const renderFrame = (frame: string) => {
      terminal.write("\u001B[2J\u001B[H");
      terminal.write(frame);
    };

    renderFrame(frames[0]);

    if (frames.length === 1) {
      return;
    }

    const timer = window.setInterval(() => {
      frameIndex = (frameIndex + 1) % frames.length;
      renderFrame(frames[frameIndex]);
    }, interval);

    return () => {
      window.clearInterval(timer);
    };
  }, [frames, interval]);

  return (
    <div className="bg-card">
      <div
        ref={containerRef}
        className="min-h-[348px] w-full overflow-hidden px-3 py-2"
      />
    </div>
  );
};
