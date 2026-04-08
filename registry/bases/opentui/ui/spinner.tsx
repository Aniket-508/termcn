import { createElement, useEffect, useState } from "react";

const BUILTIN_SPINNERS = {
  arc: {
    frames: ["◜", "◠", "◝", "◞", "◡", "◟"],
    interval: 80,
  },
  bouncingBall: {
    frames: [
      "( ●    )",
      "(  ●   )",
      "(   ●  )",
      "(    ● )",
      "(     ●)",
      "(    ● )",
      "(   ●  )",
      "(  ●   )",
    ],
    interval: 90,
  },
  dots: {
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
    interval: 80,
  },
  line: {
    frames: ["-", "\\", "|", "/"],
    interval: 130,
  },
} as const;

export type SpinnerName = keyof typeof BUILTIN_SPINNERS;

export interface SpinnerOptions {
  autoplay?: boolean;
  backgroundColor?: string;
  color?: string;
  frames?: string[];
  interval?: number;
  name?: SpinnerName;
}

export interface SpinnerProps extends SpinnerOptions {
  label?: string;
}

export interface ResolvedSpinner {
  autoplay: boolean;
  backgroundColor?: string;
  color: string;
  frames: string[];
  interval: number;
}

export const spinnerNames = Object.keys(BUILTIN_SPINNERS) as SpinnerName[];

export const resolveSpinner = ({
  autoplay = true,
  backgroundColor,
  color = "white",
  frames,
  interval,
  name = "dots",
}: SpinnerOptions = {}): ResolvedSpinner => {
  const builtin = BUILTIN_SPINNERS[name];

  return {
    autoplay,
    backgroundColor,
    color,
    frames: frames ?? [...builtin.frames],
    interval: interval ?? builtin.interval,
  };
};

export const Spinner = ({
  autoplay,
  backgroundColor,
  color,
  frames,
  interval,
  label,
  name,
}: SpinnerProps) => {
  const resolved = resolveSpinner({
    autoplay,
    backgroundColor,
    color,
    frames,
    interval,
    name,
  });
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    setFrameIndex(0);
  }, [resolved.frames]);

  useEffect(() => {
    if (!resolved.autoplay || resolved.frames.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setFrameIndex((current) => (current + 1) % resolved.frames.length);
    }, resolved.interval);

    return () => {
      clearInterval(timer);
    };
  }, [resolved.autoplay, resolved.frames, resolved.interval]);

  const frame = resolved.frames[frameIndex % resolved.frames.length];

  return createElement(
    "box",
    { alignItems: "center", flexDirection: "row" },
    createElement(
      "text",
      { bg: resolved.backgroundColor, fg: resolved.color },
      frame
    ),
    label ? createElement("text", { marginLeft: 1 }, label) : null
  );
};
