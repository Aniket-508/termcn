import { renderTui as baseRenderTui, cleanup } from "ink-testing";
import type { TuiInstance } from "ink-testing";
import React from "react";

import { ThemeProvider } from "../theme-provider";

export { cleanup, KEY } from "ink-testing";
export type { TuiInstance, Screen, KeySender } from "ink-testing";

export const renderTui = (ui: React.ReactElement): TuiInstance =>
  baseRenderTui(<ThemeProvider>{ui}</ThemeProvider>);
