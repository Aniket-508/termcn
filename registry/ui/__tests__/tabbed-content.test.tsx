import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { TabbedContent } from "../tabbed-content";
import { renderTui } from "./render-tui";

describe("TabbedContent", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const tabs = [
    { content: <Text>Content A</Text>, id: "tab1", label: "First" },
    { content: <Text>Content B</Text>, id: "tab2", label: "Second" },
    { content: <Text>Content C</Text>, id: "tab3", label: "Third" },
  ];

  it("renders tab labels", () => {
    const tui = renderTui(<TabbedContent tabs={tabs} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("First")).toBe(true);
    expect(tui.screen.contains("Second")).toBe(true);
    expect(tui.screen.contains("Third")).toBe(true);
  });

  it("shows first tab content by default", () => {
    const tui = renderTui(<TabbedContent tabs={tabs} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Content A")).toBe(true);
  });

  it("switches tab on right arrow", async () => {
    const tui = renderTui(<TabbedContent tabs={tabs} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Content B")).toBe(true);
  });

  it("switches tab on left arrow", async () => {
    const tui = renderTui(<TabbedContent tabs={tabs} defaultTab="tab2" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Content B")).toBe(true);
    tui.keys.left();
    await tui.flush();
    expect(tui.screen.contains("Content A")).toBe(true);
  });

  it("calls onChange when switching tabs", () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <TabbedContent tabs={tabs} activeTab="tab1" onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.right();
    expect(onChange).toHaveBeenCalledWith("tab2");
  });

  it("skips disabled tabs", async () => {
    const disabledTabs = [
      { content: <Text>Content A</Text>, id: "tab1", label: "First" },
      {
        content: <Text>Content B</Text>,
        disabled: true,
        id: "tab2",
        label: "Second",
      },
      { content: <Text>Content C</Text>, id: "tab3", label: "Third" },
    ];
    const tui = renderTui(<TabbedContent tabs={disabledTabs} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Content C")).toBe(true);
  });

  it("renders tab switch hint", () => {
    const tui = renderTui(<TabbedContent tabs={tabs} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("←→ or Tab to switch tabs")).toBe(true);
  });

  it("uses controlled activeTab", () => {
    const tui = renderTui(<TabbedContent tabs={tabs} activeTab="tab3" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Content C")).toBe(true);
  });
});
