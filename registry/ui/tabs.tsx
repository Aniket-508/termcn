import { Box, Text, useStdout } from "ink";
import React, { useState } from "react";
import type { ReactNode } from "react";

import { useTheme } from "@/components/ui/theme-provider";
import { useInput } from "@/hooks/use-input";

export interface Tab {
  key: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  activeTab?: string;
  onTabChange?: (key: string) => void;
  borderColor?: string;
  /** Border style of the content panel. Default: 'single' */
  borderStyle?:
    | "single"
    | "double"
    | "round"
    | "bold"
    | "singleDouble"
    | "doubleSingle"
    | "classic";
  /** Separator between tab labels. Default: ' │ ' */
  separator?: string;
  /** Horizontal padding of the tab bar. Default: 2 */
  tabBarPaddingX?: number;
  /** Horizontal padding of the content panel. Default: 1 */
  paddingX?: number;
  /** Vertical padding of the content panel. Default: 0 */
  paddingY?: number;
}

export const Tabs = function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledTab,
  onTabChange,
  borderColor,
  borderStyle = "single",
  separator = " │ ",
  tabBarPaddingX = 2,
  paddingX = 1,
  paddingY = 0,
}: TabsProps) {
  const theme = useTheme();
  const { stdout } = useStdout();
  const [internalTab, setInternalTab] = useState(
    defaultTab ?? tabs[0]?.key ?? ""
  );
  const activeKey = controlledTab ?? internalTab;
  const activeIndex = tabs.findIndex((t) => t.key === activeKey);

  const resolvedBorderColor = borderColor ?? theme.colors.border;

  function switchTab(nextKey: string | undefined) {
    if (!nextKey || nextKey === activeKey) {
      return;
    }
    // Clear the entire screen before switching so Ink redraws from a clean
    // slate — prevents old lines from a taller tab persisting as ghost content.
    stdout.write("\u001B[2J\u001B[H");
    onTabChange ? onTabChange(nextKey) : setInternalTab(nextKey);
  }

  useInput((input, key) => {
    if (key.leftArrow || (key.shift && key.tab)) {
      switchTab(tabs[Math.max(0, activeIndex - 1)]?.key);
    } else if (key.rightArrow || key.tab) {
      switchTab(tabs[Math.min(tabs.length - 1, activeIndex + 1)]?.key);
    }
  });

  const activeTab = tabs.find((t) => t.key === activeKey);

  return (
    <Box flexDirection="column">
      {/* Tab bar — plain row, no border */}
      <Box paddingX={tabBarPaddingX} gap={0}>
        {tabs.map((tab, idx) => {
          const isActive = tab.key === activeKey;
          return (
            <Box key={tab.key}>
              <Text
                color={
                  isActive ? theme.colors.primary : theme.colors.mutedForeground
                }
                bold={isActive}
                underline={isActive}
              >
                {tab.label}
              </Text>
              {idx < tabs.length - 1 && (
                <Text color={resolvedBorderColor}>{separator}</Text>
              )}
            </Box>
          );
        })}
      </Box>
      {/* Only the active tab's content is rendered */}
      <Box
        borderStyle={borderStyle}
        borderColor={resolvedBorderColor}
        paddingX={paddingX}
        paddingY={paddingY}
      >
        {activeTab?.content}
      </Box>
    </Box>
  );
};
