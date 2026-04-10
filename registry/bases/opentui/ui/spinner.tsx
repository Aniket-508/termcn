/* @jsxImportSource @opentui/react */
import cliSpinners from "cli-spinners";
import type { SpinnerName } from "cli-spinners";

import { useTheme } from "@/components/ui/theme-provider";
import { useAnimation } from "@/hooks/use-animation";

export type SpinnerType = SpinnerName;

export const spinnerNames = Object.keys(cliSpinners) as SpinnerName[];

export interface SpinnerProps {
  type?: SpinnerType;
  label?: string;
  color?: string;
  fps?: number;
  frames?: string[];
}

export const Spinner = function Spinner({
  type: spinnerType = "dots",
  label,
  color,
  fps = 12,
  frames: customFrames,
}: SpinnerProps) {
  const theme = useTheme();
  const builtin = cliSpinners[spinnerType] ?? cliSpinners.dots;
  const useCustomFrames = customFrames !== undefined;
  const frames = useCustomFrames ? customFrames : builtin.frames;
  const frame = useAnimation(
    useCustomFrames ? fps : { intervalMs: builtin.interval }
  );
  const icon = frames[frame % frames.length];
  const resolvedColor = color ?? theme.colors.primary;

  return (
    <box alignItems="center" flexDirection="row">
      <text fg={resolvedColor}>{icon}</text>
      {label ? <text marginLeft={1}>{label}</text> : null}
    </box>
  );
};
