import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { FormField } from "../form-field";
import { renderTui } from "./render-tui";

describe("FormField", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders label", () => {
    const tui = renderTui(
      <FormField label="Username">
        <Text>field</Text>
      </FormField>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Username")).toBe(true);
  });

  it("shows error", () => {
    const tui = renderTui(
      <FormField label="Email" error="Invalid email">
        <Text>input</Text>
      </FormField>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Invalid email")).toBe(true);
  });

  it("shows hint when there is no error", () => {
    const tui = renderTui(
      <FormField label="Name" hint="Use your legal name">
        <Text>input</Text>
      </FormField>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Use your legal name")).toBe(true);
  });

  it("shows asterisk when required", () => {
    const tui = renderTui(
      <FormField label="Password" required>
        <Text>secret</Text>
      </FormField>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("*")).toBe(true);
  });
});
