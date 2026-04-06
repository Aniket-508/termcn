import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { ThinkingBlock } from "../thinking-block";
import { renderTui } from "./render-tui";

describe("ThinkingBlock", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders label in header", () => {
    const tui = renderTui(
      <ThinkingBlock content="thinking..." label="Reasoning" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Reasoning")).toBe(true);
  });

  it("renders collapsed by default", () => {
    const tui = renderTui(<ThinkingBlock content="hidden content" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("▶")).toBe(true);
    expect(tui.screen.contains("hidden content")).toBe(false);
  });

  it("expands on enter to show content", async () => {
    const tui = renderTui(<ThinkingBlock content="revealed content" />);
    ({ unmount } = tui);
    tui.keys.enter();
    await tui.flush();
    expect(tui.screen.contains("▼")).toBe(true);
    expect(tui.screen.contains("revealed content")).toBe(true);
  });

  it("toggles collapse on space", async () => {
    const tui = renderTui(<ThinkingBlock content="toggle me" />);
    ({ unmount } = tui);
    tui.keys.space();
    await tui.flush();
    expect(tui.screen.contains("toggle me")).toBe(true);
    tui.keys.space();
    await tui.flush();
    expect(tui.screen.contains("toggle me")).toBe(false);
  });

  it("shows Thinking... when streaming", () => {
    const tui = renderTui(<ThinkingBlock content="" streaming />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Thinking...")).toBe(true);
  });

  it("renders token count", () => {
    const tui = renderTui(<ThinkingBlock content="text" tokenCount={1500} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("1,500 tokens")).toBe(true);
  });

  it("renders duration", () => {
    const tui = renderTui(<ThinkingBlock content="text" duration={3200} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("3.2s")).toBe(true);
  });

  it("starts expanded when defaultCollapsed is false", () => {
    const tui = renderTui(
      <ThinkingBlock content="visible" defaultCollapsed={false} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("visible")).toBe(true);
    expect(tui.screen.contains("▼")).toBe(true);
  });
});
