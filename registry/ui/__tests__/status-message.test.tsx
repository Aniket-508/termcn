import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import { StatusMessage } from "../status-message";
import { renderTui } from "./render-tui";

describe("StatusMessage", () => {
  let unmount: () => void;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    unmount?.();
    vi.useRealTimers();
  });

  it("renders children text", () => {
    const tui = renderTui(<StatusMessage>Installing</StatusMessage>);
    ({ unmount } = tui);
    expect(tui.screen.contains("Installing")).toBe(true);
  });

  it("renders info icon by default", () => {
    const tui = renderTui(<StatusMessage>Info</StatusMessage>);
    ({ unmount } = tui);
    expect(tui.screen.contains("ℹ")).toBe(true);
  });

  it("renders success icon", () => {
    const tui = renderTui(
      <StatusMessage variant="success">Done</StatusMessage>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("✓")).toBe(true);
  });

  it("renders error icon", () => {
    const tui = renderTui(
      <StatusMessage variant="error">Failed</StatusMessage>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("✗")).toBe(true);
  });

  it("renders warning icon", () => {
    const tui = renderTui(
      <StatusMessage variant="warning">Caution</StatusMessage>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("⚠")).toBe(true);
  });

  it("renders pending icon", () => {
    const tui = renderTui(
      <StatusMessage variant="pending">Waiting</StatusMessage>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("○")).toBe(true);
  });

  it("renders spinner for loading variant", () => {
    const tui = renderTui(
      <StatusMessage variant="loading">Loading data</StatusMessage>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Loading data")).toBe(true);
    expect(tui.screen.contains("⠋")).toBe(true);
  });

  it("renders custom icon", () => {
    const tui = renderTui(<StatusMessage icon="🚀">Deploying</StatusMessage>);
    ({ unmount } = tui);
    expect(tui.screen.contains("🚀")).toBe(true);
  });
});
