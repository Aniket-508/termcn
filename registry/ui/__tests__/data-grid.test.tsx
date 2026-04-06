import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { DataGrid } from "../data-grid";
import type { TuiInstance } from "./render-tui";
import { renderTui } from "./render-tui";

const typeChars = async (tui: TuiInstance, text: string) => {
  for (const char of text) {
    tui.keys.press(char);
    await tui.flush();
  }
};

describe("DataGrid", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const columns = [
    { header: "Name", key: "name" as const },
    { header: "Age", key: "age" as const },
  ];

  const data = [
    { age: 30, name: "Alice" },
    { age: 25, name: "Bob" },
    { age: 35, name: "Carol" },
  ];

  it("renders column headers", () => {
    const tui = renderTui(<DataGrid data={data} columns={columns} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Name")).toBe(true);
    expect(tui.screen.contains("Age")).toBe(true);
  });

  it("renders data rows", () => {
    const tui = renderTui(<DataGrid data={data} columns={columns} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Alice")).toBe(true);
    expect(tui.screen.contains("Bob")).toBe(true);
    expect(tui.screen.contains("Carol")).toBe(true);
  });

  it("shows no data message when empty", () => {
    const tui = renderTui(<DataGrid data={[]} columns={columns} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("No data")).toBe(true);
  });

  it("navigates rows with arrow keys", async () => {
    const onRowSelect = vi.fn();
    const tui = renderTui(
      <DataGrid data={data} columns={columns} onRowSelect={onRowSelect} />
    );
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onRowSelect).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Bob" })
    );
  });

  it("selects first row on enter by default", async () => {
    const onRowSelect = vi.fn();
    const tui = renderTui(
      <DataGrid data={data} columns={columns} onRowSelect={onRowSelect} />
    );
    ({ unmount } = tui);
    tui.keys.enter();
    await tui.flush();
    expect(onRowSelect).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Alice" })
    );
  });

  it("paginates with n/p keys", async () => {
    const largeData = Array.from({ length: 15 }, (_, i) => ({
      age: 20 + i,
      name: `Person ${i}`,
    }));
    const tui = renderTui(
      <DataGrid data={largeData} columns={columns} pageSize={5} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Page 1/")).toBe(true);
    tui.keys.press("n");
    await tui.flush();
    expect(tui.screen.contains("Page 2/")).toBe(true);
    tui.keys.press("p");
    await tui.flush();
    expect(tui.screen.contains("Page 1/")).toBe(true);
  });

  it("enters filter mode with / key", async () => {
    const tui = renderTui(<DataGrid data={data} columns={columns} />);
    ({ unmount } = tui);
    tui.keys.press("/");
    await tui.flush();
    expect(tui.screen.contains("Filter:")).toBe(true);
  });

  it("filters data in filter mode", async () => {
    const tui = renderTui(<DataGrid data={data} columns={columns} />);
    ({ unmount } = tui);
    tui.keys.press("/");
    await tui.flush();
    await typeChars(tui, "Alice");
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(tui.screen.contains("Alice")).toBe(true);
    expect(tui.screen.contains("1 rows")).toBe(true);
  });

  it("shows row numbers when enabled", () => {
    const tui = renderTui(
      <DataGrid data={data} columns={columns} showRowNumbers />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("1")).toBe(true);
  });

  it("shows page info", () => {
    const tui = renderTui(<DataGrid data={data} columns={columns} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("3 rows")).toBe(true);
  });
});
