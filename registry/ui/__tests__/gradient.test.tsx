import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Gradient } from "../gradient";
import { renderTui } from "./render-tui";

describe("Gradient", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders text characters", () => {
    const tui = renderTui(
      <Gradient colors={["#ff0000", "#00ff00"]}>Hi</Gradient>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("H")).toBe(true);
    expect(tui.screen.contains("i")).toBe(true);
  });

  it("renders with preset name", () => {
    const tui = renderTui(<Gradient name="rainbow">preset</Gradient>);
    ({ unmount } = tui);
    expect(tui.screen.contains("preset")).toBe(true);
  });
});
