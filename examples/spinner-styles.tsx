import { Box } from "ink";

import { Spinner } from "@/registry/ui/spinner";

export default function SpinnerStyles() {
  return (
    <Box flexDirection="column" gap={1}>
      <Spinner type="dots" label="dots" />
      <Spinner type="line" label="line" />
      <Spinner type="star" label="star" />
      <Spinner type="bounce" label="bounce" />
      <Spinner type="arc" label="arc" />
      <Spinner type="arrow" label="arrow" />
    </Box>
  );
}
