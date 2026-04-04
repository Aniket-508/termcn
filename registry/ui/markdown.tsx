import { Box, Text } from "ink";
import React from "react";

import { useTheme } from "@/components/ui/theme-provider";

export interface MarkdownProps {
  children: string;
  /** Max width for text wrapping */
  width?: number;
}

interface InlineSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  link?: boolean;
  url?: string;
}

const parseInline = function parseInline(line: string): InlineSegment[] {
  const segments: InlineSegment[] = [];
  // Regex matches: **bold**, *italic*, `code`, [text](url)
  const re = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`|\[(.+?)\]\((.+?)\))/g;
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(line)) !== null) {
    if (match.index > last) {
      segments.push({ text: line.slice(last, match.index) });
    }

    const full = match[0];
    if (full.startsWith("**")) {
      segments.push({ bold: true, text: match[2] });
    } else if (full.startsWith("*")) {
      segments.push({ italic: true, text: match[3] });
    } else if (full.startsWith("`")) {
      segments.push({ code: true, text: match[4] });
    } else if (full.startsWith("[")) {
      segments.push({ link: true, text: match[5], url: match[6] });
    }

    last = match.index + full.length;
  }

  if (last < line.length) {
    segments.push({ text: line.slice(last) });
  }

  return segments;
};

const InlineLine = function InlineLine({
  segments,
}: {
  segments: InlineSegment[];
}) {
  const theme = useTheme();

  return (
    <Box>
      {segments.map((seg, i) => {
        if (seg.code) {
          return (
            <Text key={i} color={theme.colors.accent}>
              {seg.text}
            </Text>
          );
        }
        if (seg.link) {
          return (
            <Box key={i}>
              <Text underline color={theme.colors.info}>
                {seg.text}
              </Text>
              <Text dimColor color={theme.colors.mutedForeground}>
                {" "}
                ({seg.url})
              </Text>
            </Box>
          );
        }
        return (
          <Text key={i} bold={seg.bold} italic={seg.italic}>
            {seg.text}
          </Text>
        );
      })}
    </Box>
  );
};

export const Markdown = function Markdown({ children, width }: MarkdownProps) {
  const theme = useTheme();
  const lines = children.split("\n");

  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Headings
    const h4 = line.match(/^####\s+(.*)/);
    const h3 = line.match(/^###\s+(.*)/);
    const h2 = line.match(/^##\s+(.*)/);
    const h1 = line.match(/^#\s+(.*)/);

    if (h1) {
      elements.push(
        <Text key={i} bold color={theme.colors.primary}>
          {h1[1]}
        </Text>
      );
    } else if (h2) {
      elements.push(
        <Text key={i} bold color={theme.colors.primary}>
          {h2[1]}
        </Text>
      );
    } else if (h3) {
      elements.push(
        <Text key={i} bold color={theme.colors.primary}>
          {h3[1]}
        </Text>
      );
    } else if (h4) {
      elements.push(
        <Text key={i} color={theme.colors.primary}>
          {h4[1]}
        </Text>
      );
    } else if (/^---+$/.test(line)) {
      // Divider
      elements.push(
        <Text key={i} color={theme.colors.border}>
          {"─".repeat(width ?? 40)}
        </Text>
      );
    } else if (/^>\s/.test(line)) {
      // Blockquote
      const content = line.replace(/^>\s/, "");
      elements.push(
        <Box key={i} gap={1}>
          <Text color={theme.colors.primary}>│</Text>
          <InlineLine segments={parseInline(content)} />
        </Box>
      );
    } else if (/^[-*]\s/.test(line)) {
      // Bullet list item
      const content = line.replace(/^[-*]\s/, "");
      elements.push(
        <Box key={i} gap={1}>
          <Text color={theme.colors.mutedForeground}>•</Text>
          <InlineLine segments={parseInline(content)} />
        </Box>
      );
    } else if (line === "") {
      elements.push(<Box key={i} />);
    } else {
      elements.push(
        <Box key={i} flexWrap="wrap" width={width}>
          <InlineLine segments={parseInline(line)} />
        </Box>
      );
    }

    i += 1;
  }

  return <Box flexDirection="column">{elements}</Box>;
};
