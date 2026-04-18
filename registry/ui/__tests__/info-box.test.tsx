import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { InfoBox } from "../info-box";
import { renderTui } from "./render-tui";

describe("InfoBox", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders with header label", () => {
    const tui = renderTui(
      <InfoBox>
        <InfoBox.Header label="My service" />
      </InfoBox>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("My service")).toBe(true);
  });

  it("renders rows", () => {
    const tui = renderTui(
      <InfoBox>
        <InfoBox.Row label="Host" value="localhost" />
        <InfoBox.Row label="Port" value="3000" />
      </InfoBox>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Host")).toBe(true);
    expect(tui.screen.contains("localhost")).toBe(true);
    expect(tui.screen.contains("Port")).toBe(true);
    expect(tui.screen.contains("3000")).toBe(true);
  });

  it("renders tree rows with └", () => {
    const tui = renderTui(
      <InfoBox>
        <InfoBox.TreeRow label="nested" value="leaf" />
      </InfoBox>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("└")).toBe(true);
    expect(tui.screen.contains("nested")).toBe(true);
    expect(tui.screen.contains("leaf")).toBe(true);
  });
});
