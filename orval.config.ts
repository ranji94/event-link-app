// orval.config.ts
import { defineConfig } from "orval";

export default defineConfig({
  eventlink: {
    input: `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:4010"
    }/api-json`,
    output: {
      target: "./src/entities/api.gen.ts",
      client: "fetch",
      mode: "tags",
      override: {
        fetch: { isBlob: false },
        // (opcjonalnie) również tu:
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4010",
        mutator: {
          path: "./src/lib/orval-fetcher.ts",
          name: "orvalFetcher",
        },
      },
    },
  },
});
