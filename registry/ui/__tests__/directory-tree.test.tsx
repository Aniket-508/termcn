import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { DirectoryTree } from "../directory-tree";
import { renderTui } from "./render-tui";

vi.mock("node:fs", () => ({
  readdirSync: vi.fn((dir: string) => {
    if (dir === "/mock") {
      return ["docs", "src", "readme.md"];
    }
    if (dir === "/mock/src") {
      return ["index.ts", "utils.ts"];
    }
    return [];
  }),
  statSync: vi.fn((p: string) => ({
    isDirectory: () => p === "/mock/docs" || p === "/mock/src",
  })),
}));

describe("DirectoryTree", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders root path", () => {
    const tui = renderTui(<DirectoryTree rootPath="/mock" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("/mock")).toBe(true);
  });

  it("renders label", () => {
    const tui = renderTui(<DirectoryTree rootPath="/mock" label="Files" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Files")).toBe(true);
  });

  it("renders directory entries", () => {
    const tui = renderTui(<DirectoryTree rootPath="/mock" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("docs")).toBe(true);
    expect(tui.screen.contains("src")).toBe(true);
    expect(tui.screen.contains("readme.md")).toBe(true);
  });

  it("shows directory icons", () => {
    const tui = renderTui(<DirectoryTree rootPath="/mock" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("▶")).toBe(true);
  });

  it("shows file icons", () => {
    const tui = renderTui(<DirectoryTree rootPath="/mock" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("·")).toBe(true);
  });

  it("renders navigation hint", () => {
    const tui = renderTui(<DirectoryTree rootPath="/mock" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("navigate")).toBe(true);
  });
});
