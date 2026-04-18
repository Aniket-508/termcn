import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Breadcrumb } from "../breadcrumb";
import { renderTui } from "./render-tui";

describe("Breadcrumb", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const items = [
    { key: "home", label: "Home" },
    { key: "docs", label: "Docs" },
    { key: "api", label: "API" },
  ];

  it("renders all breadcrumb labels", () => {
    const tui = renderTui(<Breadcrumb items={items} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Home")).toBe(true);
    expect(tui.screen.contains("Docs")).toBe(true);
    expect(tui.screen.contains("API")).toBe(true);
  });

  it("renders default separator", () => {
    const tui = renderTui(<Breadcrumb items={items} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("›")).toBe(true);
  });

  it("renders custom separator", () => {
    const tui = renderTui(<Breadcrumb items={items} separator="/" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("/")).toBe(true);
  });

  it("defaults active to last item", () => {
    const tui = renderTui(<Breadcrumb items={items} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("API")).toBe(true);
  });

  it("supports activeKey prop", () => {
    const tui = renderTui(<Breadcrumb items={items} activeKey="docs" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Docs")).toBe(true);
  });

  it("calls onSelect on left arrow navigating to previous item", () => {
    const onSelect = vi.fn();
    const itemsWithSelect = [
      { key: "home", label: "Home", onSelect },
      { key: "docs", label: "Docs" },
    ];
    const tui = renderTui(
      <Breadcrumb items={itemsWithSelect} activeKey="docs" />
    );
    ({ unmount } = tui);
    tui.keys.left();
    expect(onSelect).toHaveBeenCalled();
  });
});
