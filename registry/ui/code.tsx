import { Box, Text } from "ink";
import React from "react";

import { useTheme } from "@/components/ui/theme-provider";

export interface CodeProps {
  children: string;
  language?: string;
  inline?: boolean;
  /** Border style. Default: 'single' */
  borderStyle?:
    | "single"
    | "double"
    | "round"
    | "bold"
    | "singleDouble"
    | "doubleSingle"
    | "classic";
  /** Whether to show line numbers. Default: true */
  showLineNumbers?: boolean;
  /** Line number separator string. Default: '│ ' */
  lineNumberSeparator?: string;
  /** Override color for keyword tokens. Default: theme.colors.accent */
  keywordColor?: string;
  /** Override color for string tokens. Default: theme.colors.success */
  stringColor?: string;
  /** Override color for number tokens. Default: theme.colors.warning */
  numberColor?: string;
  /** Override color for comment tokens. Default: theme.colors.mutedForeground */
  commentColor?: string;
  /** Override color for operator tokens. Default: theme.colors.info */
  operatorColor?: string;
  /** Override color for plain tokens. Default: theme.colors.foreground */
  plainColor?: string;
}

const KEYWORDS = new Set([
  "const",
  "let",
  "var",
  "function",
  "return",
  "if",
  "else",
  "import",
  "export",
  "from",
  "class",
  "interface",
  "type",
  "async",
  "await",
  "new",
  "this",
  "true",
  "false",
  "null",
  "undefined",
  "void",
  "typeof",
  "instanceof",
  "in",
  "of",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "break",
  "continue",
  "try",
  "catch",
  "finally",
  "throw",
  "extends",
  "implements",
  "static",
  "public",
  "private",
  "protected",
  "readonly",
  "enum",
  "default",
  "delete",
  "yield",
  "super",
]);

const OPERATORS = /^[=+\-*/<>!&|?%^~]+$/;

interface Token {
  text: string;
  kind: "keyword" | "string" | "number" | "comment" | "operator" | "plain";
}

const tokenizeLine = function tokenizeLine(line: string): Token[] {
  // Handle full-line comments
  const trimmed = line.trimStart();
  if (trimmed.startsWith("//")) {
    return [{ kind: "comment", text: line }];
  }

  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    // Inline comment
    if (line[i] === "/" && line[i + 1] === "/") {
      tokens.push({ kind: "comment", text: line.slice(i) });
      break;
    }

    // String literals
    const quote = line[i];
    if (quote === '"' || quote === "'" || quote === "`") {
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === "\\") {
          j += 1;
          // skip escaped char
        }
        j += 1;
      }
      // include closing quote
      j += 1;
      tokens.push({ kind: "string", text: line.slice(i, j) });
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[0-9._xXa-fA-FbBoO]/.test(line[j])) {
        j += 1;
      }
      tokens.push({ kind: "number", text: line.slice(i, j) });
      i = j;
      continue;
    }

    // Identifiers / keywords
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) {
        j += 1;
      }
      const word = line.slice(i, j);
      tokens.push({
        kind: KEYWORDS.has(word) ? "keyword" : "plain",
        text: word,
      });
      i = j;
      continue;
    }

    // Operators
    if (/[=+\-*/<>!&|?%^~]/.test(line[i])) {
      let j = i;
      while (j < line.length && OPERATORS.test(line[j])) {
        j += 1;
      }
      tokens.push({ kind: "operator", text: line.slice(i, j) });
      i = j;
      continue;
    }

    // Everything else — whitespace, punctuation
    tokens.push({ kind: "plain", text: line[i] });
    i += 1;
  }

  return tokens;
};

const CodeLine = function CodeLine({
  line,
  keywordColor,
  stringColor,
  numberColor,
  commentColor: _commentColor,
  operatorColor,
  plainColor,
}: {
  line: string;
  keywordColor: string;
  stringColor: string;
  numberColor: string;
  commentColor: string;
  operatorColor: string;
  plainColor: string;
}) {
  const tokens = tokenizeLine(line);

  return (
    <Box flexDirection="row">
      {tokens.map((token, idx) => {
        switch (token.kind) {
          case "keyword": {
            return (
              <Text key={idx} color={keywordColor}>
                {token.text}
              </Text>
            );
          }
          case "string": {
            return (
              <Text key={idx} color={stringColor}>
                {token.text}
              </Text>
            );
          }
          case "number": {
            return (
              <Text key={idx} color={numberColor}>
                {token.text}
              </Text>
            );
          }
          case "comment": {
            return (
              <Text key={idx} dimColor>
                {token.text}
              </Text>
            );
          }
          case "operator": {
            return (
              <Text key={idx} color={operatorColor}>
                {token.text}
              </Text>
            );
          }
          default: {
            return (
              <Text key={idx} color={plainColor}>
                {token.text}
              </Text>
            );
          }
        }
      })}
    </Box>
  );
};

export const Code = function Code({
  children,
  language,
  inline = false,
  borderStyle = "single",
  showLineNumbers = true,
  lineNumberSeparator = "│ ",
  keywordColor: keywordColorProp,
  stringColor: stringColorProp,
  numberColor: numberColorProp,
  commentColor: commentColorProp,
  operatorColor: operatorColorProp,
  plainColor: plainColorProp,
}: CodeProps) {
  const theme = useTheme();

  const keywordColor = keywordColorProp ?? theme.colors.accent;
  const stringColor = stringColorProp ?? theme.colors.success;
  const numberColor = numberColorProp ?? theme.colors.warning;
  const commentColor = commentColorProp ?? theme.colors.mutedForeground;
  const operatorColor = operatorColorProp ?? theme.colors.info;
  const plainColor = plainColorProp ?? theme.colors.foreground;

  const lines = children.split("\n");

  if (inline) {
    // Inline: single line, no border, no line numbers
    const displayLine = lines[0] ?? "";
    return (
      <Box
        borderStyle={borderStyle}
        borderColor={theme.colors.border}
        paddingX={1}
      >
        <CodeLine
          line={displayLine}
          keywordColor={keywordColor}
          stringColor={stringColor}
          numberColor={numberColor}
          commentColor={commentColor}
          operatorColor={operatorColor}
          plainColor={plainColor}
        />
      </Box>
    );
  }

  const lineNumberWidth = String(lines.length).length;

  return (
    <Box
      flexDirection="column"
      borderStyle={borderStyle}
      borderColor={theme.colors.border}
    >
      {language && (
        <Box justifyContent="flex-end" paddingX={1}>
          <Text color={theme.colors.mutedForeground}>{language}</Text>
        </Box>
      )}
      {lines.map((line, idx) => (
        <Box key={idx} flexDirection="row" paddingX={1}>
          {showLineNumbers && (
            <>
              <Text color={theme.colors.mutedForeground}>
                {String(idx + 1).padStart(lineNumberWidth, " ")}{" "}
              </Text>
              <Text color={theme.colors.mutedForeground}>
                {lineNumberSeparator}
              </Text>
            </>
          )}
          <CodeLine
            line={line}
            keywordColor={keywordColor}
            stringColor={stringColor}
            numberColor={numberColor}
            commentColor={commentColor}
            operatorColor={operatorColor}
            plainColor={plainColor}
          />
        </Box>
      ))}
    </Box>
  );
};
