"use client";

import { useRouter } from "next/navigation";
import { startTransition, addTransitionType } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { trackEvent } from "@/lib/events";

export const DocsKeyboardShortcuts = ({
  previous,
  next,
}: {
  previous: string | null;
  next: string | null;
}) => {
  const router = useRouter();

  const navigate = (
    href: string | null,
    direction: "previous" | "next",
    keys: string
  ) => {
    if (href) {
      trackEvent({
        name: "keyboard_shortcut_navigate",
        properties: { direction, keys, path: href },
      });
      startTransition(() => {
        addTransitionType(direction === "next" ? "nav-forward" : "nav-back");
        router.push(href);
      });
    }
  };

  useHotkeys("ArrowRight", (event) => {
    if (event.defaultPrevented) {
      return;
    }

    navigate(next, "next", "ArrowRight");
  });

  useHotkeys("ArrowLeft", (event) => {
    if (event.defaultPrevented) {
      return;
    }

    navigate(previous, "previous", "ArrowLeft");
  });

  return null;
};
