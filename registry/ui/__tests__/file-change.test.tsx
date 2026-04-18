import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { FileChange } from "../file-change";
import { renderTui } from "./render-tui";

describe("FileChange", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const changes = [
    { diff: "-old\n+new", path: "src/app.tsx", type: "modify" as const },
    {
      content: "export const x = 1;",
      path: "src/utils.ts",
      type: "create" as const,
    },
    { path: "src/legacy.ts", type: "delete" as const },
  ];

  it("renders file change count", () => {
    const tui = renderTui(<FileChange changes={changes} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("File Changes (3)")).toBe(true);
  });

  it("renders file paths", () => {
    const tui = renderTui(<FileChange changes={changes} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("src/app.tsx")).toBe(true);
    expect(tui.screen.contains("src/utils.ts")).toBe(true);
    expect(tui.screen.contains("src/legacy.ts")).toBe(true);
  });

  it("renders type indicators", () => {
    const tui = renderTui(<FileChange changes={changes} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("M")).toBe(true);
    expect(tui.screen.contains("A")).toBe(true);
    expect(tui.screen.contains("D")).toBe(true);
  });

  it("renders cursor on active item", () => {
    const tui = renderTui(<FileChange changes={changes} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("›")).toBe(true);
  });

  it("navigates with arrow keys", async () => {
    const tui = renderTui(<FileChange changes={changes} />);
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    const lines = tui.screen.lines();
    const legacyLine = lines.find((l: string) => l.includes("src/legacy.ts"));
    expect(legacyLine).toContain("›");
  });

  it("expands diff on enter", async () => {
    const tui = renderTui(<FileChange changes={changes} />);
    ({ unmount } = tui);
    tui.keys.enter();
    await tui.flush();
    expect(tui.screen.contains("▼")).toBe(true);
  });

  it("collapses on second enter", async () => {
    const tui = renderTui(<FileChange changes={changes} />);
    ({ unmount } = tui);
    tui.keys.enter();
    await tui.flush();
    expect(tui.screen.contains("▼")).toBe(true);
    tui.keys.enter();
    await tui.flush();
    expect(tui.screen.contains("▶")).toBe(true);
  });

  it("accepts a change with y key", async () => {
    const onAccept = vi.fn();
    const tui = renderTui(<FileChange changes={changes} onAccept={onAccept} />);
    ({ unmount } = tui);
    tui.keys.press("y");
    await tui.flush();
    expect(onAccept).toHaveBeenCalledWith("src/app.tsx");
    expect(tui.screen.contains("accepted")).toBe(true);
  });

  it("rejects a change with n key", async () => {
    const onReject = vi.fn();
    const tui = renderTui(<FileChange changes={changes} onReject={onReject} />);
    ({ unmount } = tui);
    tui.keys.press("n");
    await tui.flush();
    expect(onReject).toHaveBeenCalledWith("src/app.tsx");
    expect(tui.screen.contains("rejected")).toBe(true);
  });

  it("calls onAcceptAll with a key", async () => {
    const onAcceptAll = vi.fn();
    const tui = renderTui(
      <FileChange changes={changes} onAcceptAll={onAcceptAll} />
    );
    ({ unmount } = tui);
    tui.keys.press("a");
    await tui.flush();
    expect(onAcceptAll).toHaveBeenCalled();
  });

  it("renders help instructions", () => {
    const tui = renderTui(<FileChange changes={changes} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("navigate")).toBe(true);
    expect(tui.screen.contains("accept")).toBe(true);
    expect(tui.screen.contains("reject")).toBe(true);
  });

  it("expands file with content (create type)", async () => {
    const createOnly = [
      { content: "hello world", path: "new.ts", type: "create" as const },
    ];
    const tui = renderTui(<FileChange changes={createOnly} />);
    ({ unmount } = tui);
    tui.keys.enter();
    await tui.flush();
    expect(tui.screen.contains("hello world")).toBe(true);
  });
});
