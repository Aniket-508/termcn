import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { QRCode } from "../qr-code";
import { renderTui } from "./render-tui";

describe("QRCode", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders non-empty output", () => {
    const tui = renderTui(<QRCode value="HI" />);
    ({ unmount } = tui);
    expect(tui.screen.text().length).toBeGreaterThan(0);
  });

  it("renders label", () => {
    const tui = renderTui(<QRCode value="HI" label="Scan me" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Scan me")).toBe(true);
  });

  it("renders in small size", () => {
    const tui = renderTui(<QRCode value="HI" size="sm" />);
    ({ unmount } = tui);
    expect(tui.screen.text().length).toBeGreaterThan(0);
  });

  it("renders in large size", () => {
    const tui = renderTui(<QRCode value="AB" size="lg" />);
    ({ unmount } = tui);
    expect(tui.screen.text().length).toBeGreaterThan(0);
  });

  it("contains block characters", () => {
    const tui = renderTui(<QRCode value="HI" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
  });
});
