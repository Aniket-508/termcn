import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Toggle } from "../toggle";
import { renderTui } from "./render-tui";

describe("Toggle", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders OFF state by default", () => {
    const tui = renderTui(<Toggle />);
    ({ unmount } = tui);
    expect(tui.screen.contains("○")).toBe(true);
    expect(tui.screen.contains("OFF")).toBe(true);
  });

  it("renders ON state when checked", () => {
    const tui = renderTui(<Toggle checked />);
    ({ unmount } = tui);
    expect(tui.screen.contains("●")).toBe(true);
    expect(tui.screen.contains("ON")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<Toggle label="Dark mode" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Dark mode")).toBe(true);
  });

  it("renders custom on/off labels", () => {
    const tui = renderTui(
      <Toggle checked onLabel="Enabled" offLabel="Disabled" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Enabled")).toBe(true);
  });

  it("toggles on space", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<Toggle checked={false} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("toggles off on space when checked", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<Toggle checked onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.space();
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("does not toggle when disabled", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <Toggle checked={false} onChange={onChange} disabled />
    );
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.space();
    expect(onChange).not.toHaveBeenCalled();
  });
});
