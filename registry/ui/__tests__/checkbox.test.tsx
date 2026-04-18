import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Checkbox } from "../checkbox";
import { renderTui } from "./render-tui";

describe("Checkbox", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders unchecked icon by default", () => {
    const tui = renderTui(<Checkbox />);
    ({ unmount } = tui);
    expect(tui.screen.contains("□")).toBe(true);
  });

  it("renders checked icon when checked", () => {
    const tui = renderTui(<Checkbox checked />);
    ({ unmount } = tui);
    expect(tui.screen.contains("■")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<Checkbox label="Accept terms" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Accept terms")).toBe(true);
  });

  it("renders indeterminate icon", () => {
    const tui = renderTui(<Checkbox indeterminate />);
    ({ unmount } = tui);
    expect(tui.screen.contains("▪")).toBe(true);
  });

  it("toggles on space when focused", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<Checkbox checked={false} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("unchecks on space when already checked", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<Checkbox checked onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("does not toggle when disabled", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <Checkbox checked={false} onChange={onChange} disabled />
    );
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.space();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders custom icons", () => {
    const tui = renderTui(
      <Checkbox checked checkedIcon="✔" uncheckedIcon="✘" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("✔")).toBe(true);
  });
});
