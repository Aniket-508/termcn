import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { ContextMeter, TokenUsage } from "../token-usage";
import { renderTui } from "./render-tui";

describe("TokenUsage", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it('renders prompt/completion tokens with "in" and "out"', () => {
    const tui = renderTui(<TokenUsage prompt={800} completion={200} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("in")).toBe(true);
    expect(tui.screen.contains("out")).toBe(true);
    expect(tui.screen.contains("800")).toBe(true);
    expect(tui.screen.contains("200")).toBe(true);
  });

  it("renders model name", () => {
    const tui = renderTui(
      <TokenUsage prompt={100} completion={50} model="gpt-4o-mini" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("gpt-4o-mini")).toBe(true);
  });
});

describe("ContextMeter", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders ContextMeter with bar", () => {
    const tui = renderTui(
      <ContextMeter used={5} limit={10} label="ctx" width={10} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("ctx")).toBe(true);
    expect(tui.screen.contains("█")).toBe(true);
    expect(tui.screen.contains("░")).toBe(true);
    expect(tui.screen.contains("50%")).toBe(true);
  });
});
