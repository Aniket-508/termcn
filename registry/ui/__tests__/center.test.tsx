import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Center } from "../center";
import { renderTui } from "./render-tui";

describe("Center", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <Center>
        <Text>centered-ish</Text>
      </Center>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("centered-ish")).toBe(true);
  });
});
