import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { HelpScreen } from "../help-screen";
import { renderTui } from "./render-tui";

describe("HelpScreen", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders section label", () => {
    const tui = renderTui(
      <HelpScreen title="CLI">
        <HelpScreen.Section label="Options">
          <HelpScreen.Row flag="--help" description="Show help" />
        </HelpScreen.Section>
      </HelpScreen>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Options")).toBe(true);
  });

  it("renders row flag and description", () => {
    const tui = renderTui(
      <HelpScreen title="CLI">
        <HelpScreen.Section label="Flags">
          <HelpScreen.Row flag="--verbose" description="Enable verbose" />
        </HelpScreen.Section>
      </HelpScreen>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("--verbose")).toBe(true);
    expect(tui.screen.contains("Enable verbose")).toBe(true);
  });

  it("renders tagline", () => {
    const tui = renderTui(
      <HelpScreen title="CLI" tagline="A handy tool">
        <HelpScreen.Section label="Opts">
          <HelpScreen.Row flag="-v" description="Version" />
        </HelpScreen.Section>
      </HelpScreen>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("A handy tool")).toBe(true);
  });

  it("renders usage", () => {
    const tui = renderTui(
      <HelpScreen title="CLI" usage="cli <cmd> [opts]">
        <HelpScreen.Section label="Opts">
          <HelpScreen.Row flag="-h" description="Help" />
        </HelpScreen.Section>
      </HelpScreen>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Usage:")).toBe(true);
    expect(tui.screen.contains("cli <cmd> [opts]")).toBe(true);
  });

  it("renders description", () => {
    const tui = renderTui(
      <HelpScreen title="CLI" description="Does things">
        <HelpScreen.Section label="Opts">
          <HelpScreen.Row flag="-h" description="Help" />
        </HelpScreen.Section>
      </HelpScreen>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Does things")).toBe(true);
  });

  it("renders multiple sections", () => {
    const tui = renderTui(
      <HelpScreen title="CLI">
        <HelpScreen.Section label="Commands">
          <HelpScreen.Row flag="run" description="Run it" />
        </HelpScreen.Section>
        <HelpScreen.Section label="Options">
          <HelpScreen.Row flag="--debug" description="Debug mode" />
        </HelpScreen.Section>
      </HelpScreen>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Commands")).toBe(true);
    expect(tui.screen.contains("Options")).toBe(true);
  });
});
