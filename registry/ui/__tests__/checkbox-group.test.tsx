import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { CheckboxGroup } from "../checkbox-group";
import { renderTui } from "./render-tui";

describe("CheckboxGroup", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const options = [
    { label: "Alpha", value: "a" },
    { label: "Beta", value: "b" },
    { label: "Gamma", value: "c" },
  ];

  it("renders all option labels", () => {
    const tui = renderTui(<CheckboxGroup options={options} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Alpha")).toBe(true);
    expect(tui.screen.contains("Beta")).toBe(true);
    expect(tui.screen.contains("Gamma")).toBe(true);
  });

  it("renders label when provided", () => {
    const tui = renderTui(
      <CheckboxGroup options={options} label="Pick items" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Pick items")).toBe(true);
  });

  it("shows cursor indicator on first item", () => {
    const tui = renderTui(<CheckboxGroup options={options} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("›")).toBe(true);
  });

  it("toggles selection with space", () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <CheckboxGroup options={options} onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith(["a"]);
  });

  it("navigates down and selects second option", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <CheckboxGroup options={options} onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith(["b"]);
  });

  it("skips disabled options when navigating", async () => {
    const opts = [
      { label: "Alpha", value: "a" },
      { disabled: true, label: "Beta", value: "b" },
      { label: "Gamma", value: "c" },
    ];
    const onChange = vi.fn();
    const tui = renderTui(<CheckboxGroup options={opts} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith(["c"]);
  });

  it("shows error when selecting fewer than min", async () => {
    const tui = renderTui(
      <CheckboxGroup options={options} value={["a"]} min={2} />
    );
    ({ unmount } = tui);
    tui.keys.space();
    await tui.flush();
    expect(tui.screen.contains("Select at least 2 options.")).toBe(true);
  });

  it("prevents exceeding max selections", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <CheckboxGroup
        options={options}
        value={["a"]}
        max={1}
        onChange={onChange}
      />
    );
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.space();
    expect(onChange).not.toHaveBeenCalled();
  });
});
