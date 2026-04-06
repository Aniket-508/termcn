import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Modal } from "../modal";
import { renderTui } from "./render-tui";

describe("Modal", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders nothing when closed", () => {
    const tui = renderTui(
      <Modal open={false}>
        <Text>Hidden content</Text>
      </Modal>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Hidden content")).toBe(false);
  });

  it("renders children when open", () => {
    const tui = renderTui(
      <Modal open>
        <Text>Visible content</Text>
      </Modal>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Visible content")).toBe(true);
  });

  it("renders title", () => {
    const tui = renderTui(
      <Modal open title="My Modal">
        <Text>body</Text>
      </Modal>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("My Modal")).toBe(true);
  });

  it("shows close hint by default", () => {
    const tui = renderTui(
      <Modal open>
        <Text>body</Text>
      </Modal>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Press Esc to close")).toBe(true);
  });

  it("hides close hint when closeHint=false", () => {
    const tui = renderTui(
      <Modal open closeHint={false}>
        <Text>body</Text>
      </Modal>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Press Esc to close")).toBe(false);
  });

  it("renders custom close hint", () => {
    const tui = renderTui(
      <Modal open closeHint="Hit Esc">
        <Text>body</Text>
      </Modal>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Hit Esc")).toBe(true);
  });

  it("calls onClose on Escape", async () => {
    const onClose = vi.fn();
    const tui = renderTui(
      <Modal open onClose={onClose}>
        <Text>body</Text>
      </Modal>
    );
    ({ unmount } = tui);
    tui.keys.escape();
    await tui.flush();
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("does not call onClose when closed", async () => {
    const onClose = vi.fn();
    const tui = renderTui(
      <Modal open={false} onClose={onClose}>
        <Text>body</Text>
      </Modal>
    );
    ({ unmount } = tui);
    tui.keys.escape();
    await tui.flush();
    expect(onClose).not.toHaveBeenCalled();
  });
});
