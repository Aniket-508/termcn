import { Box } from "ink";

import { BigText } from "@/registry/bases/ink/ui/big-text";

export default function BigTextFonts() {
  return (
    <Box flexDirection="column" gap={1}>
      <BigText font="block">BLOCK</BigText>
      <BigText font="shade">SHADE</BigText>
      <BigText font="slim">SLIM</BigText>
    </Box>
  );
}
