import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Dialog } from "../dialog";
import { renderTui } from "./render-tui";

describe("Dialog", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders nothing when closed", () => {
    const tui = renderTui(
      <Dialog>
        <Text>Hidden</Text>
      </Dialog>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Hidden")).toBe(false);
  });

  it("renders children when open", () => {
    const tui = renderTui(
      <Dialog isOpen>
        <Text>Dialog body</Text>
      </Dialog>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Dialog body")).toBe(true);
  });

  it("renders title", () => {
    const tui = renderTui(
      <Dialog isOpen title="Confirm Action">
        <Text>body</Text>
      </Dialog>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Confirm Action")).toBe(true);
  });

  it("renders default button labels", () => {
    const tui = renderTui(
      <Dialog isOpen>
        <Text>body</Text>
      </Dialog>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("OK")).toBe(true);
    expect(tui.screen.contains("Cancel")).toBe(true);
  });

  it("renders custom button labels", () => {
    const tui = renderTui(
      <Dialog isOpen confirmLabel="Delete" cancelLabel="Keep">
        <Text>body</Text>
      </Dialog>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Delete")).toBe(true);
    expect(tui.screen.contains("Keep")).toBe(true);
  });

  it("calls onCancel on Enter when cancel button focused (default)", async () => {
    const onCancel = vi.fn();
    const tui = renderTui(
      <Dialog isOpen onCancel={onCancel}>
        <Text>body</Text>
      </Dialog>
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.enter();
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("calls onConfirm on Enter after Tab to confirm button", async () => {
    const onConfirm = vi.fn();
    const tui = renderTui(
      <Dialog isOpen onConfirm={onConfirm}>
        <Text>body</Text>
      </Dialog>
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.tab();
    await tui.flush();
    tui.keys.enter();
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("toggles focus with arrow keys", async () => {
    const onConfirm = vi.fn();
    const tui = renderTui(
      <Dialog isOpen onConfirm={onConfirm}>
        <Text>body</Text>
      </Dialog>
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.right();
    await tui.flush();
    tui.keys.enter();
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("calls onCancel on Escape", async () => {
    const onCancel = vi.fn();
    const tui = renderTui(
      <Dialog isOpen onCancel={onCancel}>
        <Text>body</Text>
      </Dialog>
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.escape();
    await tui.flush();
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("does not fire callbacks when closed", async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const tui = renderTui(
      <Dialog onConfirm={onConfirm} onCancel={onCancel}>
        <Text>body</Text>
      </Dialog>
    );
    ({ unmount } = tui);
    tui.keys.enter();
    tui.keys.escape();
    await tui.flush();
    expect(onConfirm).not.toHaveBeenCalled();
    expect(onCancel).not.toHaveBeenCalled();
  });
});
