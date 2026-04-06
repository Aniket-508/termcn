import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Badge } from "../badge";
import { renderTui } from "./render-tui";

describe("Badge", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children text", () => {
    const tui = renderTui(<Badge>hello</Badge>);
    ({ unmount } = tui);
    expect(tui.screen.contains("hello")).toBe(true);
  });

  it("renders without border when bordered=false", () => {
    const tui = renderTui(<Badge bordered={false}>plain</Badge>);
    ({ unmount } = tui);
    expect(tui.screen.contains("plain")).toBe(true);
  });

  it("renders all variants", () => {
    for (const variant of [
      "default",
      "success",
      "warning",
      "error",
      "info",
      "secondary",
    ] as const) {
      const tui = renderTui(<Badge variant={variant}>v</Badge>);
      expect(tui.screen.text().length).toBeGreaterThan(0);
      tui.unmount();
    }
  });
});
