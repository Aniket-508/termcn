import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { VirtualList } from "../virtual-list";
import { renderTui } from "./render-tui";

describe("VirtualList", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const items = Array.from({ length: 20 }, (_, i) => `Item ${i}`);

  it("renders visible items within height", () => {
    const tui = renderTui(
      <VirtualList
        items={items}
        height={5}
        renderItem={(item) => <Text>{item}</Text>}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Item 0")).toBe(true);
    expect(tui.screen.contains("Item 4")).toBe(true);
  });

  it("renders active state for first item", () => {
    const tui = renderTui(
      <VirtualList
        items={items}
        height={5}
        renderItem={(item, _idx, isActive) => (
          <Text>{isActive ? `> ${item}` : item}</Text>
        )}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("> Item 0")).toBe(true);
  });

  it("navigates down with arrow keys", async () => {
    const tui = renderTui(
      <VirtualList
        items={items}
        height={5}
        renderItem={(item, _idx, isActive) => (
          <Text>{isActive ? `> ${item}` : item}</Text>
        )}
      />
    );
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    expect(tui.screen.contains("> Item 1")).toBe(true);
  });

  it("navigates up with arrow keys", async () => {
    const tui = renderTui(
      <VirtualList
        items={items}
        height={5}
        renderItem={(item, _idx, isActive) => (
          <Text>{isActive ? `> ${item}` : item}</Text>
        )}
      />
    );
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.up();
    await tui.flush();
    expect(tui.screen.contains("> Item 1")).toBe(true);
  });

  it("calls onSelect on enter", async () => {
    const onSelect = vi.fn();
    const tui = renderTui(
      <VirtualList
        items={items}
        height={5}
        renderItem={(item) => <Text>{item}</Text>}
        onSelect={onSelect}
      />
    );
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onSelect).toHaveBeenCalledWith("Item 1", 1);
  });

  it("shows scrollbar when items exceed height", () => {
    const tui = renderTui(
      <VirtualList
        items={items}
        height={5}
        renderItem={(item) => <Text>{item}</Text>}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
  });

  it("does not show scrollbar when items fit in height", () => {
    const shortItems = ["A", "B"];
    const tui = renderTui(
      <VirtualList
        items={shortItems}
        height={5}
        renderItem={(item) => <Text>{item}</Text>}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(false);
  });
});
