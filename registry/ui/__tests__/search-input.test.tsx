import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { SearchInput } from "../search-input";
import type { TuiInstance } from "./render-tui";
import { renderTui } from "./render-tui";

const typeChars = async (tui: TuiInstance, text: string) => {
  for (const char of text) {
    tui.keys.press(char);
    await tui.flush();
  }
};

const focusAndFlush = async (tui: TuiInstance) => {
  await tui.flush();
  tui.keys.tab();
  await tui.flush();
};

describe("SearchInput", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  const fruits = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

  it("renders label", () => {
    const tui = renderTui(<SearchInput label="Find" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Find")).toBe(true);
  });

  it("renders placeholder", () => {
    const tui = renderTui(<SearchInput placeholder="Type to search" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Type to search")).toBe(true);
  });

  it("renders search icon", () => {
    const tui = renderTui(<SearchInput />);
    ({ unmount } = tui);
    expect(tui.screen.contains("🔍")).toBe(true);
  });

  it("filters options as user types", async () => {
    const tui = renderTui(<SearchInput options={fruits} id="si" />);
    ({ unmount } = tui);
    await focusAndFlush(tui);
    await typeChars(tui, "ban");
    expect(tui.screen.contains("Banana")).toBe(true);
    expect(tui.screen.contains("Cherry")).toBe(false);
  });

  it("shows results on down arrow", async () => {
    const tui = renderTui(<SearchInput options={fruits} id="si" />);
    ({ unmount } = tui);
    await focusAndFlush(tui);
    tui.keys.down();
    await tui.flush();
    expect(tui.screen.contains("Apple")).toBe(true);
  });

  it("calls onSelect when selecting a result", async () => {
    const onSelect = vi.fn();
    const tui = renderTui(
      <SearchInput options={fruits} onSelect={onSelect} id="si" />
    );
    ({ unmount } = tui);
    await focusAndFlush(tui);
    await typeChars(tui, "ch");
    tui.keys.enter();
    await tui.flush();
    expect(onSelect).toHaveBeenCalledWith("Cherry");
  });

  it("clears query on escape", async () => {
    const tui = renderTui(<SearchInput options={fruits} id="si" />);
    ({ unmount } = tui);
    await focusAndFlush(tui);
    await typeChars(tui, "app");
    expect(tui.screen.contains("app")).toBe(true);
    tui.keys.escape();
    await tui.flush();
    expect(tui.screen.contains("Search...")).toBe(true);
  });

  it("calls onChange for controlled value", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<SearchInput value="" onChange={onChange} id="si" />);
    ({ unmount } = tui);
    await focusAndFlush(tui);
    tui.keys.press("x");
    await tui.flush();
    expect(onChange).toHaveBeenCalledWith("x");
  });

  it("limits results to maxResults", async () => {
    const many = ["A1", "A2", "A3", "A4", "A5", "A6", "A7"];
    const tui = renderTui(
      <SearchInput options={many} maxResults={3} id="si" />
    );
    ({ unmount } = tui);
    await focusAndFlush(tui);
    tui.keys.down();
    await tui.flush();
    const text = tui.screen.text();
    const matches = many.filter((item) => text.includes(item));
    expect(matches.length).toBeLessThanOrEqual(3);
  });
});
