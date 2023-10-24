module.exports = {
  extends: ["./base"],
  rules: {
    "@typescript-eslint/no-extraneous-class": "off", // nestjs classes ["error", { allowWithDecorator: true }],
    "@typescript-eslint/no-parameter-properties": "off", // nestjs public private modifiers params
    "@typescript-eslint/no-inferrable-types": "off", // nestjs CannotDetermineTypeError: Cannot determine a type
    "unicorn/no-negated-condition": "off",
  },
  overrides: [
    {
      files: ["**/src/**/*.ts"],
      rules: {
        "unicorn/prefer-top-level-await": "off",
        "import/no-cycle": "off",
        "max-params": "off", // nestjs need to pass params in constructor
        "import/no-nodejs-modules": "off",
      },
    },
    {
      files: ["**/src/**/*.controller.ts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": "error",
      },
    },
  ],
};
