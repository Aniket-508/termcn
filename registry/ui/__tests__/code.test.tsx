import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Code } from "../code";
import { renderTui } from "./render-tui";

describe("Code", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders code text", () => {
    const tui = renderTui(<Code>const x = 1</Code>);
    ({ unmount } = tui);
    expect(tui.screen.contains("const")).toBe(true);
    expect(tui.screen.contains("x")).toBe(true);
  });

  it("renders inline code", () => {
    const tui = renderTui(<Code inline>inline snippet</Code>);
    ({ unmount } = tui);
    expect(tui.screen.contains("inline snippet")).toBe(true);
  });
});
