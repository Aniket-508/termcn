import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { Markdown } from "../markdown";
import { renderTui } from "./render-tui";

describe("Markdown", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders heading text", () => {
    const tui = renderTui(<Markdown># Hello World</Markdown>);
    ({ unmount } = tui);
    expect(tui.screen.contains("Hello World")).toBe(true);
  });

  it("renders h2 heading", () => {
    const tui = renderTui(<Markdown>## Subtitle</Markdown>);
    ({ unmount } = tui);
    expect(tui.screen.contains("Subtitle")).toBe(true);
  });

  it("renders list items with bullet", () => {
    const tui = renderTui(<Markdown>{"- item one\n- item two"}</Markdown>);
    ({ unmount } = tui);
    expect(tui.screen.contains("•")).toBe(true);
    expect(tui.screen.contains("item one")).toBe(true);
    expect(tui.screen.contains("item two")).toBe(true);
  });

  it("renders bold text", () => {
    const tui = renderTui(<Markdown>**bold text**</Markdown>);
    ({ unmount } = tui);
    expect(tui.screen.contains("bold text")).toBe(true);
  });

  it("renders inline code", () => {
    const tui = renderTui(<Markdown>`code here`</Markdown>);
    ({ unmount } = tui);
    expect(tui.screen.contains("code here")).toBe(true);
  });

  it("renders blockquote with pipe", () => {
    const tui = renderTui(<Markdown>{"> quoted text"}</Markdown>);
    ({ unmount } = tui);
    expect(tui.screen.contains("│")).toBe(true);
    expect(tui.screen.contains("quoted text")).toBe(true);
  });

  it("renders horizontal rule", () => {
    const tui = renderTui(<Markdown>---</Markdown>);
    ({ unmount } = tui);
    expect(tui.screen.contains("─")).toBe(true);
  });

  it("renders plain paragraph text", () => {
    const tui = renderTui(<Markdown>Just a paragraph.</Markdown>);
    ({ unmount } = tui);
    expect(tui.screen.contains("Just a paragraph.")).toBe(true);
  });
});
