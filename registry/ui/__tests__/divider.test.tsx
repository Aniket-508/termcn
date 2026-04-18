import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Divider } from "../divider";
import { renderTui } from "./render-tui";

describe("Divider", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders horizontal divider", () => {
    const tui = renderTui(
      <Divider variant="single" orientation="horizontal" />
    );
    ({ unmount } = tui);
    expect(tui.screen.lines().length).toBeGreaterThan(0);
  });

  it("renders with label", () => {
    const tui = renderTui(<Divider label="Section" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Section")).toBe(true);
  });
});
