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
  overrides: [
    {
      files: ["app/components/**/*.{js,jsx}"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["../hooks/*", "app/hooks/*"],
                message: "Components should receive data/actions via props instead of using hooks directly.",
              },
              {
                group: ["../services/*", "app/services/*"],
                message: "Components should not call services directly.",
              },
              {
                group: ["**/firebase.config", "**/firebase.config.*", "firebase.config", "firebase.config.*"],
                message: "Only app/services/* should import firebase.config.*.",
              },
              {
                group: ["firebase", "firebase/*", "@react-native-firebase/*"],
                message: "Firebase SDK access must stay inside app/services/*.",
              },
              {
                group: ["@react-native-async-storage/async-storage"],
                message: "AsyncStorage access must stay inside app/services/*.",
              },
            ],
          },
        ],
      },
    },
    {
      files: ["app/screens/**/*.{js,jsx}"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["../services/*", "app/services/*"],
                message: "Screens should compose hooks instead of calling services directly.",
              },
              {
                group: ["**/firebase.config", "**/firebase.config.*", "firebase.config", "firebase.config.*"],
                message: "Only app/services/* should import firebase.config.*.",
              },
              {
                group: ["firebase", "firebase/*", "@react-native-firebase/*"],
                message: "Firebase SDK access must stay inside app/services/*.",
              },
              {
                group: ["@react-native-async-storage/async-storage"],
                message: "AsyncStorage access must stay inside app/services/*.",
              },
            ],
          },
        ],
      },
    },
    {
      files: ["app/Contexts/**/*.{js,jsx}", "app/hooks/**/*.{js,jsx}", "app/navigation/**/*.{js,jsx}"],
      rules: {
        "no-restricted-imports": [
          "error",
          {
            patterns: [
              {
                group: ["**/firebase.config", "**/firebase.config.*", "firebase.config", "firebase.config.*"],
                message: "Only app/services/* should import firebase.config.*.",
              },
              {
                group: ["firebase", "firebase/*", "@react-native-firebase/*"],
                message: "Firebase SDK access must stay inside app/services/*.",
              },
              {
                group: ["@react-native-async-storage/async-storage"],
                message: "AsyncStorage access must stay inside app/services/*.",
              },
            ],
          },
        ],
      },
    },
  ],
};
