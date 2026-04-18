import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { TagInput } from "../tag-input";
import { renderTui } from "./render-tui";

describe("TagInput", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders placeholder when empty", () => {
    const tui = renderTui(<TagInput />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Type and press Enter…")).toBe(true);
  });

  it("renders custom placeholder", () => {
    const tui = renderTui(<TagInput placeholder="Add tag…" />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Add tag…")).toBe(true);
  });

  it("renders existing tags", () => {
    const tui = renderTui(<TagInput value={["react", "vue"]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("react")).toBe(true);
    expect(tui.screen.contains("vue")).toBe(true);
  });

  it("adds tag on Enter", async () => {
    const onChange = vi.fn();
    const tui = renderTui(<TagInput value={[]} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.type("foo");
    await tui.flush();
    tui.keys.enter();
    await tui.flush();
    expect(onChange).toHaveBeenCalledWith(["foo"]);
  });

  it("does not add empty tag", () => {
    const onChange = vi.fn();
    const tui = renderTui(<TagInput value={[]} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.enter();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("removes last tag on backspace when input is empty", () => {
    const onChange = vi.fn();
    const tui = renderTui(<TagInput value={["a", "b"]} onChange={onChange} />);
    ({ unmount } = tui);
    tui.keys.backspace();
    expect(onChange).toHaveBeenCalledWith(["a"]);
  });

  it("backspace removes input text first", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <TagInput value={["existing"]} onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.type("ab");
    await tui.flush();
    tui.keys.backspace();
    await tui.flush();
    expect(onChange).not.toHaveBeenCalled();
    expect(tui.screen.contains("a")).toBe(true);
  });

  it("respects maxTags", async () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <TagInput value={["a", "b"]} onChange={onChange} maxTags={2} />
    );
    ({ unmount } = tui);
    tui.keys.type("c");
    await tui.flush();
    tui.keys.enter();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("shows max tags message", () => {
    const tui = renderTui(<TagInput value={["a", "b"]} maxTags={2} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("Max 2 tags reached")).toBe(true);
  });

  it("renders × in tag display", () => {
    const tui = renderTui(<TagInput value={["test"]} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("×")).toBe(true);
  });
});
