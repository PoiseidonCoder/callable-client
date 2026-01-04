import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    files: ["**/*.tsx"],
    rules: {
      "react/jsx-no-literals": [
        "error",
        {
          noStrings: true,
          allowedStrings: [" ", "-", ":", "•"],
          ignoreProps: true,
        },
      ],
    },
  },

  {
    files: ["fix-tailwind-class.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },

  {
    plugins: {
      "unused-imports": unusedImports,
    },

    rules: {
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": ["warn", { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }],
    },
  },
  {
    ignores: ["components/ui/**"],
  },

  globalIgnores([".next/**", "out/**", "build/**", "messages/**", "next-env.d.ts"]),
]);

export default eslintConfig;
