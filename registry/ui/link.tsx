import { Box, Text } from "ink";
import type { ReactNode } from "react";

import { useTheme } from "@/components/ui/theme-provider";

export interface LinkProps {
  children: ReactNode;
  href: string;
  color?: string;
  showHref?: boolean;
}

export const Link = function Link({
  children,
  href,
  color,
  showHref = false,
}: LinkProps) {
  const theme = useTheme();
  const resolvedColor = color ?? theme.colors.info;

  return (
    <Box flexDirection="row">
      <Text color={resolvedColor} underline>
        {children}
      </Text>
      {showHref && <Text dimColor>{` (${href})`}</Text>}
    </Box>
  );
};
