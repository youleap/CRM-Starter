module.exports = {
  extends: [
    "plugin:storybook/recommended",
    "plugin:storybook/addon-interactions",
    "plugin:storybook/csf-strict",
  ],
  overrides: [
    {
      files: ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
      rules: {
        "react/function-component-definition": "off",
      },
    },
  ],
};
