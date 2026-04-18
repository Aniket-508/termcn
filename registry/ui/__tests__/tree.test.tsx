import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Tree } from "../tree";
import { renderTui } from "./render-tui";

describe("Tree", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const nodes = [
    {
      children: [
        { key: "index", label: "index.ts" },
        { key: "utils", label: "utils.ts" },
      ],
      key: "src",
      label: "src",
    },
    { key: "readme", label: "README.md" },
  ];

  it("renders top-level node labels", () => {
    const tui = renderTui(<Tree nodes={nodes} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("src")).toBe(true);
    expect(tui.screen.contains("README.md")).toBe(true);
  });

  it("shows collapsed icon for nodes with children", () => {
    const tui = renderTui(<Tree nodes={nodes} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("▶")).toBe(true);
  });

  it("shows leaf icon for leaf nodes", () => {
    const tui = renderTui(<Tree nodes={nodes} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("•")).toBe(true);
  });

  it("expands node on right arrow", async () => {
    const tui = renderTui(<Tree nodes={nodes} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("▼")).toBe(true);
    expect(tui.screen.contains("index.ts")).toBe(true);
    expect(tui.screen.contains("utils.ts")).toBe(true);
  });

  it("collapses node on left arrow", async () => {
    const tui = renderTui(<Tree nodes={nodes} defaultExpanded={["src"]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("index.ts")).toBe(true);
    tui.keys.left();
    await tui.flush();
    expect(tui.screen.contains("index.ts")).toBe(false);
    expect(tui.screen.contains("▶")).toBe(true);
  });

  it("navigates with up/down arrows", async () => {
    const onSelect = vi.fn();
    const tui = renderTui(<Tree nodes={nodes} onSelect={onSelect} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "readme" })
    );
  });

  it("calls onSelect on enter", () => {
    const onSelect = vi.fn();
    const tui = renderTui(<Tree nodes={nodes} onSelect={onSelect} />);
    ({ unmount } = tui);
    tui.keys.enter();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "src" })
    );
  });

  it("renders defaultExpanded nodes", () => {
    const tui = renderTui(<Tree nodes={nodes} defaultExpanded={["src"]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("index.ts")).toBe(true);
    expect(tui.screen.contains("utils.ts")).toBe(true);
  });

  it("supports custom icons", () => {
    const tui = renderTui(
      <Tree nodes={nodes} expandedIcon="[-]" collapsedIcon="[+]" leafIcon="~" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("[+]")).toBe(true);
    expect(tui.screen.contains("~")).toBe(true);
  });
});
