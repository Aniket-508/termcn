import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Digits } from "../digits";
import { renderTui } from "./render-tui";

describe("Digits", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders sm size as plain text", () => {
    const tui = renderTui(<Digits value="42" size="sm" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("42")).toBe(true);
  });

  it("renders md size with box drawing characters", () => {
    const tui = renderTui(<Digits value="0" size="md" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("╭")).toBe(true);
    expect(tui.screen.contains("╰")).toBe(true);
  });

  it("renders lg size with wider segments", () => {
    const tui = renderTui(<Digits value="8" size="lg" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("╭───╮")).toBe(true);
  });

  it("renders numeric value", () => {
    const tui = renderTui(<Digits value={123} size="sm" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("123")).toBe(true);
  });

  it("renders colon character", () => {
    const tui = renderTui(<Digits value="1:2" size="md" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("●")).toBe(true);
  });

  it("renders multiple digits in a row", () => {
    const tui = renderTui(<Digits value="99" size="md" />);
    ({ unmount } = tui);
    const lines = tui.screen.lines();
    expect(lines.length).toBeGreaterThanOrEqual(5);
  });
});
