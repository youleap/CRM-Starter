module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    // "plugin:react-hooks/recommended", - already comes from next.js config
    "plugin:i18n-prefix/recommended",
    "plugin:react-hook-form/recommended",
    // "plugin:i18next/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:import/react",
    "plugin:jsx-a11y/recommended",
    "plugin:testing-library/react",
    "next/core-web-vitals",
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  // plugins: ["@naturacosmeticos/i18n-checker"],
  rules: {
    // /**
    //  * This will error if `t` function called with a translation key
    //  * that does not exist in translation files
    //  */
    // "@naturacosmeticos/i18n-checker/path-in-locales": [
    //   "error",
    //   {
    //     localesPath: "locales/en/",
    //     translationFunctionName: "t",
    //   },
    // ],

    // "i18n-prefix/i18n-prefix": [
    //   "error",
    //   {
    //     translationFunctionName: "t",
    //     delimiter: ".",
    //     ignorePrefixes: ["enum"],
    //   },
    // ],

    // use ternary operator (? :) instead of logical operator (&& ||) in jsx
    // https://github.com/Nozbe/eslint-plugin-nozbe
    // "@nozbe/nozbe/no-jsx-andand": 2,

    //#region react
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md
    "react/jsx-sort-props": [
      "error",
      {
        callbacksLast: true,
        shorthandFirst: true,
        // "shorthandLast": <boolean>,
        // "ignoreCase": <boolean>,
        noSortAlphabetically: true,
        reservedFirst: true,
      },
    ],
    "react/no-array-index-key": 2,
    "react/no-invalid-html-attribute": 2,
    "react/button-has-type": 2,
    // "react/no-unstable-nested-components": 2, // TODO: error and verify
    "react/self-closing-comp": 2,
    "react/jsx-key": [
      1,
      {
        checkFragmentShorthand: true,
        checkKeyMustBeforeSpread: true,
        warnOnDuplicates: true,
      },
    ],
    "react/style-prop-object": 2,
    "react/void-dom-elements-no-children": 2,
    "react/display-name": 0,
    "react/prop-types": 0,
    "react/jsx-pascal-case": [
      2,
      {
        allowLeadingUnderscore: true,
        allowNamespace: true,
      },
    ],
    "react/jsx-no-constructed-context-values": 2,
    "react/jsx-no-useless-fragment": 2,
    "react/jsx-handler-names": 2,
    "react/jsx-no-duplicate-props": 2,
    "react/jsx-curly-brace-presence": [
      2,
      { props: "never", children: "never", propElementValues: "always" },
    ],

    "react/function-component-definition": [
      "warn",
      { namedComponents: "function-declaration" },
    ],

    "react/forbid-component-props": [
      "off", // too strict
      {
        forbid: [
          {
            propName: "style",
            // message: "Avoid using style prop",
          },
          "className",
        ],
      },
    ],

    // "react/boolean-prop-naming": ["error", { "rule": "^(is|has)[A-Z]([A-Za-z0-9]?)+|disabled|open" }]
    "react/forbid-elements": ["warn", { forbid: [{ element: "a" }] }], // use next.js Link instead
    // "react/hook-use-state": "warn", // TODO: error and verify
    "react/iframe-missing-sandbox": "error",
    "react/jsx-boolean-value": ["warn", "never"],
    // "react/jsx-filename-extension": [
    //   "warn",
    //   { allow: "as-needed", extensions: [".tsx", ".jsx"] },
    // ], // TODO: error and verify
    "react/jsx-fragments": ["warn", "syntax"],
    // "react/jsx-max-depth": ["warn", { max: 30 }],
    "react/jsx-no-comment-textnodes": "warn",
    "react/jsx-no-leaked-render": ["error", { validStrategies: ["ternary"] }],
    // // Good for i18n only
    "react/jsx-no-literals": [
      // Too strict, may be useful for i18n
      "off",
      {
        noStrings: true,
        allowedStrings: [],
        ignoreProps: true,
        noAttributeStrings: false,
      },
    ],
    "react/jsx-no-script-url": "error",
    "react/jsx-no-target-blank": "error",
    "react/jsx-no-undef": "error",
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-sort-props.md,
    "react/jsx-uses-vars": "error",
    "react/no-children-prop": "error",
    "react/no-danger-with-children": "error",
    "react/no-danger": "error",
    "react/no-namespace": "error",
    "react/no-unescaped-entities": "error",
    "react/no-unknown-property": "error",

    // As of React 16.14 and 17
    // https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html#eslint
    // "react/react-in-jsx-scope": 0,
    // "react/jsx-uses-react": 0,

    //#endregion react

    // @see https://github.com/vercel/next.js/blob/canary/packages/eslint-config-next/index.js
    //#region jsx-a11y from nextjs eslint config
    "jsx-a11y/alt-text": [
      "warn",
      {
        elements: ["img"],
        img: ["Image"],
      },
    ],
    "jsx-a11y/aria-props": "warn",
    "jsx-a11y/aria-proptypes": "warn",
    "jsx-a11y/aria-unsupported-elements": "warn",
    "jsx-a11y/role-has-required-aria-props": "warn",
    "jsx-a11y/role-supports-aria-props": "warn",

    //#endregion jsx-a11y from nextjs eslint config
  },
  overrides: [
    {
      files: "_app.tsx",
      rules: {
        "react/function-component-definition": "off",
      },
    },
    {
      files: "**.stories.tsx",
      rules: {
        // "i18next/no-literal-string": "off",
      },
    },
  ],
};
