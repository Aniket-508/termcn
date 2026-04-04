import { Box, Text } from "ink-web";

import { useTheme } from "@/components/ui/theme-provider";

export interface GitStatusProps {
  branch: string;
  staged?: number;
  modified?: number;
  ahead?: number;
  behind?: number;
}

/** Presentational git summary line; pair with a custom `useGit` hook or git porcelain parsing. */
export const GitStatus = function GitStatus({
  branch,
  staged = 0,
  modified = 0,
  ahead = 0,
  behind = 0,
}: GitStatusProps) {
  const theme = useTheme();
  return (
    <Box flexDirection="column" gap={0}>
      <Text color={theme.colors.primary}>
        <Text bold>Branch </Text>
        {branch}
      </Text>
      <Text color={theme.colors.mutedForeground}>
        {ahead}↑ {behind}↓ · staged {staged} · modified {modified}
      </Text>
    </Box>
  );
};
