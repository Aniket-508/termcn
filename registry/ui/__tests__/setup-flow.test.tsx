import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { SetupFlow } from "../setup-flow";
import { renderTui } from "./render-tui";

describe("SetupFlow", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  describe("SetupFlow (root)", () => {
    it("renders children", () => {
      const tui = renderTui(
        <SetupFlow>
          <Text>Step content</Text>
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Step content")).toBe(true);
    });

    it("renders connector between children", () => {
      const tui = renderTui(
        <SetupFlow>
          <Text>A</Text>
          <Text>B</Text>
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("│")).toBe(true);
    });

    it("renders custom connector", () => {
      const tui = renderTui(
        <SetupFlow connectorChar="|">
          <Text>A</Text>
          <Text>B</Text>
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("|")).toBe(true);
    });
  });

  describe("SetupFlow.Badge", () => {
    it("renders badge label", () => {
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.Badge label="v1.0.0" />
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("v1.0.0")).toBe(true);
    });
  });

  describe("SetupFlow.Step", () => {
    it("renders step with done status", () => {
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.Step status="done">Completed step</SetupFlow.Step>
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Completed step")).toBe(true);
      expect(tui.screen.contains("◇")).toBe(true);
    });

    it("renders step with active status", () => {
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.Step status="active">Current step</SetupFlow.Step>
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Current step")).toBe(true);
      expect(tui.screen.contains("◆")).toBe(true);
    });

    it("renders step with success status", () => {
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.Step status="success">Passed</SetupFlow.Step>
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("✓")).toBe(true);
    });

    it("renders step with error status", () => {
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.Step status="error">Failed</SetupFlow.Step>
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("✗")).toBe(true);
    });

    it("renders custom icon", () => {
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.Step icon="★">Custom</SetupFlow.Step>
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("★")).toBe(true);
    });
  });

  describe("SetupFlow.MultiSelect", () => {
    const options = [
      { label: "TypeScript", value: "ts" },
      { label: "JavaScript", value: "js" },
      { label: "Python", value: "py" },
    ];

    it("renders label and options", () => {
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.MultiSelect label="Languages" options={options} />
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Languages")).toBe(true);
      expect(tui.screen.contains("TypeScript")).toBe(true);
      expect(tui.screen.contains("JavaScript")).toBe(true);
      expect(tui.screen.contains("Python")).toBe(true);
    });

    it("renders hint", () => {
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.MultiSelect
            label="Choose"
            hint="space to toggle"
            options={options}
          />
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("space to toggle")).toBe(true);
    });

    it("renders unchecked by default", () => {
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.MultiSelect label="Pick" options={options} />
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("□")).toBe(true);
    });

    it("toggles selection with space", async () => {
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.MultiSelect label="Pick" options={options} />
        </SetupFlow>
      );
      ({ unmount } = tui);
      tui.keys.space();
      await tui.flush();
      expect(tui.screen.contains("■")).toBe(true);
    });

    it("calls onChange on toggle", async () => {
      const onChange = vi.fn();
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.MultiSelect
            label="Pick"
            options={options}
            onChange={onChange}
          />
        </SetupFlow>
      );
      ({ unmount } = tui);
      tui.keys.space();
      await tui.flush();
      expect(onChange).toHaveBeenCalledWith(["ts"]);
    });

    it("navigates with arrow keys", async () => {
      const onChange = vi.fn();
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.MultiSelect
            label="Pick"
            options={options}
            onChange={onChange}
          />
        </SetupFlow>
      );
      ({ unmount } = tui);
      tui.keys.down();
      await tui.flush();
      tui.keys.space();
      await tui.flush();
      expect(onChange).toHaveBeenCalledWith(["js"]);
    });

    it("calls onSubmit on enter", async () => {
      const onSubmit = vi.fn();
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.MultiSelect
            label="Pick"
            options={options}
            onSubmit={onSubmit}
          />
        </SetupFlow>
      );
      ({ unmount } = tui);
      tui.keys.space();
      await tui.flush();
      tui.keys.enter();
      await tui.flush();
      expect(onSubmit).toHaveBeenCalledWith(["ts"]);
    });

    it("renders option descriptions", () => {
      const optsWithDesc = [
        { description: "Typed JS", label: "TypeScript", value: "ts" },
      ];
      const tui = renderTui(
        <SetupFlow>
          <SetupFlow.MultiSelect label="Pick" options={optsWithDesc} />
        </SetupFlow>
      );
      ({ unmount } = tui);
      expect(tui.screen.contains("Typed JS")).toBe(true);
    });
  });
});
