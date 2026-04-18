import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Menu } from "../menu";
import { renderTui } from "./render-tui";

describe("Menu", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const items = [
    { key: "copy", label: "Copy" },
    { key: "paste", label: "Paste" },
    { key: "cut", label: "Cut" },
  ];

  it("renders all items", () => {
    const tui = renderTui(<Menu items={items} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Copy")).toBe(true);
    expect(tui.screen.contains("Paste")).toBe(true);
    expect(tui.screen.contains("Cut")).toBe(true);
  });

  it("renders title", () => {
    const tui = renderTui(<Menu items={items} title="Edit" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Edit")).toBe(true);
  });

  it("renders shortcuts", () => {
    const itemsWithShortcuts = [
      { key: "copy", label: "Copy", shortcut: "Ctrl+C" },
    ];
    const tui = renderTui(<Menu items={itemsWithShortcuts} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Ctrl+C")).toBe(true);
  });

  it("renders separator", () => {
    const itemsWithSep = [
      { key: "copy", label: "Copy" },
      { key: "sep", label: "", separator: true },
      { key: "paste", label: "Paste" },
    ];
    const tui = renderTui(<Menu items={itemsWithSep} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("─")).toBe(true);
  });

  it("navigates with arrow keys and selects on enter", async () => {
    const onSelect = vi.fn();
    const tui = renderTui(<Menu items={items} onSelect={onSelect} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "paste" })
    );
  });

  it("skips disabled items during navigation", async () => {
    const onSelect = vi.fn();
    const itemsWithDisabled = [
      { key: "a", label: "A" },
      { disabled: true, key: "b", label: "B" },
      { key: "c", label: "C" },
    ];
    const tui = renderTui(
      <Menu items={itemsWithDisabled} onSelect={onSelect} />
    );
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "c" })
    );
  });

  it("opens submenu with right arrow", async () => {
    const itemsWithSub = [
      {
        children: [
          { key: "new", label: "New" },
          { key: "open", label: "Open" },
        ],
        key: "file",
        label: "File",
      },
    ];
    const tui = renderTui(<Menu items={itemsWithSub} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("New")).toBe(true);
    expect(tui.screen.contains("Open")).toBe(true);
  });

  it("closes submenu with escape", async () => {
    const itemsWithSub = [
      {
        children: [{ key: "new", label: "New File" }],
        key: "file",
        label: "File",
      },
    ];
    const tui = renderTui(<Menu items={itemsWithSub} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("New File")).toBe(true);
    tui.keys.escape();
    await tui.flush();
    expect(tui.screen.contains("File")).toBe(true);
  });
});
