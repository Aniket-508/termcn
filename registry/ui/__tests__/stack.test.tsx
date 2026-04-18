import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Stack } from "../stack";
import { renderTui } from "./render-tui";

describe("Stack", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <Stack direction="vertical" gap={0}>
        <Text>one</Text>
        <Text>two</Text>
      </Stack>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("one")).toBe(true);
    expect(tui.screen.contains("two")).toBe(true);
  });
});
