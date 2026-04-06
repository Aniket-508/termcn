import { SITE } from "@/constants/site";
import { Clipboard } from "@/registry/ui/clipboard";

export default function ClipboardDemo() {
  return (
    <Clipboard value={`npx shadcn@latest add ${SITE.URL}/r/clipboard.json`} />
  );
}
