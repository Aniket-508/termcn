import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { AppShell } from "../app-shell";
import type { TuiInstance } from "./render-tui";
import { renderTui } from "./render-tui";

const typeChars = async (tui: TuiInstance, text: string) => {
  for (const char of text) {
    tui.keys.press(char);
    await tui.flush();
  }
};

describe("AppShell", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <AppShell>
        <Text>App Content</Text>
      </AppShell>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("App Content")).toBe(true);
  });

  describe("AppShell.Header", () => {
    it("renders header children", () => {
      const tui = renderTui(
        <AppShell>
          <AppShell.Header>
            <Text>My App Header</Text>
          </AppShell.Header>
        </AppShell>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("My App Header")).toBe(true);
    });
  });

  describe("AppShell.Content", () => {
    it("renders content children", () => {
      const tui = renderTui(
        <AppShell>
          <AppShell.Content>
            <Text>Main content area</Text>
          </AppShell.Content>
        </AppShell>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Main content area")).toBe(true);
    });
  });

  describe("AppShell.Input", () => {
    it("renders placeholder", () => {
      const tui = renderTui(
        <AppShell>
          <AppShell.Input placeholder="Enter command..." />
        </AppShell>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Enter command...")).toBe(true);
    });

    it("renders prefix", () => {
      const tui = renderTui(
        <AppShell>
          <AppShell.Input prefix="$" />
        </AppShell>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("$")).toBe(true);
    });

    it("accepts typed input", async () => {
      const tui = renderTui(
        <AppShell>
          <AppShell.Input />
        </AppShell>
      );
      ({ unmount } = tui);
      await typeChars(tui, "hello");
      expect(tui.screen.contains("hello")).toBe(true);
    });

    it("calls onChange", async () => {
      const onChange = vi.fn();
      const tui = renderTui(
        <AppShell>
          <AppShell.Input value="" onChange={onChange} />
        </AppShell>
      );
      ({ unmount } = tui);
      tui.keys.press("x");
      await tui.flush();
      expect(onChange).toHaveBeenCalledWith("x");
    });

    it("calls onSubmit on enter", async () => {
      const onSubmit = vi.fn();
      const tui = renderTui(
        <AppShell>
          <AppShell.Input onSubmit={onSubmit} />
        </AppShell>
      );
      ({ unmount } = tui);
      await typeChars(tui, "cmd");
      tui.keys.enter();
      await tui.flush();
      expect(onSubmit).toHaveBeenCalledWith("cmd");
    });

    it("clears input after uncontrolled submit", async () => {
      const onSubmit = vi.fn();
      const tui = renderTui(
        <AppShell>
          <AppShell.Input onSubmit={onSubmit} />
        </AppShell>
      );
      ({ unmount } = tui);
      await typeChars(tui, "test");
      tui.keys.enter();
      await tui.flush();
      expect(tui.screen.contains("Type something...")).toBe(true);
    });

    it("handles backspace", async () => {
      const tui = renderTui(
        <AppShell>
          <AppShell.Input />
        </AppShell>
      );
      ({ unmount } = tui);
      await typeChars(tui, "ab");
      tui.keys.backspace();
      await tui.flush();
      expect(tui.screen.contains("a")).toBe(true);
    });
  });

  describe("AppShell.Hints", () => {
    it("renders hint items", () => {
      const tui = renderTui(
        <AppShell>
          <AppShell.Hints items={["Ctrl+C: quit", "?: help"]} />
        </AppShell>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Ctrl+C: quit")).toBe(true);
      expect(tui.screen.contains("?: help")).toBe(true);
    });

    it("renders children as content", () => {
      const tui = renderTui(
        <AppShell>
          <AppShell.Hints>Press q to quit</AppShell.Hints>
        </AppShell>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Press q to quit")).toBe(true);
    });
  });

  describe("AppShell.Tip", () => {
    it("renders tip text", () => {
      const tui = renderTui(
        <AppShell>
          <AppShell.Tip>Use tab to navigate</AppShell.Tip>
        </AppShell>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Tip:")).toBe(true);
      expect(tui.screen.contains("Use tab to navigate")).toBe(true);
    });
  });
});
