import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { AspectRatio } from "../aspect-ratio";
import { renderTui } from "./render-tui";

describe("AspectRatio", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <AspectRatio>
        <Text>child</Text>
      </AspectRatio>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("child")).toBe(true);
  });

  it("renders without crashing", () => {
    const tui = renderTui(
      <AspectRatio ratio={4 / 3} width={40}>
        <Text>ok</Text>
      </AspectRatio>
    );
    ({ unmount } = tui);
    expect(tui.screen.text().length).toBeGreaterThan(0);
  });
});
