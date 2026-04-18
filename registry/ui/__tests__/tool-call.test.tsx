import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { ToolCall } from "../tool-call";
import { renderTui } from "./render-tui";

describe("ToolCall", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders tool name", () => {
    const tui = renderTui(<ToolCall name="file_read" status="pending" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("file_read")).toBe(true);
  });

  it("renders pending status icon", () => {
    const tui = renderTui(<ToolCall name="test" status="pending" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("○")).toBe(true);
  });

  it("renders success status icon", () => {
    const tui = renderTui(<ToolCall name="test" status="success" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("✓")).toBe(true);
  });

  it("renders error status icon", () => {
    const tui = renderTui(<ToolCall name="test" status="error" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("✗")).toBe(true);
  });

  it("renders duration when provided", () => {
    const tui = renderTui(
      <ToolCall name="test" status="success" duration={150} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("150ms")).toBe(true);
  });

  it("starts collapsed by default", () => {
    const tui = renderTui(
      <ToolCall
        name="test"
        status="success"
        args={{ file: "test.ts" }}
        result="done"
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("▶")).toBe(true);
    expect(tui.screen.contains("Args:")).toBe(false);
  });

  it("expands on enter to show args and result", async () => {
    const tui = renderTui(
      <ToolCall
        name="test"
        status="success"
        args={{ file: "test.ts" }}
        result="done"
      />
    );
    ({ unmount } = tui);
    tui.keys.enter();
    await tui.flush();
    expect(tui.screen.contains("▼")).toBe(true);
    expect(tui.screen.contains("Args:")).toBe(true);
    expect(tui.screen.contains("file")).toBe(true);
    expect(tui.screen.contains("Result:")).toBe(true);
    expect(tui.screen.contains("done")).toBe(true);
  });

  it("toggles collapse state", async () => {
    const tui = renderTui(
      <ToolCall name="test" status="success" args={{ x: 1 }} />
    );
    ({ unmount } = tui);
    tui.keys.enter();
    await tui.flush();
    expect(tui.screen.contains("Args:")).toBe(true);
    tui.keys.enter();
    await tui.flush();
    expect(tui.screen.contains("Args:")).toBe(false);
  });

  it("renders expanded by default when defaultCollapsed is false", () => {
    const tui = renderTui(
      <ToolCall
        name="test"
        status="success"
        args={{ x: 1 }}
        defaultCollapsed={false}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Args:")).toBe(true);
  });
});
