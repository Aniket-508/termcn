import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { JSONView } from "../json";
import { renderTui } from "./render-tui";

describe("JSONView", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders primitive string value", () => {
    const tui = renderTui(<JSONView data="hello" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("hello")).toBe(true);
  });

  it("renders number value", () => {
    const tui = renderTui(<JSONView data={42} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("42")).toBe(true);
  });

  it("renders null value", () => {
    const tui = renderTui(<JSONView data={null} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("null")).toBe(true);
  });

  it("renders boolean value", () => {
    const tui = renderTui(<JSONView data={true} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("true")).toBe(true);
  });

  it("renders object keys", () => {
    const tui = renderTui(<JSONView data={{ age: 30, name: "Alice" }} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("name")).toBe(true);
    expect(tui.screen.contains("Alice")).toBe(true);
    expect(tui.screen.contains("age")).toBe(true);
    expect(tui.screen.contains("30")).toBe(true);
  });

  it("renders object with braces", () => {
    const tui = renderTui(<JSONView data={{ x: 1 }} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("{")).toBe(true);
    expect(tui.screen.contains("}")).toBe(true);
  });

  it("renders array with brackets", () => {
    const tui = renderTui(<JSONView data={[1, 2, 3]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[")).toBe(true);
    expect(tui.screen.contains("]")).toBe(true);
  });

  it("renders label when provided", () => {
    const tui = renderTui(<JSONView data={{ a: 1 }} label="Config" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Config")).toBe(true);
  });

  it("collapses object when collapsed is true", () => {
    const tui = renderTui(
      <JSONView data={{ name: "Alice", nested: { deep: true } }} collapsed />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("...")).toBe(true);
  });

  it("toggles collapse on space for nested object", async () => {
    const tui = renderTui(<JSONView data={{ outer: { name: "Alice" } }} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Alice")).toBe(true);
    tui.keys.down();
    await tui.flush();
    tui.keys.space();
    await tui.flush();
    expect(tui.screen.contains("...")).toBe(true);
  });

  it("navigates with arrow keys", async () => {
    const tui = renderTui(<JSONView data={{ a: 1, b: 2 }} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    expect(tui.screen.contains("b")).toBe(true);
  });
});
