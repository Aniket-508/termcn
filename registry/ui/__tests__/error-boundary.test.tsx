import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { ErrorBoundary } from "../error-boundary";
import { renderTui } from "./render-tui";

const ThrowingComponent = () => {
  throw new Error("test explosion");
};

describe("ErrorBoundary", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children when no error", () => {
    const tui = renderTui(
      <ErrorBoundary>
        <Text>safe content</Text>
      </ErrorBoundary>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("safe content")).toBe(true);
  });

  it("renders default error UI on error", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const tui = renderTui(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("test explosion")).toBe(true);
    expect(tui.screen.contains("Error")).toBe(true);
    spy.mockRestore();
  });

  it("renders custom fallback on error", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const tui = renderTui(
      <ErrorBoundary fallback={<Text>oops</Text>}>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("oops")).toBe(true);
    spy.mockRestore();
  });

  it("calls onError callback", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const onError = vi.fn();
    const tui = renderTui(
      <ErrorBoundary onError={onError}>
        <ThrowingComponent />
      </ErrorBoundary>
    );
    ({ unmount } = tui);
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
    spy.mockRestore();
  });

  it("renders custom title", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const tui = renderTui(
      <ErrorBoundary title="Crash">
        <ThrowingComponent />
      </ErrorBoundary>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("Crash")).toBe(true);
    spy.mockRestore();
  });
});
