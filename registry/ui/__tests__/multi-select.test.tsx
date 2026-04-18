import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { MultiSelect } from "../multi-select";
import { renderTui } from "./render-tui";

const options = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
  { label: "Charlie", value: "c" },
];

describe("MultiSelect", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders all option labels", () => {
    const tui = renderTui(<MultiSelect options={options} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Alpha")).toBe(true);
    expect(tui.screen.contains("Beta")).toBe(true);
    expect(tui.screen.contains("Charlie")).toBe(true);
  });

  it("shows cursor on first option", () => {
    const tui = renderTui(<MultiSelect options={options} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("›")).toBe(true);
  });

  it("renders ○ for unselected options", () => {
    const tui = renderTui(<MultiSelect options={options} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("○")).toBe(true);
  });

  it("renders checkmark for selected options", () => {
    const tui = renderTui(<MultiSelect options={options} value={["a"]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("◉")).toBe(true);
  });

  it("toggles selection with space", () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <MultiSelect options={options} onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith(["a"]);
  });

  it("deselects on second space press", () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <MultiSelect options={options} value={["a"]} onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it("navigates down and toggles", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <MultiSelect options={options} onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith(["b"]);
  });

  it("submits selection on Enter", () => {
    const onSubmit = vi.fn();
    const tui = renderTui(
      <MultiSelect options={options} value={["a", "c"]} onSubmit={onSubmit} />
    );
    ({ unmount } = tui);
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith(["a", "c"]);
  });

  it("skips disabled options when navigating", async () => {
    const opts = [
      { label: "Alpha", value: "a" },
      { disabled: true, label: "Beta", value: "b" },
      { label: "Charlie", value: "c" },
    ];
    const onChange = vi.fn();
    const tui = renderTui(<MultiSelect options={opts} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith(["c"]);
  });

  it("does not toggle disabled option", () => {
    const opts = [{ disabled: true, label: "Alpha", value: "a" }];
    const onChange = vi.fn();
    const tui = renderTui(<MultiSelect options={opts} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.space();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders hint text", () => {
    const opts = [{ hint: "popular", label: "Alpha", value: "a" }];
    const tui = renderTui(<MultiSelect options={opts} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("popular")).toBe(true);
  });
});
