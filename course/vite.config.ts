/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { courseApi } from "./server/api.ts";

export default defineConfig({
  plugins: [react(), courseApi()],
  server: { port: 5317 },
  preview: { port: 5318 },
  test: { include: ["tests/**/*.test.ts"] },
});
