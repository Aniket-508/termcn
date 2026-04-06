import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Box } from "../box";
import { renderTui } from "./render-tui";

describe("Box", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <Box>
        <Text>boxed</Text>
      </Box>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("boxed")).toBe(true);
  });

  it("renders with border=true", () => {
    const tui = renderTui(
      <Box border paddingX={1} paddingY={0}>
        <Text>with border</Text>
      </Box>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("with border")).toBe(true);
    expect(tui.screen.text().length).toBeGreaterThan("with border".length);
  });

  it("renders without border", () => {
    const tui = renderTui(
      <Box border={false}>
        <Text>no border</Text>
      </Box>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("no border")).toBe(true);
  });
});
