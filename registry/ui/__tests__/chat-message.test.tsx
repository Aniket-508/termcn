import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { ChatMessage } from "../chat-message";
import { renderTui } from "./render-tui";

describe("ChatMessage", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders sender role label", () => {
    const tui = renderTui(<ChatMessage sender="user">Hello</ChatMessage>);
    ({ unmount } = tui);
    expect(tui.screen.contains("user")).toBe(true);
    expect(tui.screen.contains("Hello")).toBe(true);
  });

  it("renders custom name instead of role", () => {
    const tui = renderTui(
      <ChatMessage sender="assistant" name="Claude">
        Hi
      </ChatMessage>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Claude")).toBe(true);
  });

  it("shows streaming indicator when streaming with no children", () => {
    const tui = renderTui(<ChatMessage sender="assistant" streaming />);
    ({ unmount } = tui);
    expect(tui.screen.contains("assistant")).toBe(true);
  });

  it("shows children when streaming with content", () => {
    const tui = renderTui(
      <ChatMessage sender="assistant" streaming>
        partial response
      </ChatMessage>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("partial response")).toBe(true);
  });

  it("renders collapsed state with expand hint", () => {
    const tui = renderTui(
      <ChatMessage sender="user" collapsed>
        Some long message
      </ChatMessage>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("[expand]")).toBe(true);
  });

  it("toggles collapsed state on enter", async () => {
    const tui = renderTui(
      <ChatMessage sender="user" collapsed>
        Some long message
      </ChatMessage>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("[expand]")).toBe(true);
    tui.keys.enter();
    await tui.flush();
    expect(tui.screen.contains("[expand]")).toBe(false);
  });

  it("renders all sender roles", () => {
    for (const role of ["user", "assistant", "system", "error"] as const) {
      const tui = renderTui(<ChatMessage sender={role}>content</ChatMessage>);
      expect(tui.screen.contains(role)).toBe(true);
      tui.unmount();
    }
  });
});
