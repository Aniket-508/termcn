import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Drawer } from "../drawer";
import { renderTui } from "./render-tui";

describe("Drawer", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders nothing when closed", () => {
    const tui = renderTui(
      <Drawer>
        <Text>Hidden</Text>
      </Drawer>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Hidden")).toBe(false);
  });

  it("renders children when open", () => {
    const tui = renderTui(
      <Drawer isOpen>
        <Text>Drawer content</Text>
      </Drawer>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Drawer content")).toBe(true);
  });

  it("renders title", () => {
    const tui = renderTui(
      <Drawer isOpen title="Settings">
        <Text>body</Text>
      </Drawer>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Settings")).toBe(true);
  });

  it("shows Esc to close hint", () => {
    const tui = renderTui(
      <Drawer isOpen>
        <Text>body</Text>
      </Drawer>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Esc to close")).toBe(true);
  });

  it("calls onClose on Escape", async () => {
    const onClose = vi.fn();
    const tui = renderTui(
      <Drawer isOpen onClose={onClose}>
        <Text>body</Text>
      </Drawer>
    );
    ({ unmount } = tui);
    tui.keys.escape();
    await tui.flush();
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose when closed", async () => {
    const onClose = vi.fn();
    const tui = renderTui(
      <Drawer onClose={onClose}>
        <Text>body</Text>
      </Drawer>
    );
    ({ unmount } = tui);
    tui.keys.escape();
    await tui.flush();
    expect(onClose).not.toHaveBeenCalled();
  });
});
