import React from "react";
import { describe, it, expect, afterEach } from "vitest";

import { NotificationBadge } from "../notification-badge";
import { renderTui } from "./render-tui";

describe("NotificationBadge", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders count in brackets like [3]", () => {
    const tui = renderTui(<NotificationBadge count={3} />);
    ({ unmount } = tui);
    expect(tui.screen.contains("[3]")).toBe(true);
  });

  it("renders nothing when count=0", () => {
    const tui = renderTui(<NotificationBadge count={0} />);
    ({ unmount } = tui);
    expect(tui.screen.text().trim()).toBe("");
  });
});
