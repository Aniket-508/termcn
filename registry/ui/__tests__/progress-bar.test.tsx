import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { ProgressBar } from "../progress-bar";
import { renderTui } from "./render-tui";

describe("ProgressBar", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders bar characters", () => {
    const tui = renderTui(
      <ProgressBar value={5} total={10} width={10} showPercent={false} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
    expect(tui.screen.contains("░")).toBe(true);
  });

  it("renders percentage", () => {
    const tui = renderTui(
      <ProgressBar value={25} total={100} width={10} label="" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("25%")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(
      <ProgressBar
        value={1}
        total={1}
        width={5}
        showPercent={false}
        label="Uploading"
      />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Uploading")).toBe(true);
  });

  it("renders value/total", () => {
    const tui = renderTui(
      <ProgressBar value={3} total={10} width={8} showPercent={false} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("3/10")).toBe(true);
  });
});
