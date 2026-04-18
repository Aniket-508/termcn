import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Wizard } from "../wizard";
import { renderTui } from "./render-tui";

describe("Wizard", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const steps = [
    { content: <Text>Step 1 Content</Text>, key: "step1", title: "Account" },
    { content: <Text>Step 2 Content</Text>, key: "step2", title: "Profile" },
    { content: <Text>Step 3 Content</Text>, key: "step3", title: "Confirm" },
  ];

  it("renders first step content", () => {
    const tui = renderTui(<Wizard steps={steps} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Step 1 Content")).toBe(true);
    expect(tui.screen.contains("Account")).toBe(true);
  });

  it("renders progress indicators", () => {
    const tui = renderTui(<Wizard steps={steps} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Account")).toBe(true);
    expect(tui.screen.contains("Profile")).toBe(true);
    expect(tui.screen.contains("Confirm")).toBe(true);
  });

  it("shows Next button on non-last step", () => {
    const tui = renderTui(<Wizard steps={steps} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Next")).toBe(true);
  });

  it("advances to next step on tab", async () => {
    const tui = renderTui(<Wizard steps={steps} />);
    ({ unmount } = tui);
    tui.keys.tab();
    await tui.flush();
    expect(tui.screen.contains("Step 2 Content")).toBe(true);
  });

  it("advances to next step on right arrow", async () => {
    const tui = renderTui(<Wizard steps={steps} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Step 2 Content")).toBe(true);
  });

  it("goes back on left arrow", async () => {
    const tui = renderTui(<Wizard steps={steps} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Step 2 Content")).toBe(true);
    tui.keys.left();
    await tui.flush();
    expect(tui.screen.contains("Step 1 Content")).toBe(true);
  });

  it("shows Back button after first step", async () => {
    const tui = renderTui(<Wizard steps={steps} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Back")).toBe(true);
  });

  it("shows Finish on last step", async () => {
    const tui = renderTui(<Wizard steps={steps} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Finish")).toBe(true);
  });

  it("calls onComplete when finishing last step", async () => {
    const onComplete = vi.fn();
    const tui = renderTui(<Wizard steps={steps} onComplete={onComplete} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    tui.keys.right();
    await tui.flush();
    tui.keys.right();
    await tui.flush();
    expect(onComplete).toHaveBeenCalledWith(["step1", "step2", "step3"]);
  });

  it("calls onCancel on escape", async () => {
    const onCancel = vi.fn();
    const tui = renderTui(<Wizard steps={steps} onCancel={onCancel} />);
    ({ unmount } = tui);
    tui.keys.escape();
    await tui.flush();
    expect(onCancel).toHaveBeenCalled();
  });

  it("shows validation error when step validation fails", async () => {
    const stepsWithValidation = [
      {
        content: <Text>content</Text>,
        key: "s1",
        title: "First",
        validate: () => "Fill required fields",
      },
      { content: <Text>done</Text>, key: "s2", title: "Second" },
    ];
    const tui = renderTui(<Wizard steps={stepsWithValidation} />);
    ({ unmount } = tui);
    tui.keys.right();
    await tui.flush();
    expect(tui.screen.contains("Fill required fields")).toBe(true);
  });

  it("hides progress when showProgress is false", () => {
    const tui = renderTui(<Wizard steps={steps} showProgress={false} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("◉")).toBe(false);
    expect(tui.screen.contains("○")).toBe(false);
  });
});
