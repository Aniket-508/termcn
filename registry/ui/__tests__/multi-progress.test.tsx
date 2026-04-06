import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { MultiProgress } from "../multi-progress";
import { renderTui } from "./render-tui";

describe("MultiProgress", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders item labels", () => {
    const tui = renderTui(
      <MultiProgress
        items={[
          { id: "a", label: "Download", total: 4, value: 1 },
          { id: "b", label: "Install", total: 1, value: 0 },
        ]}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Download")).toBe(true);
    expect(tui.screen.contains("Install")).toBe(true);
  });

  it('renders progress bars with "█" and "░"', () => {
    const tui = renderTui(
      <MultiProgress
        compact
        items={[{ id: "x", label: "Task", total: 10, value: 5 }]}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
    expect(tui.screen.contains("░")).toBe(true);
  });

  it("renders percentage", () => {
    const tui = renderTui(
      <MultiProgress
        compact
        showPercent
        items={[{ id: "x", label: "Half", total: 2, value: 1 }]}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("50%")).toBe(true);
  });
});
