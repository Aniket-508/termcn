import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Table } from "../table";
import { renderTui } from "./render-tui";

describe("Table", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const columns = [
    { header: "Name", key: "name" as const },
    { header: "Age", key: "age" as const },
  ];

  const data = [
    { age: 30, name: "Alice" },
    { age: 25, name: "Bob" },
    { age: 35, name: "Charlie" },
  ];

  it("renders column headers", () => {
    const tui = renderTui(<Table data={data} columns={columns} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Name")).toBe(true);
    expect(tui.screen.contains("Age")).toBe(true);
  });

  it("renders row data", () => {
    const tui = renderTui(<Table data={data} columns={columns} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Alice")).toBe(true);
    expect(tui.screen.contains("Bob")).toBe(true);
    expect(tui.screen.contains("Charlie")).toBe(true);
  });

  it("shows row overflow message when exceeding maxRows", () => {
    const tui = renderTui(<Table data={data} columns={columns} maxRows={2} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("more rows")).toBe(true);
  });

  it("calls onSelect on enter when selectable", () => {
    const onSelect = vi.fn();
    const tui = renderTui(
      <Table data={data} columns={columns} selectable onSelect={onSelect} />
    );
    ({ unmount } = tui);
    tui.keys.enter();
    expect(onSelect).toHaveBeenCalledWith(data[0]);
  });

  it("navigates rows with arrow keys and selects", async () => {
    const onSelect = vi.fn();
    const tui = renderTui(
      <Table data={data} columns={columns} selectable onSelect={onSelect} />
    );
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onSelect).toHaveBeenCalledWith(data[1]);
  });

  it("renders separator between header and data", () => {
    const tui = renderTui(<Table data={data} columns={columns} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("─")).toBe(true);
  });
});
