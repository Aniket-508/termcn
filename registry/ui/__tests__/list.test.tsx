import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { List } from "../list";
import { renderTui } from "./render-tui";

const items = [
  { key: "1", label: "Apple" },
  { key: "2", label: "Banana" },
  { key: "3", label: "Cherry" },
];

describe("List", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders all item labels", () => {
    const tui = renderTui(<List items={items} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Apple")).toBe(true);
    expect(tui.screen.contains("Banana")).toBe(true);
    expect(tui.screen.contains("Cherry")).toBe(true);
  });

  it("shows cursor on first item", () => {
    const tui = renderTui(<List items={items} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("›")).toBe(true);
  });

  it("selects item on Enter", () => {
    const onSelect = vi.fn();
    const tui = renderTui(<List items={items} onSelect={onSelect} />);
    ({ unmount } = tui);
    tui.keys.enter();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "1", label: "Apple" })
    );
  });

  it("navigates down and selects", async () => {
    const onSelect = vi.fn();
    const tui = renderTui(<List items={items} onSelect={onSelect} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "2", label: "Banana" })
    );
  });

  it("navigates up", async () => {
    const onSelect = vi.fn();
    const tui = renderTui(<List items={items} onSelect={onSelect} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.up();
    await tui.flush();
    tui.keys.enter();
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ key: "2", label: "Banana" })
    );
  });

  it("renders description", () => {
    const withDesc = [{ description: "A fruit", key: "1", label: "Apple" }];
    const tui = renderTui(<List items={withDesc} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("A fruit")).toBe(true);
  });

  it("filters items when filterable", async () => {
    const tui = renderTui(<List items={items} filterable />);
    ({ unmount } = tui);
    tui.keys.type("ban");
    await tui.flush();
    expect(tui.screen.contains("Banana")).toBe(true);
    expect(tui.screen.contains("Apple")).toBe(false);
    expect(tui.screen.contains("Cherry")).toBe(false);
  });

  it("shows filter input when filterable", () => {
    const tui = renderTui(<List items={items} filterable />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Type to filter…")).toBe(true);
  });

  it("clears filter with backspace", async () => {
    const tui = renderTui(<List items={items} filterable />);
    ({ unmount } = tui);
    tui.keys.type("ch");
    await tui.flush();
    expect(tui.screen.contains("Cherry")).toBe(true);
    expect(tui.screen.contains("Apple")).toBe(false);
    tui.keys.raw("\u0008");
    await tui.flush();
    tui.keys.raw("\u0008");
    await tui.flush();
    expect(tui.screen.contains("Apple")).toBe(true);
    expect(tui.screen.contains("Cherry")).toBe(true);
  });

  it("shows overflow indicator", () => {
    const manyItems = Array.from({ length: 15 }, (_, i) => ({
      key: String(i),
      label: `Item ${i}`,
    }));
    const tui = renderTui(<List items={manyItems} height={5} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("more…")).toBe(true);
  });
});
