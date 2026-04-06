import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Panel } from "../panel";
import { Text } from "../text";
import { renderTui } from "./render-tui";

describe("Panel", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <Panel>
        <Text>Panel body</Text>
      </Panel>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Panel body")).toBe(true);
  });

  it("renders title", () => {
    const tui = renderTui(
      <Panel title="Settings">
        <Text>content</Text>
      </Panel>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Settings")).toBe(true);
  });

  it("renders without border", () => {
    const tui = renderTui(
      <Panel bordered={false} title="No outer">
        <Text>inside</Text>
      </Panel>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("inside")).toBe(true);
    expect(tui.screen.contains("No outer")).toBe(true);
  });
});
