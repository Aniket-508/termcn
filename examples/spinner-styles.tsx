/* eslint-disable react/style-prop-object -- Spinner uses `style` for animation preset, not CSS */
import { Box } from "ink";

import { Spinner } from "@/registry/ui/spinner";

export default function SpinnerStyles() {
  return (
    <Box flexDirection="column" gap={1}>
      <Spinner style="dots" label="dots" />
      <Spinner style="line" label="line" />
      <Spinner style="star" label="star" />
      <Spinner style="bounce" label="bounce" />
      <Spinner style="arc" label="arc" />
      <Spinner style="arrow" label="arrow" />
    </Box>
  );
}
