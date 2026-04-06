import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { BulletList } from "../bullet-list";
import { renderTui } from "./render-tui";

describe("BulletList", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders items with bullet ●", () => {
    const tui = renderTui(
      <BulletList>
        <BulletList.Item label="First" />
      </BulletList>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("●")).toBe(true);
    expect(tui.screen.contains("First")).toBe(true);
  });

  it("renders check items with ■ when done and □ when not", () => {
    const tui = renderTui(
      <BulletList>
        <BulletList.CheckItem label="Done task" done />
        <BulletList.CheckItem label="Todo" done={false} />
      </BulletList>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("■")).toBe(true);
    expect(tui.screen.contains("□")).toBe(true);
    expect(tui.screen.contains("Done task")).toBe(true);
    expect(tui.screen.contains("Todo")).toBe(true);
  });

  it("renders tree items with └", () => {
    const tui = renderTui(
      <BulletList>
        <BulletList.TreeItem label="leaf" />
      </BulletList>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("└")).toBe(true);
    expect(tui.screen.contains("leaf")).toBe(true);
  });
});
