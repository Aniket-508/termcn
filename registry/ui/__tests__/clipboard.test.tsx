import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Clipboard } from "../clipboard";
import { renderTui } from "./render-tui";

vi.mock("@/hooks/use-clipboard", () => ({
  useClipboard: () => ({ write: vi.fn() }),
}));

describe("Clipboard", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders value", () => {
    const tui = renderTui(<Clipboard value="abc123" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("abc123")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<Clipboard value="x" label="Token" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Token")).toBe(true);
  });

  it("renders Copy button", () => {
    const tui = renderTui(<Clipboard value="x" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Copy")).toBe(true);
  });

  it("renders copy hint", () => {
    const tui = renderTui(<Clipboard value="x" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("press c or space to copy")).toBe(true);
  });

  it("shows success message after pressing c", async () => {
    const tui = renderTui(<Clipboard value="x" successMessage="Done!" />);
    ({ unmount } = tui);
    tui.keys.press("c");
    await tui.flush();
    expect(tui.screen.contains("Done!")).toBe(true);
  });
});
