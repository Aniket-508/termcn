import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Help } from "../help";
import { renderTui } from "./render-tui";

describe("Help", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders keymap entries", () => {
    const tui = renderTui(
      <Help keymap={{ j: "down", q: "quit" }} title="Keys" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("q")).toBe(true);
    expect(tui.screen.contains("quit")).toBe(true);
    expect(tui.screen.contains("j")).toBe(true);
    expect(tui.screen.contains("down")).toBe(true);
  });

  it("renders title", () => {
    const tui = renderTui(<Help keymap={{ a: "action" }} title="Shortcuts" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Shortcuts")).toBe(true);
  });

  it("renders compact mode with · separator", () => {
    const tui = renderTui(
      <Help compact title="Cmd" keymap={{ x: "exit", y: "yank" }} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("·")).toBe(true);
    expect(tui.screen.contains("x: exit")).toBe(true);
    expect(tui.screen.contains("y: yank")).toBe(true);
  });
});
