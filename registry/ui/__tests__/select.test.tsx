import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Select } from "../select";
import { renderTui } from "./render-tui";

const options = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
  { label: "Charlie", value: "c" },
];

describe("Select", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders all option labels", () => {
    const tui = renderTui(<Select options={options} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Alpha")).toBe(true);
    expect(tui.screen.contains("Beta")).toBe(true);
    expect(tui.screen.contains("Charlie")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<Select options={options} label="Pick one" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Pick one")).toBe(true);
  });

  it("shows cursor on first option", () => {
    const tui = renderTui(<Select options={options} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("›")).toBe(true);
  });

  it("navigates down with arrow key", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<Select options={options} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("navigates up with arrow key", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<Select options={options} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.up();
    await tui.flush();
    tui.keys.enter();
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("calls onSubmit on Enter", () => {
    const onSubmit = vi.fn();
    const tui = renderTui(<Select options={options} onSubmit={onSubmit} />);
    ({ unmount } = tui);
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith("a");
  });

  it("skips disabled options when navigating down", async () => {
    const opts = [
      { label: "Alpha", value: "a" },
      { disabled: true, label: "Beta", value: "b" },
      { label: "Charlie", value: "c" },
    ];
    const onSubmit = vi.fn();
    const tui = renderTui(<Select options={opts} onSubmit={onSubmit} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith("c");
  });

  it("skips disabled options when navigating up", async () => {
    const opts = [
      { label: "Alpha", value: "a" },
      { disabled: true, label: "Beta", value: "b" },
      { label: "Charlie", value: "c" },
    ];
    const onSubmit = vi.fn();
    const tui = renderTui(<Select options={opts} onSubmit={onSubmit} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.up();
    await tui.flush();
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith("a");
  });

  it("does not go past first option", () => {
    const onSubmit = vi.fn();
    const tui = renderTui(<Select options={options} onSubmit={onSubmit} />);
    ({ unmount } = tui);
    tui.keys.up();
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith("a");
  });

  it("does not go past last option", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(<Select options={options} onSubmit={onSubmit} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith("c");
  });

  it("renders hint text", () => {
    const opts = [{ hint: "first letter", label: "Alpha", value: "a" }];
    const tui = renderTui(<Select options={opts} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("first letter")).toBe(true);
  });
});
