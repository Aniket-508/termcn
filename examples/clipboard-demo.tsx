import { Clipboard } from "@/registry/ui/clipboard";

export default function ClipboardDemo() {
  return (
    <Clipboard value="npx shadcn@latest add https://termcn.vercel.app/r/clipboard.json" />
  );
}
