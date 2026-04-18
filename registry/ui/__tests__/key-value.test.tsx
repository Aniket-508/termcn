import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { KeyValue } from "../key-value";
import { renderTui } from "./render-tui";

describe("KeyValue", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders keys and values", () => {
    const tui = renderTui(
      <KeyValue
        items={[
          { key: "name", value: "Ada" },
          { key: "role", value: "dev" },
        ]}
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("name")).toBe(true);
    expect(tui.screen.contains("Ada")).toBe(true);
    expect(tui.screen.contains("role")).toBe(true);
    expect(tui.screen.contains("dev")).toBe(true);
  });

  it("renders separator", () => {
    const tui = renderTui(
      <KeyValue items={[{ key: "k", value: "v" }]} separator=" => " />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains(" => ")).toBe(true);
  });
});
