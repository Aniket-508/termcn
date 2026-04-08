import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { createElement } from "react";

import { Spinner } from "@/registry/bases/opentui/ui/spinner";

const renderer = await createCliRenderer({ exitOnCtrlC: true });

createRoot(renderer).render(
  createElement(Spinner, {
    color: "cyan",
    label: "Loading...",
    name: "bouncingBall",
  })
);
