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
        fetch: {
          isBlob: false,
        },
      },
    },
    hooks: {
      // optional hooks e.g. after generation
    },
    override: {
      mutator: {
        path: "./src/lib/orval-fetcher.ts",
        name: "orvalFetcher",
      },
    },
  },
});
