import { Text } from "ink";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { ChatThread } from "../chat-thread";
import { renderTui } from "./render-tui";

describe("ChatThread", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children", () => {
    const tui = renderTui(
      <ChatThread maxHeight={10} autoScroll={false}>
        <Text>hello thread</Text>
      </ChatThread>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("hello thread")).toBe(true);
  });
});
