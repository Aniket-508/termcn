import { Box } from "ink";

import { Checkbox } from "@/registry/ui/checkbox";

export default function CheckboxDemo() {
  return (
    <Box flexDirection="column" gap={1}>
      <Checkbox checked label="Enable telemetry" />
      <Checkbox label="Send crash reports" />
      <Checkbox label="Select all" indeterminate />
    </Box>
  );
}
