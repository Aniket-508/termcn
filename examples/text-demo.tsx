import { Box } from "ink";

import { Text } from "@/registry/ui/text";

export default function TextDemo() {
  return (
    <Box flexDirection="column">
      <Text bold color="#61afef">
        Hello, terminal!
      </Text>
      <Text dim>Dimmed supporting text</Text>
    </Box>
  );
}
