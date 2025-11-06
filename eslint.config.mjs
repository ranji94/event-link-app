import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // 🔥 Usuń automatycznie nieużywane importy
      "unused-imports/no-unused-imports": "error",

      // ⚠️ Ostrzeżenie dla nieużywanych zmiennych (ignoruj zmienne z _)
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // 🚫 Nigdy nie stawiaj średników
      semi: "off",
      "@typescript-eslint/semi": ["error", "never"],

      // (opcjonalnie) wyłącz auto-dodawanie średników przez prettier
      "prettier/prettier": [
        "error",
        {
          semi: false,
        },
      ],
    },
  },
  // 📦 Ignoruj buildy
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
