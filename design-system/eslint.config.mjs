import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [{
  ignores: [
    "node_modules/**",
    "out/**",
    "build/**",
    "public/**",
    ".claude/**",
    "storybook-static/**",
    "analyze-*.js",
  ]
}, ...compat.extends(
  "plugin:storybook/recommended",
), {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: tsparser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  plugins: {
    "@typescript-eslint": tseslint,
  },
  rules: {
    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-unused-vars": ["warn", {
      "argsIgnorePattern": "^_",
      "varsIgnorePattern": "^_"
    }],
  },
}];

export default eslintConfig;
