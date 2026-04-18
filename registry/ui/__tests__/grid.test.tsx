import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Grid } from "../grid";
import { renderTui } from "./render-tui";

describe("Grid", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <Grid columns={2} gap={1}>
        <Text>a</Text>
        <Text>b</Text>
        <Text>c</Text>
      </Grid>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("a")).toBe(true);
    expect(tui.screen.contains("b")).toBe(true);
    expect(tui.screen.contains("c")).toBe(true);
  });
});
