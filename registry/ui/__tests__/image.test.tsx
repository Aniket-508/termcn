import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Image } from "../image";
import { renderTui } from "./render-tui";

vi.mock("node:fs", () => ({
  readFileSync: vi.fn(() => Buffer.from("fakeimage")),
}));

describe("Image", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders ascii fallback box", () => {
    const tui = renderTui(<Image src="/test/photo.png" protocol="ascii" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("┌")).toBe(true);
    expect(tui.screen.contains("┘")).toBe(true);
  });

  it("renders alt text", () => {
    const tui = renderTui(
      <Image src="/test/photo.png" alt="My Photo" protocol="ascii" />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("My Photo")).toBe(true);
  });

  it("renders filename in ascii fallback", () => {
    const tui = renderTui(<Image src="/test/photo.png" protocol="ascii" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("photo.png")).toBe(true);
  });

  it("shows ascii fallback label", () => {
    const tui = renderTui(<Image src="/test/photo.png" protocol="ascii" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("ascii fallback")).toBe(true);
  });

  it("renders extension", () => {
    const tui = renderTui(<Image src="/test/pic.jpg" protocol="ascii" />);
    ({ unmount } = tui);
    expect(tui.screen.contains(".jpg")).toBe(true);
  });
});
