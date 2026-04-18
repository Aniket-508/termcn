import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Pagination } from "../pagination";
import { renderTui } from "./render-tui";

describe("Pagination", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders current page highlighted", () => {
    const tui = renderTui(<Pagination total={5} current={3} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[3]")).toBe(true);
  });

  it("renders navigation arrows", () => {
    const tui = renderTui(<Pagination total={5} current={3} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("‹")).toBe(true);
    expect(tui.screen.contains("›")).toBe(true);
  });

  it("renders all pages when total <= 7", () => {
    const tui = renderTui(<Pagination total={5} current={1} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[1]")).toBe(true);
    expect(tui.screen.contains("5")).toBe(true);
  });

  it("shows ellipsis for large page counts", () => {
    const tui = renderTui(<Pagination total={20} current={10} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("…")).toBe(true);
  });

  it("calls onChange on right arrow", () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <Pagination total={5} current={2} onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.right();
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("calls onChange on left arrow", () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <Pagination total={5} current={3} onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.left();
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("does not go below page 1", () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <Pagination total={5} current={1} onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.left();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does not go above total", () => {
    const onChange = vi.fn();
    const tui = renderTui(
      <Pagination total={5} current={5} onChange={onChange} />
    );
    ({ unmount } = tui);
    tui.keys.right();
    expect(onChange).not.toHaveBeenCalled();
  });
});
