import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Heading } from "../heading";
import { renderTui } from "./render-tui";

describe("Heading", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders level 1 with uppercase", () => {
    const tui = renderTui(<Heading level={1}>section</Heading>);
    ({ unmount } = tui);
    expect(tui.screen.contains("██")).toBe(true);
    expect(tui.screen.contains("SECTION")).toBe(true);
  });

  it("renders level 2", () => {
    const tui = renderTui(<Heading level={2}>Two</Heading>);
    ({ unmount } = tui);
    expect(tui.screen.contains("▌")).toBe(true);
    expect(tui.screen.contains("Two")).toBe(true);
  });

  it("renders level 3", () => {
    const tui = renderTui(<Heading level={3}>Three</Heading>);
    ({ unmount } = tui);
    expect(tui.screen.contains("›")).toBe(true);
    expect(tui.screen.contains("Three")).toBe(true);
  });

  it("renders level 4", () => {
    const tui = renderTui(<Heading level={4}>Small</Heading>);
    ({ unmount } = tui);
    expect(tui.screen.contains("Small")).toBe(true);
  });
});
