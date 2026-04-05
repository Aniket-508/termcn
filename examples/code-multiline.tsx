import { Code } from "@/registry/ui/code";

export default function CodeMultiline() {
  return (
    <Code language="typescript">
      {`const greeting = "Hello, world!";\nconsole.log(greeting);`}
    </Code>
  );
}
