import { resolve } from "node:path";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "."),
    },
  },
  test: {
    environment: "node",
    globals: true,
    include: ["registry/**/__tests__/**/*.test.{ts,tsx}"],
  },
});
