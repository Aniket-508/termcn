import { Help } from "@/registry/ui/help";

export default function HelpDemo() {
  return (
    <Help
      title="Keyboard Shortcuts"
      keymap={{
        "/": "Search",
        "ctrl+s": "Save",
        h: "Help",
        j: "Move down",
        k: "Move up",
        q: "Quit",
      }}
    />
  );
}
