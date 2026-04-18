import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { FilePicker } from "../file-picker";
import { renderTui } from "./render-tui";

vi.mock("node:fs", () => ({
  readdirSync: vi.fn(() => ["folder", "file.txt", "data.json"]),
  statSync: vi.fn((p: string) => ({
    isDirectory: () => p.endsWith("folder"),
  })),
}));

describe("FilePicker", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders label", () => {
    const tui = renderTui(
      <FilePicker label="Choose file" startDir="/test" autoFocus />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Choose file")).toBe(true);
  });

  it("renders current directory", () => {
    const tui = renderTui(<FilePicker startDir="/test" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("/test")).toBe(true);
  });

  it("renders file entries", () => {
    const tui = renderTui(<FilePicker startDir="/test" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("file.txt")).toBe(true);
  });

  it("renders parent directory entry", () => {
    const tui = renderTui(<FilePicker startDir="/test" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("..")).toBe(true);
  });

  it("renders directory icon", () => {
    const tui = renderTui(<FilePicker startDir="/test" autoFocus />);
    ({ unmount } = tui);
    expect(tui.screen.contains("▶")).toBe(true);
  });
});
