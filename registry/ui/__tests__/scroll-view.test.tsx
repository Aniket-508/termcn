import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { ScrollView } from "../scroll-view";
import { renderTui } from "./render-tui";

describe("ScrollView", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <ScrollView height={5} contentHeight={10}>
        <Text>Hello scroll</Text>
      </ScrollView>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Hello scroll")).toBe(true);
  });

  it("shows scrollbar by default", () => {
    const tui = renderTui(
      <ScrollView height={3} contentHeight={10}>
        <Text>line 1</Text>
        <Text>line 2</Text>
        <Text>line 3</Text>
      </ScrollView>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(true);
  });

  it("hides scrollbar when showScrollbar is false", () => {
    const tui = renderTui(
      <ScrollView height={3} contentHeight={10} showScrollbar={false}>
        <Text>line 1</Text>
      </ScrollView>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("█")).toBe(false);
  });

  it("uses custom track and thumb characters", () => {
    const tui = renderTui(
      <ScrollView height={3} contentHeight={10} trackChar="." thumbChar="#">
        <Text>line 1</Text>
      </ScrollView>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("#")).toBe(true);
  });

  it("renders content without scrollbar when content fits", () => {
    const tui = renderTui(
      <ScrollView height={5} contentHeight={3} showScrollbar>
        <Text>line A</Text>
        <Text>line B</Text>
        <Text>line C</Text>
      </ScrollView>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("line A")).toBe(true);
    expect(tui.screen.contains("line B")).toBe(true);
    expect(tui.screen.contains("line C")).toBe(true);
  });
});
