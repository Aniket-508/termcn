import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Popover } from "../popover";
import { renderTui } from "./render-tui";

describe("Popover", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("always renders trigger", () => {
    const tui = renderTui(
      <Popover trigger={<Text>Open</Text>}>
        <Text>Content</Text>
      </Popover>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Open")).toBe(true);
  });

  it("hides children when closed", () => {
    const tui = renderTui(
      <Popover trigger={<Text>Open</Text>}>
        <Text>Hidden content</Text>
      </Popover>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Hidden content")).toBe(false);
  });

  it("shows children when open", () => {
    const tui = renderTui(
      <Popover trigger={<Text>Open</Text>} isOpen>
        <Text>Visible content</Text>
      </Popover>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Visible content")).toBe(true);
  });

  it("renders title when open", () => {
    const tui = renderTui(
      <Popover trigger={<Text>Open</Text>} isOpen title="Pop Title">
        <Text>body</Text>
      </Popover>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Pop Title")).toBe(true);
  });

  it("shows close hint when open", () => {
    const tui = renderTui(
      <Popover trigger={<Text>Open</Text>} isOpen>
        <Text>body</Text>
      </Popover>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Press Esc to close")).toBe(true);
  });

  it("calls onClose on Escape", async () => {
    const onClose = vi.fn();
    const tui = renderTui(
      <Popover trigger={<Text>Open</Text>} isOpen onClose={onClose}>
        <Text>body</Text>
      </Popover>
    );
    ({ unmount } = tui);
    tui.keys.escape();
    await tui.flush();
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose when closed", async () => {
    const onClose = vi.fn();
    const tui = renderTui(
      <Popover trigger={<Text>Open</Text>} onClose={onClose}>
        <Text>body</Text>
      </Popover>
    );
    ({ unmount } = tui);
    tui.keys.escape();
    await tui.flush();
    expect(onClose).not.toHaveBeenCalled();
  });
});
