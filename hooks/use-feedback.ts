"use client";

import { defineSound } from "@web-kits/audio";
import { useCallback, useMemo } from "react";
import { useWebHaptics } from "web-haptics/react";

import * as core from "@/audio/core";

/**
 * Public feedback names (camelCase) mapped to their `SoundDefinition`.
 * Using the named exports from `audio/core` keeps the casing consistent
 * with JSX props like `sound="tabSwitch"` (the `_patch.sounds` keys are
 * kebab-case and would resolve to `undefined` at runtime).
 */
const soundByType = {
  blur: core.blur,
  checkbox: core.checkbox,
  click: core.click,
  copy: core.copy,
  deselect: core.deselect,
  error: core.error,
  focus: core.focus,
  hover: core.hover,
  keyPress: core.keyPress,
  notification: core.notification,
  pop: core.pop,
  radio: core.radio,
  scrollSnap: core.scrollSnap,
  select: core.select,
  success: core.success,
  tabSwitch: core.tabSwitch,
  tap: core.tap,
  tick: core.tick,
  toggleOff: core.toggleOff,
  toggleOn: core.toggleOn,
  warning: core.warning,
} as const;

export type FeedbackType = keyof typeof soundByType;

const hapticPresetByType: Record<FeedbackType, string> = {
  blur: "light",
  checkbox: "light",
  click: "medium",
  copy: "selection",
  deselect: "light",
  error: "error",
  focus: "light",
  hover: "soft",
  keyPress: "light",
  notification: "nudge",
  pop: "medium",
  radio: "medium",
  scrollSnap: "selection",
  select: "selection",
  success: "success",
  tabSwitch: "selection",
  tap: "light",
  tick: "selection",
  toggleOff: "light",
  toggleOn: "light",
  warning: "warning",
};

export interface UseFeedbackOptions {
  sound?: FeedbackType;
  haptic?: boolean;
}

export const useFeedback = ({ sound, haptic = false }: UseFeedbackOptions) => {
  const { trigger: hapticTrigger } = useWebHaptics();

  const play = useMemo(
    () => (sound ? defineSound(soundByType[sound]) : null),
    [sound]
  );

  const preset = sound ? hapticPresetByType[sound] : undefined;

  return useCallback(() => {
    if (!sound || !play) {
      return;
    }
    play();
    if (haptic && preset) {
      void hapticTrigger(preset);
    }
  }, [sound, play, haptic, preset, hapticTrigger]);
};
