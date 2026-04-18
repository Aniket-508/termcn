import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { CommandPalette } from "../command-palette";
import type { TuiInstance } from "./render-tui";
import { renderTui } from "./render-tui";

const typeChars = async (tui: TuiInstance, text: string) => {
  for (const char of text) {
    tui.keys.press(char);
    await tui.flush();
  }
};

describe("CommandPalette", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const commands = [
    { id: "save", label: "Save File", shortcut: "Ctrl+S" },
    { id: "open", label: "Open File", shortcut: "Ctrl+O" },
    { id: "close", label: "Close Tab" },
    { description: "Find in files", id: "search", label: "Search" },
  ];

  it("renders nothing when closed", () => {
    const tui = renderTui(
      <CommandPalette commands={commands} isOpen={false} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Save File")).toBe(false);
  });

  it("renders commands when open", () => {
    const tui = renderTui(<CommandPalette commands={commands} isOpen={true} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Save File")).toBe(true);
    expect(tui.screen.contains("Open File")).toBe(true);
  });

  it("renders placeholder", () => {
    const tui = renderTui(
      <CommandPalette commands={commands} isOpen={true} placeholder="Run..." />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Run...")).toBe(true);
  });

  it("renders shortcut badges", () => {
    const tui = renderTui(<CommandPalette commands={commands} isOpen={true} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Ctrl+S")).toBe(true);
  });

  it("renders command description", () => {
    const tui = renderTui(<CommandPalette commands={commands} isOpen={true} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Find in files")).toBe(true);
  });

  it("filters commands by query", async () => {
    const tui = renderTui(<CommandPalette commands={commands} isOpen={true} />);
    ({ unmount } = tui);
    await typeChars(tui, "save");
    expect(tui.screen.contains("Save File")).toBe(true);
    expect(tui.screen.contains("Close Tab")).toBe(false);
  });

  it("shows no commands found when filter yields nothing", async () => {
    const tui = renderTui(<CommandPalette commands={commands} isOpen={true} />);
    ({ unmount } = tui);
    await typeChars(tui, "zzzzz");
    expect(tui.screen.contains("No commands found")).toBe(true);
  });

  it("selects command on enter", async () => {
    const onSelect = vi.fn();
    const cmds = [
      { id: "a", label: "Alpha", onSelect },
      { id: "b", label: "Beta" },
    ];
    const tui = renderTui(<CommandPalette commands={cmds} isOpen={true} />);
    ({ unmount } = tui);
    tui.keys.enter();
    await tui.flush();
    expect(onSelect).toHaveBeenCalled();
  });

  it("calls onClose on escape", async () => {
    const onClose = vi.fn();
    const tui = renderTui(
      <CommandPalette commands={commands} isOpen={true} onClose={onClose} />
    );
    ({ unmount } = tui);
    tui.keys.escape();
    await tui.flush();
    expect(onClose).toHaveBeenCalled();
  });

  it("navigates with up/down arrows", async () => {
    const onSelectA = vi.fn();
    const onSelectB = vi.fn();
    const cmds = [
      { id: "a", label: "Alpha", onSelect: onSelectA },
      { id: "b", label: "Beta", onSelect: onSelectB },
    ];
    const tui = renderTui(<CommandPalette commands={cmds} isOpen={true} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onSelectB).toHaveBeenCalled();
  });
});
