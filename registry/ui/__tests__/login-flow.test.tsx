import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { LoginFlow } from "../login-flow";
import { renderTui } from "./render-tui";

describe("LoginFlow", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  describe("LoginFlow (root)", () => {
    it("renders children", () => {
      const tui = renderTui(
        <LoginFlow>
          <Text>Welcome back</Text>
        </LoginFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Welcome back")).toBe(true);
    });

    it("renders title via BigText", () => {
      const tui = renderTui(
        <LoginFlow title="Hi">
          <Text>content</Text>
        </LoginFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("content")).toBe(true);
      const text = tui.screen.text();
      expect(text.length).toBeGreaterThan("content".length);
    });
  });

  describe("LoginFlow.Announcement", () => {
    it("renders announcement with icon", () => {
      const tui = renderTui(
        <LoginFlow>
          <LoginFlow.Announcement icon="!">
            New version available!
          </LoginFlow.Announcement>
        </LoginFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("!")).toBe(true);
      expect(tui.screen.contains("New version available!")).toBe(true);
    });

    it("renders with default icon", () => {
      const tui = renderTui(
        <LoginFlow>
          <LoginFlow.Announcement>Notice</LoginFlow.Announcement>
        </LoginFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("*")).toBe(true);
      expect(tui.screen.contains("Notice")).toBe(true);
    });
  });

  describe("LoginFlow.Description", () => {
    it("renders description text", () => {
      const tui = renderTui(
        <LoginFlow>
          <LoginFlow.Description>Please sign in</LoginFlow.Description>
        </LoginFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Please sign in")).toBe(true);
    });
  });

  describe("LoginFlow.Select", () => {
    const options = ["GitHub", "Google", "Email"];

    it("renders options", () => {
      const tui = renderTui(
        <LoginFlow>
          <LoginFlow.Select options={options} />
        </LoginFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("GitHub")).toBe(true);
      expect(tui.screen.contains("Google")).toBe(true);
      expect(tui.screen.contains("Email")).toBe(true);
    });

    it("renders label", () => {
      const tui = renderTui(
        <LoginFlow>
          <LoginFlow.Select options={options} label="Sign in with:" />
        </LoginFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Sign in with:")).toBe(true);
    });

    it("renders cursor on active item", () => {
      const tui = renderTui(
        <LoginFlow>
          <LoginFlow.Select options={options} />
        </LoginFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("›")).toBe(true);
    });

    it("navigates with arrow keys", async () => {
      const onSelect = vi.fn();
      const tui = renderTui(
        <LoginFlow>
          <LoginFlow.Select options={options} onSelect={onSelect} />
        </LoginFlow>
      );
      ({ unmount } = tui);
      tui.keys.down();
      await tui.flush();
      tui.keys.enter();
      await tui.flush();
      expect(onSelect).toHaveBeenCalledWith(1);
    });

    it("selects by number key", async () => {
      const onSelect = vi.fn();
      const tui = renderTui(
        <LoginFlow>
          <LoginFlow.Select options={options} onSelect={onSelect} />
        </LoginFlow>
      );
      ({ unmount } = tui);
      tui.keys.press("3");
      await tui.flush();
      expect(onSelect).toHaveBeenCalledWith(2);
    });

    it("does not go above first option", async () => {
      const onSelect = vi.fn();
      const tui = renderTui(
        <LoginFlow>
          <LoginFlow.Select options={options} onSelect={onSelect} />
        </LoginFlow>
      );
      ({ unmount } = tui);
      tui.keys.up();
      await tui.flush();
      tui.keys.enter();
      await tui.flush();
      expect(onSelect).toHaveBeenCalledWith(0);
    });
  });
});
