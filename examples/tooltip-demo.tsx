import { Text } from "ink";

import { Tooltip } from "@/registry/ui/tooltip";

export default function TooltipDemo() {
  return (
    <Tooltip
      content="Save your current progress"
      position="top"
      isVisible={true}
    >
      <Text bold>[S] Save</Text>
    </Tooltip>
  );
}
