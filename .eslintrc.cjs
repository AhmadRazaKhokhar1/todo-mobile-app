module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["node_modules/", ".expo/", "babel.config.js"],
  rules: {
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
};
