import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Sparkline } from "../sparkline";
import { renderTui } from "./render-tui";

describe("Sparkline", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders sparkline characters (braille)", () => {
    const tui = renderTui(<Sparkline data={[1, 2, 3, 4, 5]} width={5} />);
    ({ unmount } = tui);
    const text = tui.screen.text();
    expect(/[⣀-⣿]/.test(text)).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<Sparkline data={[10, 20]} width={4} label="cpu" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("cpu")).toBe(true);
  });

  it('renders empty state with "─"', () => {
    const tui = renderTui(<Sparkline data={[]} width={8} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("────────")).toBe(true);
  });
});
