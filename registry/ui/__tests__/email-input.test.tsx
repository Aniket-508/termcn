import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { EmailInput } from "../email-input";
import { renderTui } from "./render-tui";

describe("EmailInput", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders placeholder when empty", () => {
    const tui = renderTui(<EmailInput />);
    ({ unmount } = tui);
    expect(tui.screen.contains("you@example.com")).toBe(true);
  });

  it("renders custom placeholder", () => {
    const tui = renderTui(<EmailInput placeholder="email..." />);
    ({ unmount } = tui);
    expect(tui.screen.contains("email...")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<EmailInput label="Email" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Email")).toBe(true);
  });

  it("renders controlled value", () => {
    const tui = renderTui(<EmailInput value="user@test.com" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("user@test.com")).toBe(true);
  });

  it("calls onChange when typing", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <EmailInput value="" onChange={onChange} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.type("a");
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("calls onSubmit with valid email", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(
      <EmailInput value="user@test.com" onSubmit={onSubmit} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith("user@test.com");
  });

  it("shows error for invalid email on submit", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(
      <EmailInput value="invalid" onSubmit={onSubmit} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(tui.screen.contains("valid email")).toBe(true);
  });

  it("completes domain on Tab", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <EmailInput value="user@g" onChange={onChange} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.tab();
    expect(onChange).toHaveBeenCalledWith("user@gmail.com");
  });

  it("handles backspace", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <EmailInput value="abc" onChange={onChange} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.backspace();
    expect(onChange).toHaveBeenCalledWith("ab");
  });
});
