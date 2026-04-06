import { Box, Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Spacer } from "../spacer";
import { renderTui } from "./render-tui";

describe("Spacer", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders without crashing", () => {
    const tui = renderTui(
      <Box flexDirection="row">
        <Text>a</Text>
        <Spacer />
        <Text>b</Text>
      </Box>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("a")).toBe(true);
    expect(tui.screen.contains("b")).toBe(true);
  });
});
