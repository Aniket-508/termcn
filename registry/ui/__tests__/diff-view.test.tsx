import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { DiffView } from "../diff-view";
import { renderTui } from "./render-tui";

describe("DiffView", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders filename", () => {
    const tui = renderTui(
      <DiffView oldText="hello" newText="world" filename="test.txt" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("test.txt")).toBe(true);
  });

  it("shows added lines with + prefix", () => {
    const tui = renderTui(<DiffView oldText="" newText="added line" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("+added line")).toBe(true);
  });

  it("shows removed lines with - prefix", () => {
    const tui = renderTui(<DiffView oldText="removed line" newText="" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("-removed line")).toBe(true);
  });

  it("shows no differences when texts are equal", () => {
    const tui = renderTui(<DiffView oldText="same" newText="same" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("No differences")).toBe(true);
  });

  it("renders unified mode by default", () => {
    const tui = renderTui(<DiffView oldText="a\nb" newText="a\nc" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("@@")).toBe(true);
  });

  it("renders split mode", () => {
    const tui = renderTui(
      <DiffView oldText="a\nb" newText="a\nc" mode="split" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("│")).toBe(true);
  });

  it("renders inline mode", () => {
    const tui = renderTui(
      <DiffView oldText="old" newText="new" mode="inline" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("-old")).toBe(true);
    expect(tui.screen.contains("+new")).toBe(true);
  });
});
