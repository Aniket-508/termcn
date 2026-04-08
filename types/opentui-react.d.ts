declare module "@opentui/react" {
  import type { ReactNode } from "react";

  export function createRoot(renderer: unknown): {
    render(node: ReactNode): void;
  };
}
