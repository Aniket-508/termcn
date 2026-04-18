import React from "react";
import { describe, it, expect, afterEach, vi } from "vitest";

import { Link } from "../link";
import { renderTui } from "./render-tui";

describe("Link", () => {
  let unmount: () => void;
  afterEach(() => {
    unmount?.();
    vi.unstubAllEnvs();
  });

  it("renders children text", () => {
    vi.stubEnv("TERM", "dumb");
    vi.stubEnv("TERM_PROGRAM", "");
    const tui = renderTui(
      <Link href="https://example.com/docs">Documentation</Link>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Documentation")).toBe(true);
  });

  it("renders href in fallback mode", () => {
    vi.stubEnv("TERM", "dumb");
    vi.stubEnv("TERM_PROGRAM", "");
    const tui = renderTui(<Link href="https://example.com/page">Open</Link>);
    ({ unmount } = tui);
    expect(tui.screen.contains("https://example.com/page")).toBe(true);
  });
});
