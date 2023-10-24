const eslintNoRestrictedImportsPatterns = [
  {
    group: ["**/dist/**"],
    message: "dist import does not allowed",
  },
  {
    group: ["@youleap/*/*"],
    message: "import should be from root package",
  },
  {
    group: ["next/route"],
    message: "import from next/navigation because we use next 13 app directory",
  },
];

module.exports = {
  parser: "@typescript-eslint/parser",
  extends: ["./common/react", "./base"],
  rules: {
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        patterns: [
          ...eslintNoRestrictedImportsPatterns,
          // {
          //   group: ["@radix-ui/*"],
          //   message: "import should be from @/ui",
          // },
        ],
      },
    ],
    "import/no-namespace": ["error", { ignore: ["@radix-ui/*", "react"] }],

    "no-alert": "off", // ui - temporary
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "(useUpdateEffect)",
      },
    ],
  },
  overrides: [
    {
      // Frontend i18n
      files: ["**/locales/**/*.json"],
      extends: ["./common/i18n"],
    },
    {
      files: "static-paths.d.ts",
      rules: {
        "eslint-comments/disable-enable-pair": "off",
        "eslint-comments/no-unlimited-disable": "off",
        "unicorn/no-abusive-eslint-disable": "off",
      },
    },
    {
      // Next.js App directory
      files: ["**/src/app/**/*.tsx", "**/src/middleware.ts"],
      rules: {
        "import/no-unused-modules": "off",
        "import/no-default-export": "off",
      },
    },
    {
      // Frontend UI
      files: ["**/src/ui/**/*.ts?(x)"],
      rules: {
        "@typescript-eslint/no-restricted-imports": [
          "error",
          {
            patterns: eslintNoRestrictedImportsPatterns,
          },
        ],
      },
    },
    {
      // Storybook stories
      files: ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
      extends: ["./common/storybook"],
      rules: {
        "import/no-unused-modules": "off",
        "import/no-default-export": "off",
      },
    },
  ],
};
