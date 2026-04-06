import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { PasswordInput } from "../password-input";
import { renderTui } from "./render-tui";

describe("PasswordInput", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders placeholder when empty", () => {
    const tui = renderTui(<PasswordInput placeholder="Enter password" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Enter password")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<PasswordInput label="Password" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Password")).toBe(true);
  });

  it("masks input with default mask character", () => {
    const tui = renderTui(<PasswordInput value="secret" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("●●●●●●")).toBe(true);
    expect(tui.screen.contains("secret")).toBe(false);
  });

  it("masks input with custom mask character", () => {
    const tui = renderTui(<PasswordInput value="abc" mask="*" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("***")).toBe(true);
  });

  it("calls onChange when typing", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<PasswordInput value="" onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.type("a");
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("calls onChange on backspace", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<PasswordInput value="abc" onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.backspace();
    expect(onChange).toHaveBeenCalledWith("ab");
  });

  it("calls onSubmit on Enter", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(
      <PasswordInput value="pass123" onSubmit={onSubmit} />
    );
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith("pass123");
  });
});
