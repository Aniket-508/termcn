import { Box } from "ink";

import { ProgressCircle } from "@/registry/ui/progress-circle";

export default function ProgressCircleSizes() {
  return (
    <Box gap={2}>
      <ProgressCircle value={60} size="sm" />
      <ProgressCircle value={45} size="md" label="CPU" />
      <ProgressCircle value={88} size="lg" showPercent />
    </Box>
  );
}
