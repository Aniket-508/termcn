import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Columns } from "../columns";
import { renderTui } from "./render-tui";

describe("Columns", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <Columns gap={1} align="center">
        <Text>left col</Text>
        <Text>right col</Text>
      </Columns>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("left col")).toBe(true);
    expect(tui.screen.contains("right col")).toBe(true);
  });
});
