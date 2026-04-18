import { Text } from "ink";
import type * as Ink from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Tabs } from "../tabs";
import { renderTui } from "./render-tui";

vi.mock("ink", async () => {
  const actual = await vi.importActual<typeof Ink>("ink");
  return {
    ...actual,
    useStdout: () => ({
      stdout: {
        columns: 80,
        rows: 24,
        write: vi.fn(),
      },
    }),
  };
});

describe("Tabs", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const tabs = [
    { content: <Text>General Content</Text>, key: "tab1", label: "General" },
    { content: <Text>Advanced Content</Text>, key: "tab2", label: "Advanced" },
    { content: <Text>About Content</Text>, key: "tab3", label: "About" },
  ];

  it("renders tab labels", () => {
    const tui = renderTui(<Tabs tabs={tabs} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("General")).toBe(true);
    expect(tui.screen.contains("Advanced")).toBe(true);
    expect(tui.screen.contains("About")).toBe(true);
  });

  it("renders first tab content by default", () => {
    const tui = renderTui(<Tabs tabs={tabs} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("General Content")).toBe(true);
  });

  it("renders defaultTab content", () => {
    const tui = renderTui(<Tabs tabs={tabs} defaultTab="tab2" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Advanced Content")).toBe(true);
  });

  it("switches tab on right arrow", async () => {
    const tui = renderTui(<Tabs tabs={tabs} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Advanced Content")).toBe(true);
  });

  it("switches tab on left arrow", async () => {
    const tui = renderTui(<Tabs tabs={tabs} defaultTab="tab2" />);
    ({ unmount } = tui);
    tui.keys.left();
    await tui.flush();
    expect(tui.screen.contains("General Content")).toBe(true);
  });

  it("switches tab with tab key", async () => {
    const tui = renderTui(<Tabs tabs={tabs} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    expect(tui.screen.contains("Advanced Content")).toBe(true);
  });

  it("calls onTabChange when controlled", async () => {
    const onTabChange = vi.fn();
    const tui = renderTui(
      <Tabs tabs={tabs} activeTab="tab1" onTabChange={onTabChange} />
    );
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(onTabChange).toHaveBeenCalledWith("tab2");
  });

  it("does not go past last tab", async () => {
    const tui = renderTui(<Tabs tabs={tabs} defaultTab="tab3" />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("About Content")).toBe(true);
  });

  it("does not go before first tab", async () => {
    const tui = renderTui(<Tabs tabs={tabs} />);
    ({ unmount } = tui);
    tui.keys.left();
    await tui.flush();
    expect(tui.screen.contains("General Content")).toBe(true);
  });

  it("renders separator between tabs", () => {
    const tui = renderTui(<Tabs tabs={tabs} separator=" | " />);
    ({ unmount } = tui);
    expect(tui.screen.contains("|")).toBe(true);
  });
});
