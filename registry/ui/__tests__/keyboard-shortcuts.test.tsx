import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { KeyboardShortcuts } from "../keyboard-shortcuts";
import { renderTui } from "./render-tui";

describe("KeyboardShortcuts", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders shortcut keys and descriptions", () => {
    const tui = renderTui(
      <KeyboardShortcuts
        shortcuts={[
          { description: "Quit", key: "q" },
          { description: "Help", key: "?" },
        ]}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("q")).toBe(true);
    expect(tui.screen.contains("Quit")).toBe(true);
    expect(tui.screen.contains("?")).toBe(true);
    expect(tui.screen.contains("Help")).toBe(true);
  });

  it('renders title with "⌨"', () => {
    const tui = renderTui(
      <KeyboardShortcuts
        title="Shortcuts"
        shortcuts={[{ description: "Action", key: "a" }]}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("⌨")).toBe(true);
    expect(tui.screen.contains("Shortcuts")).toBe(true);
  });
});
