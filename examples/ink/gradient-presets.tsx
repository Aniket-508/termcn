import { Box } from "ink";

import { Gradient } from "@/registry/bases/ink/ui/gradient";

export default function GradientPresets() {
  return (
    <Box flexDirection="column" gap={0}>
      <Gradient name="rainbow" bold>
        rainbow
      </Gradient>
      <Gradient name="teen">teen</Gradient>
      <Gradient name="cristal">cristal</Gradient>
    </Box>
  );
}
