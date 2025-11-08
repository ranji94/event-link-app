// orval.config.ts
import { defineConfig } from "orval";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const USE_PROXY = process.env.NEXT_PUBLIC_USE_PROXY === "true";

// skąd Orval ma pobrać /api-json przy generowaniu (zawsze absolutny backend!)
const ORVAL_API_URL =
  process.env.ORVAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4010";

// jakiej bazy użyje wygenerowany klient w runtime (zgodne z fetcherem)
const RUNTIME_BASE_URL = USE_PROXY
  ? "/api"
  : process.env.NEXT_PUBLIC_API_URL || "http://localhost:4010";

export default defineConfig({
  eventlink: {
    input: `${ORVAL_API_URL.replace(/\/+$/, "")}/api-json`,
    output: {
      target: "./src/entities/api.gen.ts",
      client: "fetch",
      mode: "tags",
      override: {
        fetch: { isBlob: false },
        baseUrl: RUNTIME_BASE_URL, // ⬅️ ważne
        mutator: {
          path: "./src/lib/orval-fetcher.ts",
          name: "orvalFetcher",
        },
      },
    },
  },
});
