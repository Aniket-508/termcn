import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Confirm } from "../confirm";
import { renderTui } from "./render-tui";

describe("Confirm", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders message and default labels", () => {
    const tui = renderTui(<Confirm message="Delete file?" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Delete file?")).toBe(true);
    expect(tui.screen.contains("Yes")).toBe(true);
    expect(tui.screen.contains("No")).toBe(true);
  });

  it("renders custom labels", () => {
    const tui = renderTui(
      <Confirm message="Sure?" confirmLabel="Yep" cancelLabel="Nah" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Yep")).toBe(true);
    expect(tui.screen.contains("Nah")).toBe(true);
  });

  it("calls onConfirm when Enter pressed with defaultValue=true", () => {
    const onConfirm = vi.fn();
    const tui = renderTui(
      <Confirm message="Go?" defaultValue={true} onConfirm={onConfirm} />
    );
    ({ unmount } = tui);
    tui.keys.enter();
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("calls onCancel when Enter pressed with defaultValue=false", () => {
    const onCancel = vi.fn();
    const tui = renderTui(
      <Confirm message="Go?" defaultValue={false} onCancel={onCancel} />
    );
    ({ unmount } = tui);
    tui.keys.enter();
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("toggles selection with arrow keys", async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const tui = renderTui(
      <Confirm
        message="Go?"
        defaultValue={false}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    );
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    tui.keys.enter();
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("toggles back with left arrow", async () => {
    const onCancel = vi.fn();
    const tui = renderTui(
      <Confirm message="Go?" defaultValue={true} onCancel={onCancel} />
    );
    ({ unmount } = tui);
    tui.keys.left();
    await tui.flush();
    tui.keys.enter();
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("'y' shortcut calls onConfirm", () => {
    const onConfirm = vi.fn();
    const tui = renderTui(<Confirm message="Go?" onConfirm={onConfirm} />);
    ({ unmount } = tui);
    tui.keys.press("y");
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("'n' shortcut calls onCancel", () => {
    const onCancel = vi.fn();
    const tui = renderTui(<Confirm message="Go?" onCancel={onCancel} />);
    ({ unmount } = tui);
    tui.keys.press("n");
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("'Y' shortcut also works", () => {
    const onConfirm = vi.fn();
    const tui = renderTui(<Confirm message="Go?" onConfirm={onConfirm} />);
    ({ unmount } = tui);
    tui.keys.press("Y");
    expect(onConfirm).toHaveBeenCalledOnce();
  });
});
