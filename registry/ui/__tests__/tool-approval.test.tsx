import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { ToolApproval } from "../tool-approval";
import { renderTui } from "./render-tui";

describe("ToolApproval", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders tool name", () => {
    const tui = renderTui(<ToolApproval name="file_write" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("file_write")).toBe(true);
  });

  it("renders title text", () => {
    const tui = renderTui(<ToolApproval name="shell" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Tool Approval Required")).toBe(true);
  });

  it("renders description when provided", () => {
    const tui = renderTui(
      <ToolApproval name="exec" description="Run a shell command" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Run a shell command")).toBe(true);
  });

  it("renders risk level label", () => {
    const tui = renderTui(<ToolApproval name="rm" risk="high" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[HIGH RISK]")).toBe(true);
  });

  it("renders LOW risk by default", () => {
    const tui = renderTui(<ToolApproval name="read" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[LOW RISK]")).toBe(true);
  });

  it("renders args when provided", () => {
    const tui = renderTui(
      <ToolApproval name="write" args={{ mode: "w", path: "/tmp/file" }} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("path")).toBe(true);
    expect(tui.screen.contains("/tmp/file")).toBe(true);
  });

  it("calls onApprove when pressing y", () => {
    const onApprove = vi.fn();
    const tui = renderTui(<ToolApproval name="exec" onApprove={onApprove} />);
    ({ unmount } = tui);
    tui.keys.press("y");
    expect(onApprove).toHaveBeenCalled();
  });

  it("calls onDeny when pressing n", () => {
    const onDeny = vi.fn();
    const tui = renderTui(<ToolApproval name="exec" onDeny={onDeny} />);
    ({ unmount } = tui);
    tui.keys.press("n");
    expect(onDeny).toHaveBeenCalled();
  });

  it("calls onAlwaysAllow when pressing a", () => {
    const onAlwaysAllow = vi.fn();
    const tui = renderTui(
      <ToolApproval name="exec" onAlwaysAllow={onAlwaysAllow} />
    );
    ({ unmount } = tui);
    tui.keys.press("a");
    expect(onAlwaysAllow).toHaveBeenCalled();
  });

  it("shows Always Allow option only when handler provided", () => {
    const tui = renderTui(<ToolApproval name="exec" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[y] Approve")).toBe(true);
    expect(tui.screen.contains("[n] Deny")).toBe(true);
    expect(tui.screen.contains("[a] Always Allow")).toBe(false);
  });

  it("shows Always Allow when onAlwaysAllow is provided", () => {
    const tui = renderTui(
      <ToolApproval name="exec" onAlwaysAllow={() => {}} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("[a] Always Allow")).toBe(true);
  });
});
