import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { ModelSelector } from "../model-selector";
import { renderTui } from "./render-tui";

describe("ModelSelector", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const models = [
    { context: 128_000, id: "gpt4", name: "GPT-4", provider: "OpenAI" },
    { context: 200_000, id: "claude", name: "Claude", provider: "Anthropic" },
    { context: 1_000_000, id: "gemini", name: "Gemini", provider: "Google" },
  ];

  it("renders model names", () => {
    const tui = renderTui(<ModelSelector models={models} selected="gpt4" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("GPT-4")).toBe(true);
    expect(tui.screen.contains("Claude")).toBe(true);
    expect(tui.screen.contains("Gemini")).toBe(true);
  });

  it("shows checkmark on selected model", () => {
    const tui = renderTui(<ModelSelector models={models} selected="gpt4" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("✓")).toBe(true);
  });

  it("shows provider when showProvider is true", () => {
    const tui = renderTui(
      <ModelSelector models={models} selected="gpt4" showProvider />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("OpenAI")).toBe(true);
    expect(tui.screen.contains("Anthropic")).toBe(true);
  });

  it("shows context size", () => {
    const tui = renderTui(
      <ModelSelector models={models} selected="gpt4" showContext />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("128k ctx")).toBe(true);
    expect(tui.screen.contains("1M ctx")).toBe(true);
  });

  it("hides context when showContext is false", () => {
    const tui = renderTui(
      <ModelSelector models={models} selected="gpt4" showContext={false} />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("128k ctx")).toBe(false);
  });

  it("calls onSelect on enter", async () => {
    const onSelect = vi.fn();
    const tui = renderTui(
      <ModelSelector models={models} selected="gpt4" onSelect={onSelect} />
    );
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onSelect).toHaveBeenCalledWith("claude");
  });

  it("navigates with arrow keys", async () => {
    const onSelect = vi.fn();
    const tui = renderTui(
      <ModelSelector models={models} selected="gpt4" onSelect={onSelect} />
    );
    ({ unmount } = tui);
    tui.keys.down();
    await tui.flush();
    tui.keys.down();
    await tui.flush();
    tui.keys.enter();
    expect(onSelect).toHaveBeenCalledWith("gemini");
  });

  it("shows cursor on active item", () => {
    const tui = renderTui(<ModelSelector models={models} selected="gpt4" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("›")).toBe(true);
  });

  it("renders grouped by provider", () => {
    const tui = renderTui(
      <ModelSelector models={models} selected="gpt4" groupByProvider />
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("OpenAI")).toBe(true);
    expect(tui.screen.contains("Anthropic")).toBe(true);
    expect(tui.screen.contains("Google")).toBe(true);
  });
});
