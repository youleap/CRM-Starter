const eslintNoRestrictedImportsPatterns = [
  {
    group: ["**/dist/**"],
    message: "dist import does not allowed",
  },
  {
    group: ["@youleap/*/*"],
    message: "import should be from root package",
  },
];

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["**/tsconfig.json"],
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: ["**/tsconfig.json"],
      },
    },
  },
  extends: [
    "@youleap/eslint-config/recommended",
    "@youleap/eslint-config/security",
    "@youleap/eslint-config/typescript",
  ],
  rules: {
    "security/detect-object-injection": "off",
    "max-params": ["error"],
    "import/exports-last": "off",
    "import/no-default-export": "error",
    "import/no-nodejs-modules": "error",
    "no-alert": "off", // ui - temporary
    "@typescript-eslint/consistent-type-imports": "off", // later? import type {A} from 'a'
    "@typescript-eslint/no-type-alias": "off", //later?
    "@typescript-eslint/no-extraneous-class": "off", // nestjs classes ["error", { allowWithDecorator: true }],
    "@typescript-eslint/no-parameter-properties": "off", // nestjs public private modifiers params
    "@typescript-eslint/no-inferrable-types": "off", // nestjs CannotDetermineTypeError: Cannot determine a type
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        patterns: [
          ...eslintNoRestrictedImportsPatterns,
          {
            group: ["@radix-ui/*"],
            message: "import should be from @/ui",
          },
        ],
      },
    ],
  },
  overrides: [
    {
      // Frontend
      files: ["apps/frontend/**/*.{ts,tsx}"],
      extends: ["@youleap/eslint-config/react"],
      settings: {
        next: {
          rootDir: "apps/frontend",
        },
      },
      parserOptions: {
        project: ["./apps/frontend/tsconfig.json"],
      },
      rules: {
        "import/no-namespace": ["error", { ignore: ["@radix-ui/*"] }],
        "react-hooks/exhaustive-deps": [
          "warn",
          {
            additionalHooks: "(useUpdateEffect)",
          },
        ],
      },
    },
    // Frontend i18n
    {
      files: ["apps/frontend/**/locales/**/*.json"],
      extends: ["@youleap/eslint-config/i18n"],
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
      // Next.js Pages
      files: ["./apps/frontend/src/pages/**/*.tsx"],
      rules: {
        "import/no-unused-modules": "off",
        "import/no-default-export": "off",
        "react/function-component-definition": "off",
      },
    },
    {
      // Frontend UI
      files: ["./apps/frontend/src/ui/**/*.tsx"],
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
      extends: ["@youleap/eslint-config/storybook"],
      rules: {
        "import/no-unused-modules": "off",
        "import/no-default-export": "off",
      },
    },
    {
      // Index files and TypeScript declarations
      files: ["**/*.d.ts", "packages/*/index.ts"],
      rules: {
        "import/no-unused-modules": "off",
      },
    },
    {
      // Package @youleap/code-editor-utils
      files: ["packages/code-editor-utils/**/*.ts"],
      rules: {
        "import/no-nodejs-modules": "off",
      },
    },
    {
      // Template editor-template-react-ts
      files: ["templates/editor-template-react-ts/**"],
      rules: {
        "import/no-default-export": "off",
        "tsdoc/syntax": "off",
      },
    },

    // Backend
    {
      files: ["apps/backend/**/*.ts"],
      rules: {
        "unicorn/prefer-top-level-await": "off",
        "import/no-cycle": "off",
        "max-params": "off", // nestjs need to pass params in constructor
        "import/no-nodejs-modules": "off",
      },
    },
    {
      files: ["apps/backend/**/*.controller.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "error",
      },
    },
  ],
};
