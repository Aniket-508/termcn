import { Box, Text } from "ink";
import React, { useState } from "react";

import { useTheme } from "@/components/ui/theme-provider";
import { useInput } from "@/hooks/use-input";

export interface MenuItem {
  key: string;
  label: string;
  icon?: string;
  shortcut?: string;
  disabled?: boolean;
  separator?: boolean;
  children?: MenuItem[];
}

export interface MenuProps {
  items: MenuItem[];
  onSelect?: (item: MenuItem) => void;
  title?: string;
}

export const Menu = function Menu({ items, onSelect, title }: MenuProps) {
  const theme = useTheme();
  const [focusIndex, setFocusIndex] = useState(0);
  const [submenuStack, setSubmenuStack] = useState<MenuItem[][]>([]);

  const activeItems = submenuStack.length > 0 ? submenuStack.at(-1)! : items;

  // Selectable items (non-separator, non-disabled)
  const selectableIndices = activeItems
    .map((item, idx) => ({ idx, item }))
    .filter(({ item }) => !item.separator && !item.disabled)
    .map(({ idx }) => idx);

  function moveFocus(direction: 1 | -1) {
    const currentPos = selectableIndices.indexOf(focusIndex);
    const nextPos = currentPos + direction;
    if (nextPos >= 0 && nextPos < selectableIndices.length) {
      setFocusIndex(selectableIndices[nextPos]);
    }
  }

  function openSubmenu(item: MenuItem) {
    if (item.children && item.children.length > 0) {
      setSubmenuStack((prev) => [...prev, item.children!]);
      setFocusIndex(0);
    }
  }

  function closeSubmenu() {
    if (submenuStack.length > 0) {
      setSubmenuStack((prev) => prev.slice(0, -1));
      setFocusIndex(0);
    }
  }

  function activateItem(item: MenuItem) {
    if (item.disabled || item.separator) {
      return;
    }
    if (item.children && item.children.length > 0) {
      openSubmenu(item);
    } else {
      onSelect?.(item);
    }
  }

  useInput((_input, key) => {
    if (key.upArrow) {
      moveFocus(-1);
    } else if (key.downArrow) {
      moveFocus(1);
    } else if (key.return) {
      const item = activeItems[focusIndex];
      if (item) {
        activateItem(item);
      }
    } else if (key.rightArrow) {
      const item = activeItems[focusIndex];
      if (item?.children && item.children.length > 0) {
        openSubmenu(item);
      }
    } else if (key.leftArrow) {
      closeSubmenu();
    } else if (key.escape) {
      closeSubmenu();
    }
  });

  const depth = submenuStack.length;

  return (
    <Box
      flexDirection="column"
      borderStyle="single"
      borderColor={theme.colors.border}
      paddingX={1}
      paddingY={0}
      marginLeft={depth * 2}
    >
      {title && (
        <Box marginBottom={1}>
          <Text bold color={theme.colors.primary}>
            {title}
          </Text>
        </Box>
      )}
      {activeItems.map((item, idx) => {
        if (item.separator) {
          return (
            <Box key={item.key}>
              <Text color={theme.colors.mutedForeground}>{"─".repeat(20)}</Text>
            </Box>
          );
        }

        const isFocused = idx === focusIndex;

        return (
          <Box key={item.key} justifyContent="space-between">
            <Box flexDirection="row" gap={1}>
              <Text color={isFocused ? theme.colors.primary : "transparent"}>
                {isFocused ? "›" : " "}
              </Text>
              {item.icon && (
                <Text
                  color={
                    item.disabled
                      ? theme.colors.mutedForeground
                      : theme.colors.foreground
                  }
                >
                  {item.icon}
                </Text>
              )}
              <Text
                color={
                  item.disabled
                    ? theme.colors.mutedForeground
                    : isFocused
                      ? theme.colors.primary
                      : theme.colors.foreground
                }
                bold={isFocused && !item.disabled}
                dimColor={item.disabled}
              >
                {item.label}
              </Text>
              {item.children && item.children.length > 0 && (
                <Text color={theme.colors.mutedForeground}>›</Text>
              )}
            </Box>
            {item.shortcut && (
              <Text color={theme.colors.mutedForeground}>{item.shortcut}</Text>
            )}
          </Box>
        );
      })}
    </Box>
  );
};
