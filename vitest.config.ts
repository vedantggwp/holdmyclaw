import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["packages/**/*.test.ts"],
    coverage: { provider: "v8", reporter: ["text"], include: ["packages/core/src/**/*.ts"], exclude: ["**/*.test.ts", "**/types.ts"] },
  },
  resolve: {
    alias: {
      "@holdmyclaw/core": resolve(__dirname, "packages/core/src/index.ts"),
    },
  },
});
