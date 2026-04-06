import { Text } from "ink";
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";

import { Form, useFormContext } from "../form";
import { renderTui } from "./render-tui";

const FieldDisplay = ({ name }: { name: string }) => {
  const { values, errors } = useFormContext();
  return (
    <Text>
      {name}:{String(values[name] ?? "")}
      {errors[name] ? ` error:${errors[name]}` : ""}
    </Text>
  );
};

describe("Form", () => {
  let unmount: () => void;
  afterEach(() => unmount?.());

  it("renders children and submit hint", () => {
    const tui = renderTui(
      <Form>
        <Text>child content</Text>
      </Form>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("child content")).toBe(true);
    expect(tui.screen.contains("Ctrl+S")).toBe(true);
  });

  it("provides initial values via context", () => {
    const tui = renderTui(
      <Form initialValues={{ name: "Alice" }}>
        <FieldDisplay name="name" />
      </Form>
    );
    ({ unmount } = tui);
    expect(tui.screen.contains("name:Alice")).toBe(true);
  });

  it("calls onSubmit with values on Ctrl+S", async () => {
    const onSubmit = vi.fn();
    const tui = renderTui(
      <Form onSubmit={onSubmit} initialValues={{ name: "Bob" }}>
        <Text>form</Text>
      </Form>
    );
    ({ unmount } = tui);
    tui.keys.raw("\u0013");
    await tui.flush();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Bob" })
    );
  });

  it("validates fields before submit", async () => {
    const onSubmit = vi.fn();
    const fields = [
      {
        name: "email",
        validate: (v: unknown) =>
          typeof v === "string" && v.includes("@") ? null : "Invalid email",
      },
    ];
    const tui = renderTui(
      <Form
        onSubmit={onSubmit}
        initialValues={{ email: "bad" }}
        fields={fields}
      >
        <FieldDisplay name="email" />
      </Form>
    );
    ({ unmount } = tui);
    tui.keys.raw("\u0013");
    await tui.flush();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits when validation passes", async () => {
    const onSubmit = vi.fn();
    const fields = [
      {
        name: "email",
        validate: (v: unknown) =>
          typeof v === "string" && v.includes("@") ? null : "Invalid",
      },
    ];
    const tui = renderTui(
      <Form
        onSubmit={onSubmit}
        initialValues={{ email: "a@b.com" }}
        fields={fields}
      >
        <Text>ok</Text>
      </Form>
    );
    ({ unmount } = tui);
    tui.keys.raw("\u0013");
    await tui.flush();
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ email: "a@b.com" })
    );
  });
});
