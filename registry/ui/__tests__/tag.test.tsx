import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";

import { Tag } from "../tag";
import { renderTui } from "./render-tui";

describe("Tag", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children text", () => {
    const tui = renderTui(<Tag>typescript</Tag>);
    ({ unmount } = tui);
    expect(tui.screen.contains("typescript")).toBe(true);
  });

  it('renders remove glyph "×" when onRemove provided', () => {
    const onRemove = vi.fn();
    const tui = renderTui(<Tag onRemove={onRemove}>beta</Tag>);
    ({ unmount } = tui);
    expect(tui.screen.contains("×")).toBe(true);
    expect(tui.screen.contains("beta")).toBe(true);
  });
});
