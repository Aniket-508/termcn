/* eslint-disable react/style-prop-object -- Spinner uses `style` for animation preset, not CSS */
import { Box } from "ink";

import { Spinner } from "@/registry/ui/spinner";

export default function SpinnerDemo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Spinner label="Loading components..." />
      <Spinner style="arc" label="Building registry..." />
    </Box>
  );
}
