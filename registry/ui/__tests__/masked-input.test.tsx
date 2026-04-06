import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { MaskedInput } from "../masked-input";
import type { TuiInstance } from "./render-tui";
import { renderTui } from "./render-tui";

const typeChars = async (tui: TuiInstance, text: string) => {
  for (const char of text) {
    tui.keys.press(char);
    await tui.flush();
  }
};

describe("MaskedInput", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders label", () => {
    const tui = renderTui(<MaskedInput mask="###-####" label="Phone" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Phone")).toBe(true);
  });

  it("renders placeholder when empty", () => {
    const tui = renderTui(
      <MaskedInput mask="###-####" placeholder="Enter digits" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Enter digits")).toBe(true);
  });

  it("formats digits through mask", async () => {
    const tui = renderTui(<MaskedInput mask="(###) ###-####" autoFocus />);
    ({ unmount } = tui);
    await tui.flush();
    await typeChars(tui, "123");
    expect(tui.screen.contains("(123")).toBe(true);
  });

  it("calls onChange with raw digits", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <MaskedInput mask="###-####" onChange={onChange} value="" autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.press("5");
    await tui.flush();
    expect(onChange).toHaveBeenCalledWith("5");
  });

  it("handles backspace", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <MaskedInput mask="###-####" onChange={onChange} value="12" autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.backspace();
    await tui.flush();
    expect(onChange).toHaveBeenCalledWith("1");
  });

  it("calls onSubmit on enter", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(
      <MaskedInput
        mask="###-####"
        onSubmit={onSubmit}
        value="1234567"
        autoFocus
      />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onSubmit).toHaveBeenCalledWith("1234567");
  });

  it("ignores non-digit characters", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <MaskedInput mask="###" onChange={onChange} value="" autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.press("a");
    await tui.flush();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not exceed max digits", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <MaskedInput mask="###" onChange={onChange} value="123" autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.press("4");
    await tui.flush();
    expect(onChange).not.toHaveBeenCalled();
  });
});
