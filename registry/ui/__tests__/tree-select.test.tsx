import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { TreeSelect } from "../tree-select";
import { renderTui } from "./render-tui";

describe("TreeSelect", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const nodes = [
    {
      children: [
        { label: "Apple", value: "apple" },
        { label: "Banana", value: "banana" },
      ],
      label: "Fruits",
      value: "fruits",
    },
    { label: "Vegetables", value: "vegetables" },
  ];

  it("renders top-level labels", () => {
    const tui = renderTui(<TreeSelect nodes={nodes} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Fruits")).toBe(true);
    expect(tui.screen.contains("Vegetables")).toBe(true);
  });

  it("renders label prop", () => {
    const tui = renderTui(<TreeSelect nodes={nodes} label="Select item" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Select item")).toBe(true);
  });

  it("shows collapsed icon for parent nodes", () => {
    const tui = renderTui(<TreeSelect nodes={nodes} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("▶")).toBe(true);
  });

  it("expands on right arrow", async () => {
    const tui = renderTui(<TreeSelect nodes={nodes} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Apple")).toBe(true);
    expect(tui.screen.contains("Banana")).toBe(true);
  });

  it("collapses on left arrow", async () => {
    const tui = renderTui(<TreeSelect nodes={nodes} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Apple")).toBe(true);
    tui.keys.left();
    await tui.flush();
    expect(tui.screen.contains("Apple")).toBe(false);
  });

  it("navigates with up/down arrows", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<TreeSelect nodes={nodes} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onChange).toHaveBeenCalledWith("vegetables");
  });

  it("calls onSubmit on enter", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(<TreeSelect nodes={nodes} onSubmit={onSubmit} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith("vegetables");
  });

  it("does not select disabled nodes", () => {
    const disabledNodes = [
      { disabled: true, label: "A", value: "a" },
      { label: "B", value: "b" },
    ];
    const onChange = vi.fn();
    const tui = renderTui(
      <TreeSelect nodes={disabledNodes} onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.enter();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders expanded by default when expandedByDefault is true", () => {
    const tui = renderTui(<TreeSelect nodes={nodes} expandedByDefault />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Apple")).toBe(true);
    expect(tui.screen.contains("Banana")).toBe(true);
  });

  it("shows leaf icon for leaf nodes", () => {
    const tui = renderTui(<TreeSelect nodes={nodes} expandedByDefault />);
    ({ unmount } = tui);
    expect(tui.screen.contains("·")).toBe(true);
  });
});
