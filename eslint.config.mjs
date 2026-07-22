import antfu from "@antfu/eslint-config";
// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  antfu(
    {
      type: "app",
      vue: true,
      typescript: true,
      formatters: true,
      tailwind: true,
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
      ignores: ["pnpm-store/**", "**/migration/*", ".nuxt/**", ".output/**", "dist/**", "node_modules/**", "*.db*"],
    },
    {
      rules: {
        "vue/max-attributes-per-line": ["error", {
          singleline: {
            max: 2,
          },
          multiline: {
            max: 1,
          },
        }],
        "ts/no-redeclare": "off",
        "ts/consistent-type-definitions": ["error", "type"],
        "no-console": ["warn"],
        "antfu/no-top-level-await": ["off"],
        "node/prefer-global/process": ["off"],
        "perfectionist/sort-imports": ["error"],
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              kebabCase: true,
              pascalCase: true,
            },
            ignore: ["README.md"],
          },
        ],
      },
    },
  ),
);
