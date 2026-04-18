import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { NumberInput } from "../number-input";
import { renderTui } from "./render-tui";

describe("NumberInput", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders placeholder when empty", () => {
    const tui = renderTui(<NumberInput placeholder="Enter number" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Enter number")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<NumberInput label="Quantity" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Quantity")).toBe(true);
  });

  it("renders controlled value", () => {
    const tui = renderTui(<NumberInput value={42} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("42")).toBe(true);
  });

  it("increments on up arrow", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<NumberInput value={10} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.up();
    expect(onChange).toHaveBeenCalledWith(11);
  });

  it("decrements on down arrow", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<NumberInput value={10} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.down();
    expect(onChange).toHaveBeenCalledWith(9);
  });

  it("respects step value", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <NumberInput value={10} onChange={onChange} step={5} />
    );
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.up();
    expect(onChange).toHaveBeenCalledWith(15);
  });

  it("clamps to max", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <NumberInput value={100} onChange={onChange} max={100} />
    );
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.up();
    expect(onChange).toHaveBeenCalledWith(100);
  });

  it("clamps to min", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <NumberInput value={0} onChange={onChange} min={0} />
    );
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.down();
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it("calls onSubmit on Enter", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(<NumberInput value={42} onSubmit={onSubmit} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith(42);
  });

  it("shows step hint when focused", async () => {
    const tui = renderTui(<NumberInput value={0} step={5} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    expect(tui.screen.contains("↑ +5")).toBe(true);
    expect(tui.screen.contains("↓ -5")).toBe(true);
  });
});
