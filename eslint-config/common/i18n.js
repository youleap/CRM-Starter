const path = require("node:path");

module.exports = {
  extends: ["plugin:i18n-json/recommended"],
  rules: {
    "i18n-json/valid-message-syntax": [
      "error",
      {
        // based on https://github.com/Brainicism/KMQ_Discord/blob/6f3f8cf70b93151b86602c5d87e55c5aad18c928/.eslintrc.i18n.js
        syntax: path.resolve(__dirname, "./_i18next-syntax-validator.js"),
      },
    ],
  },
};
