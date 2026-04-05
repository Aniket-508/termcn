import { Text } from "ink";

import { ScrollView } from "@/registry/ui/scroll-view";

export default function ScrollViewDemo() {
  return (
    <ScrollView height={5}>
      <Text>Line 1</Text>
      <Text>Line 2</Text>
      <Text>Line 3</Text>
      <Text>Line 4</Text>
      <Text>Line 5</Text>
      <Text>Line 6</Text>
      <Text>Line 7</Text>
      <Text>Line 8</Text>
    </ScrollView>
  );
}
