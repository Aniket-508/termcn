import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Text } from "../text";
import { renderTui } from "./render-tui";

describe("Text", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children text", () => {
    const tui = renderTui(
      <Text bold italic underline dim color="green">
        hello world
      </Text>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("hello world")).toBe(true);
  });
});
