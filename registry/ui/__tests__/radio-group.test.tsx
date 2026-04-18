import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { RadioGroup } from "../radio-group";
import { renderTui } from "./render-tui";

const options = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
  { label: "Charlie", value: "c" },
];

describe("RadioGroup", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders all option labels", () => {
    const tui = renderTui(<RadioGroup options={options} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Alpha")).toBe(true);
    expect(tui.screen.contains("Beta")).toBe(true);
    expect(tui.screen.contains("Charlie")).toBe(true);
  });

  it("shows cursor on first option", () => {
    const tui = renderTui(<RadioGroup options={options} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("›")).toBe(true);
  });

  it("renders ○ for unselected options", () => {
    const tui = renderTui(<RadioGroup options={options} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("○")).toBe(true);
  });

  it("renders ◉ for selected option", () => {
    const tui = renderTui(<RadioGroup options={options} value="a" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("◉")).toBe(true);
  });

  it("selects option with space", () => {
    const onChange = vi.fn();
    const tui = renderTui(<RadioGroup options={options} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("selects option with Enter", () => {
    const onChange = vi.fn();
    const tui = renderTui(<RadioGroup options={options} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.enter();
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("navigates down and selects", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<RadioGroup options={options} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("navigates up and selects", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<RadioGroup options={options} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.up();
    await tui.flush();
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith("b");
  });

  it("skips disabled options when navigating", async () => {
    const opts = [
      { label: "Alpha", value: "a" },
      { disabled: true, label: "Beta", value: "b" },
      { label: "Charlie", value: "c" },
    ];
    const onChange = vi.fn();
    const tui = renderTui(<RadioGroup options={opts} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith("c");
  });

  it("does not select disabled option", () => {
    const opts = [{ disabled: true, label: "Alpha", value: "a" }];
    const onChange = vi.fn();
    const tui = renderTui(<RadioGroup options={opts} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.space();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders hint text", () => {
    const opts = [{ hint: "recommended", label: "Alpha", value: "a" }];
    const tui = renderTui(<RadioGroup options={opts} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("recommended")).toBe(true);
  });
});
