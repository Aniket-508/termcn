import { Box, Text } from "ink";

import { Spacer } from "@/registry/ui/spacer";

export default function SpacerDemo() {
  return (
    <Box flexDirection="row">
      <Text>Left</Text>
      <Spacer />
      <Text>Right</Text>
    </Box>
  );
}
