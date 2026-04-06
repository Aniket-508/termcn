import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { WelcomeScreen } from "../welcome-screen";
import { renderTui } from "./render-tui";

describe("WelcomeScreen", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders app name", () => {
    const tui = renderTui(
      <WelcomeScreen appName="MyCLI">
        <WelcomeScreen.Left>
          <Text>left</Text>
        </WelcomeScreen.Left>
        <WelcomeScreen.Right>
          <Text>right</Text>
        </WelcomeScreen.Right>
      </WelcomeScreen>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("MyCLI")).toBe(true);
  });

  it("renders app name with version", () => {
    const tui = renderTui(
      <WelcomeScreen appName="MyCLI" version="v1.2.3">
        <WelcomeScreen.Left>
          <Text>l</Text>
        </WelcomeScreen.Left>
        <WelcomeScreen.Right>
          <Text>r</Text>
        </WelcomeScreen.Right>
      </WelcomeScreen>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("MyCLI v1.2.3")).toBe(true);
  });

  it("renders left and right panels", () => {
    const tui = renderTui(
      <WelcomeScreen appName="App">
        <WelcomeScreen.Left>
          <Text>Left Panel</Text>
        </WelcomeScreen.Left>
        <WelcomeScreen.Right>
          <Text>Right Panel</Text>
        </WelcomeScreen.Right>
      </WelcomeScreen>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Left Panel")).toBe(true);
    expect(tui.screen.contains("Right Panel")).toBe(true);
  });

  describe("WelcomeScreen.Greeting", () => {
    it("renders greeting text", () => {
      const tui = renderTui(
        <WelcomeScreen appName="App">
          <WelcomeScreen.Left>
            <WelcomeScreen.Greeting>Hello, User!</WelcomeScreen.Greeting>
          </WelcomeScreen.Left>
          <WelcomeScreen.Right>
            <Text>r</Text>
          </WelcomeScreen.Right>
        </WelcomeScreen>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Hello, User!")).toBe(true);
    });
  });

  describe("WelcomeScreen.Logo", () => {
    it("renders logo text", () => {
      const tui = renderTui(
        <WelcomeScreen appName="App">
          <WelcomeScreen.Left>
            <WelcomeScreen.Logo>LOGO ART</WelcomeScreen.Logo>
          </WelcomeScreen.Left>
          <WelcomeScreen.Right>
            <Text>r</Text>
          </WelcomeScreen.Right>
        </WelcomeScreen>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("LOGO ART")).toBe(true);
    });
  });

  describe("WelcomeScreen.Meta", () => {
    it("renders meta items with separator", () => {
      const tui = renderTui(
        <WelcomeScreen appName="App">
          <WelcomeScreen.Left>
            <WelcomeScreen.Meta items={["v1.0", "MIT", "Node 20"]} />
          </WelcomeScreen.Left>
          <WelcomeScreen.Right>
            <Text>r</Text>
          </WelcomeScreen.Right>
        </WelcomeScreen>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("v1.0")).toBe(true);
      expect(tui.screen.contains("MIT")).toBe(true);
      expect(tui.screen.contains("Node 20")).toBe(true);
    });

    it("renders stacked meta items", () => {
      const tui = renderTui(
        <WelcomeScreen appName="App">
          <WelcomeScreen.Left>
            <WelcomeScreen.Meta items={["Line 1", "Line 2"]} stack />
          </WelcomeScreen.Left>
          <WelcomeScreen.Right>
            <Text>r</Text>
          </WelcomeScreen.Right>
        </WelcomeScreen>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Line 1")).toBe(true);
      expect(tui.screen.contains("Line 2")).toBe(true);
    });
  });

  describe("WelcomeScreen.Section", () => {
    it("renders section with title and content", () => {
      const tui = renderTui(
        <WelcomeScreen appName="App">
          <WelcomeScreen.Left>
            <Text>l</Text>
          </WelcomeScreen.Left>
          <WelcomeScreen.Right>
            <WelcomeScreen.Section title="Getting Started">
              Run npx my-cli init
            </WelcomeScreen.Section>
          </WelcomeScreen.Right>
        </WelcomeScreen>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Getting Started")).toBe(true);
      expect(tui.screen.contains("Run npx my-cli init")).toBe(true);
    });
  });
});
