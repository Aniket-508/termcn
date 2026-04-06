import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Alert } from "../alert";
import { renderTui } from "./render-tui";

describe("Alert", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <Alert bordered={false}>
        <Text>body text</Text>
      </Alert>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("body text")).toBe(true);
  });

  it("renders title", () => {
    const tui = renderTui(
      <Alert title="Notice" bordered={false}>
        <Text>msg</Text>
      </Alert>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Notice")).toBe(true);
  });

  it.each([
    ["success", "✓"],
    ["error", "✗"],
    ["warning", "⚠"],
    ["info", "ℹ"],
  ] as const)("renders variant icon for %s", (variant, icon) => {
    const tui = renderTui(<Alert variant={variant} bordered={false} />);
    ({ unmount } = tui);
    expect(tui.screen.contains(icon)).toBe(true);
  });

  it("renders without border", () => {
    const tui = renderTui(
      <Alert bordered={false} title="T">
        <Text>inside</Text>
      </Alert>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("inside")).toBe(true);
    expect(tui.screen.contains("T")).toBe(true);
  });
});
