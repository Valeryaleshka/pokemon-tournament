import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node
      }
    },
    rules: {
      // Basic spacing rules for imports
      "object-curly-spacing": ["error", "always"],
      "keyword-spacing": ["error", { "before": true, "after": true }],

      // Newline before return statements
      "padding-line-between-statements": [
        "error",
        { "blankLine": "always", "prev": "*", "next": "return" }
      ]
    }
  },
  ...tseslint.configs.recommended
]);
