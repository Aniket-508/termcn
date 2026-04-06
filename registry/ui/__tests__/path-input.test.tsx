import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { PathInput } from "../path-input";
import { renderTui } from "./render-tui";

vi.mock("node:fs", () => ({
  readdirSync: vi.fn(() => []),
  statSync: vi.fn(() => ({ isDirectory: () => false })),
}));

describe("PathInput", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders label", () => {
    const tui = renderTui(<PathInput label="Path" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Path")).toBe(true);
  });

  it("renders placeholder", () => {
    const tui = renderTui(<PathInput placeholder="/home" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("/home")).toBe(true);
  });

  it("renders default placeholder", () => {
    const tui = renderTui(<PathInput autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("/")).toBe(true);
  });

  it("renders cursor when focused", async () => {
    const tui = renderTui(<PathInput autoFocus />);
    ({ unmount } = tui);
    await tui.flush();
    expect(tui.screen.contains("█")).toBe(true);
  });

  it("calls onChange on typing", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<PathInput autoFocus onChange={onChange} />);
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.type("/");
    await tui.flush();
    expect(onChange).toHaveBeenCalled();
  });
});
