import { Text } from "ink";

import { useTheme } from "@/components/ui/theme-provider";
import { useAnimation } from "@/hooks/use-animation";

export type SpinnerStyle =
  | "dots"
  | "line"
  | "star"
  | "clock"
  | "bounce"
  | "bar"
  | "arc"
  | "arrow"
  | "toggle"
  | "box"
  | "pipe"
  | "earth";

const FRAMES: Record<SpinnerStyle, string[]> = {
  arc: ["◜", "◠", "◝", "◞", "◡", "◟"],
  arrow: ["←", "↖", "↑", "↗", "→", "↘", "↓", "↙"],
  bar: ["▏", "▎", "▍", "▌", "▋", "▊", "▉", "█", "▉", "▊", "▋", "▌", "▍", "▎"],
  bounce: ["⠁", "⠂", "⠄", "⡀", "⡈", "⠠", "⠐", "⠈"],
  box: ["▖", "▘", "▝", "▗"],
  clock: [
    "🕐",
    "🕑",
    "🕒",
    "🕓",
    "🕔",
    "🕕",
    "🕖",
    "🕗",
    "🕘",
    "🕙",
    "🕚",
    "🕛",
  ],
  dots: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
  earth: ["🌍", "🌎", "🌏"],
  line: ["—", "\\", "|", "/"],
  pipe: ["┤", "┘", "┴", "└", "├", "┌", "┬", "┐"],
  star: ["✶", "✸", "✹", "✺", "✹", "✸"],
  toggle: ["⊶", "⊷"],
};

export interface SpinnerProps {
  style?: SpinnerStyle;
  label?: string;
  color?: string;
  fps?: number;
  frames?: string[];
}

export const Spinner = function Spinner({
  style: spinnerStyle = "dots",
  label,
  color,
  fps = 12,
  frames: customFrames,
}: SpinnerProps) {
  const theme = useTheme();
  const frame = useAnimation(fps);
  const frames = customFrames ?? FRAMES[spinnerStyle];
  const icon = frames[frame % frames.length];
  const resolvedColor = color ?? theme.colors.primary;

  return (
    <Text>
      <Text color={resolvedColor}>{icon}</Text>
      {label && <Text> {label}</Text>}
    </Text>
  );
};
