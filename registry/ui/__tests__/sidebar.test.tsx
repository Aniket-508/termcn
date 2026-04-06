import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Sidebar } from "../sidebar";
import { renderTui } from "./render-tui";

describe("Sidebar", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const items = [
    { icon: "🏠", key: "home", label: "Home" },
    { key: "settings", label: "Settings" },
    {
      children: [
        { key: "docs", label: "Documents" },
        { key: "images", label: "Images" },
      ],
      key: "files",
      label: "Files",
    },
  ];

  it("renders item labels", () => {
    const tui = renderTui(<Sidebar items={items} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Home")).toBe(true);
    expect(tui.screen.contains("Settings")).toBe(true);
    expect(tui.screen.contains("Files")).toBe(true);
  });

  it("renders title when provided", () => {
    const tui = renderTui(<Sidebar items={items} title="Navigation" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Navigation")).toBe(true);
  });

  it("renders icon for item", () => {
    const tui = renderTui(<Sidebar items={items} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("🏠")).toBe(true);
  });

  it("highlights active item", () => {
    const tui = renderTui(<Sidebar items={items} activeKey="home" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("▌")).toBe(true);
  });

  it("navigates with arrow keys", async () => {
    const onSelect = vi.fn();
    const tui = renderTui(<Sidebar items={items} onSelect={onSelect} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onSelect).toHaveBeenCalledWith("settings");
  });

  it("expands children on right arrow", async () => {
    const tui = renderTui(<Sidebar items={items} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Documents")).toBe(true);
    expect(tui.screen.contains("Images")).toBe(true);
  });

  it("collapses children on left arrow", async () => {
    const tui = renderTui(<Sidebar items={items} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Documents")).toBe(true);
    tui.keys.left();
    await tui.flush();
    expect(tui.screen.contains("Documents")).toBe(false);
  });

  it("toggles expand on enter for parent items", async () => {
    const tui = renderTui(<Sidebar items={items} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(tui.screen.contains("Documents")).toBe(true);
  });

  it("renders collapsed mode showing first char", () => {
    const simpleItems = [{ key: "home", label: "Home" }];
    const tui = renderTui(<Sidebar items={simpleItems} collapsed />);
    ({ unmount } = tui);
    expect(tui.screen.contains("H")).toBe(true);
  });

  it("renders badge when provided", () => {
    const badgedItems = [{ badge: 5, key: "inbox", label: "Inbox" }];
    const tui = renderTui(<Sidebar items={badgedItems} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("5")).toBe(true);
  });
});
