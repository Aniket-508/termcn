import { Box, Text } from "ink";

import { useTheme } from "@/components/ui/theme-provider";
import { useAnimation } from "@/hooks/use-animation";

export interface SkeletonProps {
  width?: number;
  height?: number;
  animated?: boolean;
}

export const Skeleton = function Skeleton({
  width = 20,
  height = 1,
  animated = true,
}: SkeletonProps) {
  const theme = useTheme();
  // fps=4 gives slow shimmer; frame increments at ~4 fps
  const frame = useAnimation(4);

  // Offset cycles 0 → width repeatedly
  const offset = animated ? frame % (width + 6) : -1;

  const _buildRow = (): string => {
    let row = "";
    for (let i = 0; i < width; i += 1) {
      const inHighlight = i >= offset - 3 && i <= offset + 3;
      row += inHighlight ? "█" : "░";
    }
    return row;
  };

  const rows = Array.from({ length: height }, (_, rowIndex) => {
    // Stagger each row's shimmer slightly by shifting the offset
    const rowOffset = animated ? (frame + rowIndex * 2) % (width + 6) : -1;
    let row = "";
    for (let i = 0; i < width; i += 1) {
      const inHighlight = i >= rowOffset - 3 && i <= rowOffset + 3;
      row += inHighlight ? "█" : "░";
    }
    return row;
  });

  return (
    <Box flexDirection="column">
      {rows.map((row, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Text key={i}>
          {[...row].map((char, j) => (
            <Text
              // eslint-disable-next-line react/no-array-index-key
              key={j}
              color={
                char === "█" ? theme.colors.mutedForeground : theme.colors.muted
              }
            >
              {char}
            </Text>
          ))}
        </Text>
      ))}
    </Box>
  );
};
