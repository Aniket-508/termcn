import { Text } from "ink";

import { AspectRatio } from "@/registry/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <AspectRatio ratio={16 / 9} width={48}>
      <Text>Widescreen content</Text>
    </AspectRatio>
  );
}
