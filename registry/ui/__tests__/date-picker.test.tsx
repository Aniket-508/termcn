import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { DatePicker } from "../date-picker";
import { renderTui } from "./render-tui";

describe("DatePicker", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders label", () => {
    const tui = renderTui(<DatePicker label="Start Date" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Start Date")).toBe(true);
  });

  it("renders month/day/year fields", () => {
    const date = new Date(2025, 0, 15);
    const tui = renderTui(<DatePicker value={date} autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Jan")).toBe(true);
    expect(tui.screen.contains("15")).toBe(true);
    expect(tui.screen.contains("2025")).toBe(true);
  });

  it("renders navigation hint when focused", async () => {
    const tui = renderTui(<DatePicker autoFocus />);
    ({ unmount } = tui);
    await tui.flush();
    expect(tui.screen.contains("Tab: next field")).toBe(true);
  });

  it("increments month with up arrow", async () => {
    const onChange = vi.fn();
    const date = new Date(2025, 0, 15);
    const tui = renderTui(
      <DatePicker value={date} onChange={onChange} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.up();
    await tui.flush();
    expect(onChange).toHaveBeenCalled();
    const calledDate = onChange.mock.calls[0][0] as Date;
    expect(calledDate.getMonth()).toBe(1);
  });

  it("decrements month with down arrow", async () => {
    const onChange = vi.fn();
    const date = new Date(2025, 3, 10);
    const tui = renderTui(
      <DatePicker value={date} onChange={onChange} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    const calledDate = onChange.mock.calls[0][0] as Date;
    expect(calledDate.getMonth()).toBe(2);
  });

  it("switches field with tab", async () => {
    const onChange = vi.fn();
    const date = new Date(2025, 0, 15);
    const tui = renderTui(
      <DatePicker value={date} onChange={onChange} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.tab();
    await tui.flush();
    tui.keys.up();
    await tui.flush();
    const calledDate = onChange.mock.calls[0][0] as Date;
    expect(calledDate.getDate()).toBe(16);
  });

  it("wraps month from January down to December", async () => {
    const onChange = vi.fn();
    const date = new Date(2025, 0, 15);
    const tui = renderTui(
      <DatePicker value={date} onChange={onChange} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    const calledDate = onChange.mock.calls[0][0] as Date;
    expect(calledDate.getMonth()).toBe(11);
  });

  it("calls onSubmit on enter", async () => {
    const onSubmit = vi.fn();
    const date = new Date(2025, 5, 20);
    const tui = renderTui(
      <DatePicker value={date} onSubmit={onSubmit} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onSubmit).toHaveBeenCalled();
  });

  it("changes year when year field is active", async () => {
    const onChange = vi.fn();
    const date = new Date(2025, 0, 1);
    const tui = renderTui(
      <DatePicker value={date} onChange={onChange} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.tab();
    await tui.flush();
    tui.keys.tab();
    await tui.flush();
    tui.keys.up();
    await tui.flush();
    const calledDate = onChange.mock.calls[0][0] as Date;
    expect(calledDate.getFullYear()).toBe(2026);
  });
});
