import { ProgressBar } from "@/registry/ui/progress-bar";

export default function ProgressBarCustom() {
  return <ProgressBar value={80} fillChar="=" emptyChar="-" color="#22c55e" />;
}
