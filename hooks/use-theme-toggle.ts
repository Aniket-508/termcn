"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect } from "react";

import { useMetaColor } from "@/hooks/use-meta-color";

import { useFeedback } from "./use-feedback";

export const useThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const { setMetaColor, metaColor } = useMetaColor();
  const feedbackOn = useFeedback({ sound: "toggleOn" });
  const feedbackOff = useFeedback({ sound: "toggleOff" });

  useEffect(() => {
    setMetaColor(metaColor);
  }, [metaColor, setMetaColor]);

  const toggleTheme = useCallback(() => {
    const nextResolved = resolvedTheme === "dark" ? "light" : "dark";
    if (nextResolved === "dark") {
      feedbackOff();
    } else if (nextResolved === "light") {
      feedbackOn();
    } else {
      feedbackOn();
    }
    setTheme(nextResolved);
  }, [resolvedTheme, setTheme, feedbackOn, feedbackOff]);

  // Listen for the D key to toggle theme.
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (
        (e.key === "d" || e.key === "D") &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey
      ) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        toggleTheme();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggleTheme]);

  return { toggleTheme };
};
