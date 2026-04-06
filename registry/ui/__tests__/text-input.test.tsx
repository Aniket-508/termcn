import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { TextInput } from "../text-input";
import { renderTui } from "./render-tui";

const validateMinLength = (v: string) => (v.length < 3 ? "Too short" : null);

describe("TextInput", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders placeholder when empty", () => {
    const tui = renderTui(<TextInput placeholder="Enter name" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Enter name")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<TextInput label="Name" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Name")).toBe(true);
  });

  it("renders controlled value", () => {
    const tui = renderTui(<TextInput value="hello" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("hello")).toBe(true);
  });

  it("calls onChange when typing", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<TextInput value="" onChange={onChange} autoFocus />);
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.type("a");
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("calls onSubmit on Enter", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(
      <TextInput value="done" onSubmit={onSubmit} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith("done");
  });

  it("handles backspace via onChange", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <TextInput value="ab" onChange={onChange} autoFocus />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.right();
    await tui.flush();
    tui.keys.right();
    await tui.flush();
    tui.keys.backspace();
    expect(onChange).toHaveBeenCalledWith("a");
  });

  it("masks value when mask prop is set", () => {
    const tui = renderTui(<TextInput value="secret" mask="*" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("******")).toBe(true);
    expect(tui.screen.contains("secret")).toBe(false);
  });

  it("shows validation error on submit", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(
      <TextInput
        value="ab"
        validate={validateMinLength}
        onSubmit={onSubmit}
        autoFocus
      />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onSubmit).not.toHaveBeenCalled();
    expect(tui.screen.contains("Too short")).toBe(true);
  });

  it("submits when validation passes", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(
      <TextInput
        value="abc"
        validate={validateMinLength}
        onSubmit={onSubmit}
        autoFocus
      />
    );
    ({ unmount } = tui);
    await tui.flush();
    tui.keys.enter();
    expect(onSubmit).toHaveBeenCalledWith("abc");
  });
});
