import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Banner } from "../banner";
import { renderTui } from "./render-tui";

describe("Banner", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(<Banner>Important message</Banner>);
    ({ unmount } = tui);
    expect(tui.screen.contains("Important message")).toBe(true);
  });

  it("renders title", () => {
    const tui = renderTui(<Banner title="Alert">body</Banner>);
    ({ unmount } = tui);
    expect(tui.screen.contains("Alert")).toBe(true);
  });

  it("renders accent character", () => {
    const tui = renderTui(<Banner>text</Banner>);
    ({ unmount } = tui);
    expect(tui.screen.contains("┃")).toBe(true);
  });

  it("renders custom accent character", () => {
    const tui = renderTui(<Banner accentChar="|">text</Banner>);
    ({ unmount } = tui);
    expect(tui.screen.contains("|")).toBe(true);
  });

  it.each([
    ["error", "✗"],
    ["info", "ℹ"],
    ["neutral", "·"],
    ["success", "✓"],
    ["warning", "⚠"],
  ] as const)("renders %s variant icon: %s", (variant, icon) => {
    const tui = renderTui(<Banner variant={variant}>text</Banner>);
    ({ unmount } = tui);
    expect(tui.screen.contains(icon)).toBe(true);
  });

  it("renders custom icon", () => {
    const tui = renderTui(<Banner icon="🔔">text</Banner>);
    ({ unmount } = tui);
    expect(tui.screen.contains("🔔")).toBe(true);
  });

  it("shows dismiss hint when dismissible", () => {
    const tui = renderTui(<Banner dismissible>text</Banner>);
    ({ unmount } = tui);
    expect(tui.screen.contains("press Esc to dismiss")).toBe(true);
  });

  it("does not show dismiss hint by default", () => {
    const tui = renderTui(<Banner>text</Banner>);
    ({ unmount } = tui);
    expect(tui.screen.contains("press Esc to dismiss")).toBe(false);
  });

  it("dismisses on Escape when dismissible", async () => {
    const onDismiss = vi.fn();
    const tui = renderTui(
      <Banner dismissible onDismiss={onDismiss}>
        Dismissable
      </Banner>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Dismissable")).toBe(true);
    tui.keys.escape();
    await tui.flush();
    expect(onDismiss).toHaveBeenCalledOnce();
    expect(tui.screen.contains("Dismissable")).toBe(false);
  });

  it("does not dismiss when not dismissible", async () => {
    const tui = renderTui(<Banner>Persistent</Banner>);
    ({ unmount } = tui);
    tui.keys.escape();
    await tui.flush();
    expect(tui.screen.contains("Persistent")).toBe(true);
  });
});
