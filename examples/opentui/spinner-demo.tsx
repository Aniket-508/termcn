import { OpenTuiPreview } from "@/components/opentui-preview";
import { resolveSpinner } from "@/registry/bases/opentui/ui/spinner";

const loadingFrames = resolveSpinner({
  color: "cyan",
  name: "dots",
}).frames.map((frame) => `${frame} Loading components...\n`);

const buildFrames = resolveSpinner({ color: "yellow", name: "arc" }).frames.map(
  (frame) => `${frame} Building registry...\n`
);

const FRAMES = [...loadingFrames, "", ...buildFrames].map((line) => `${line}`);

export default function OpenTuiSpinnerDemo() {
  return <OpenTuiPreview frames={FRAMES} interval={90} />;
}
