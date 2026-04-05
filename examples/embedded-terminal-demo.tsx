import { EmbeddedTerminal } from "@/registry/ui/embedded-terminal";

export default function EmbeddedTerminalDemo() {
  return <EmbeddedTerminal command="bash" args={["-c", "echo Hello world"]} />;
}
