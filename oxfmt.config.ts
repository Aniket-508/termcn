import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  arrowParens: "always",
  bracketSameLine: false,
  bracketSpacing: true,
  endOfLine: "lf",
  experimentalSortImports: {
    ignoreCase: true,
    newlinesBetween: true,
    order: "asc",
  },
  experimentalSortPackageJson: true,
  extends: [ultracite],
  ignorePatterns: [
    "public/r/**",
    ".agents/**",
    ".cursor/**",
    ".changeset/**",
    ".claude/**",
    ".web-kits/**",
    "audio/**",
  ],
  jsxSingleQuote: false,
  printWidth: 80,
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
});
