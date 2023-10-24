require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: ["./common/recommended", "./common/security", "./common/typescript"],
  rules: {
    "security/detect-object-injection": "off",
    "max-params": ["error"],
    "import/exports-last": "off",
    "import/no-default-export": "error",
    "import/no-nodejs-modules": "error",
    "@typescript-eslint/consistent-type-imports": "off", // later? import type {A} from 'a'
    "@typescript-eslint/no-type-alias": "off", //later?
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["**/dist/**"],
            message: "dist import does not allowed",
          },
          {
            group: ["@youleap/*/*"],
            message: "import should be from root package",
          },
        ],
      },
    ],
    "import/no-namespace": ["error"],
  },
  overrides: [
    {
      // Index files and TypeScript declarations
      files: ["**/*.d.ts", "packages/*/index.ts"],
      rules: {
        "import/no-unused-modules": "off",
      },
    },
  ],
};
