import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Text } from "../text";
import { Tooltip } from "../tooltip";
import { renderTui } from "./render-tui";

describe("Tooltip", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children always", () => {
    const tui = renderTui(
      <Tooltip content="Hidden tip" isVisible={false}>
        <Text>anchor</Text>
      </Tooltip>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("anchor")).toBe(true);
  });

  it("shows tooltip content when visible", () => {
    const tui = renderTui(
      <Tooltip content="Shown tip" isVisible position="bottom">
        <Text>item</Text>
      </Tooltip>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("item")).toBe(true);
    expect(tui.screen.contains("Shown tip")).toBe(true);
  });

  it("hides tooltip when not visible", () => {
    const tui = renderTui(
      <Tooltip content="Secret" isVisible={false}>
        <Text>only this</Text>
      </Tooltip>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("only this")).toBe(true);
    expect(tui.screen.contains("Secret")).toBe(false);
  });
});
