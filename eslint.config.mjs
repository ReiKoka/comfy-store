// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "warn",
      "prefer-const": "warn",
      "@/prefer-const": "warn",
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "warn",
    },
  }
);
