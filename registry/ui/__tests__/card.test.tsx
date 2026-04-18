import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Card } from "../card";
import { renderTui } from "./render-tui";

describe("Card", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <Card>
        <Text>main</Text>
      </Card>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("main")).toBe(true);
  });

  it("renders title", () => {
    const tui = renderTui(
      <Card title="Card title">
        <Text>x</Text>
      </Card>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Card title")).toBe(true);
  });

  it("renders subtitle", () => {
    const tui = renderTui(
      <Card title="T" subtitle="Sub here">
        <Text>x</Text>
      </Card>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Sub here")).toBe(true);
  });

  it("renders footer", () => {
    const tui = renderTui(
      <Card footer={<Text>foot</Text>}>
        <Text>body</Text>
      </Card>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("foot")).toBe(true);
  });
});
