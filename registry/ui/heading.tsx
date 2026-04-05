import { Box, Text } from "ink";
import type { ReactNode } from "react";

import { useTheme } from "@/components/ui/theme-provider";

export type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps {
  level?: HeadingLevel;
  children: ReactNode;
  color?: string;
  /** Prefix symbol for level 1 headings. Default: '██ ' */
  prefix1?: string;
  /** Prefix symbol for level 2 headings. Default: '▌ ' */
  prefix2?: string;
  /** Prefix symbol for level 3 headings. Default: '› ' */
  prefix3?: string;
  /** Whether to uppercase level 1 heading text. Default: true */
  uppercase?: boolean;
}

export const Heading = function Heading({
  level = 1,
  children,
  color,
  prefix1 = "██ ",
  prefix2 = "▌ ",
  prefix3 = "› ",
  uppercase = true,
}: HeadingProps) {
  const theme = useTheme();
  const resolvedColor = color ?? theme.colors.primary;

  switch (level) {
    case 1: {
      return (
        <Box>
          <Text color={resolvedColor} bold>
            {prefix1}
          </Text>
          <Text color={resolvedColor} bold>
            {uppercase && typeof children === "string"
              ? children.toUpperCase()
              : children}
          </Text>
        </Box>
      );
    }

    case 2: {
      return (
        <Box>
          <Text color={resolvedColor} bold>
            {prefix2}
          </Text>
          <Text color={resolvedColor} bold>
            {children}
          </Text>
        </Box>
      );
    }

    case 3: {
      return (
        <Box>
          <Text bold>{prefix3}</Text>
          <Text bold>{children}</Text>
        </Box>
      );
    }

    case 4: {
      return (
        <Box>
          <Text underline dimColor>
            {children}
          </Text>
        </Box>
      );
    }

    default: {
      return (
        <Box>
          <Text>{children}</Text>
        </Box>
      );
    }
  }
};
