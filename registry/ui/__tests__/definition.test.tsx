import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Definition } from "../definition";
import { renderTui } from "./render-tui";

describe("Definition", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders terms and descriptions", () => {
    const tui = renderTui(
      <Definition
        items={[
          { description: "Application Programming Interface", term: "API" },
          { description: "Command Line Interface", term: "CLI" },
        ]}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("API")).toBe(true);
    expect(tui.screen.contains("Application Programming Interface")).toBe(true);
    expect(tui.screen.contains("CLI")).toBe(true);
    expect(tui.screen.contains("Command Line Interface")).toBe(true);
  });
});
