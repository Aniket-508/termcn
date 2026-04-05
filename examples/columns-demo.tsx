import { Text } from "ink";

import { Columns } from "@/registry/ui/columns";

export default function ColumnsDemo() {
  return (
    <Columns gap={2} align="center">
      <Text>Left</Text>
      <Text>Center</Text>
      <Text>Right</Text>
    </Columns>
  );
}
