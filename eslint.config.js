import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

const reactRules = pluginReact.configs.flat.recommended.rules;

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,      
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
      react: pluginReact,
    },
    rules: {
      ...js.configs.recommended.rules,

      ...reactRules,
      "react/react-in-jsx-scope": "off",  
      "react/prop-types":            "off",
      "react/no-unknown-property": "off",


      "semi":                   ["error", "always"],
      "no-var":                 ["error"],
      "prefer-const":           ["error", { destructuring: "any", ignoreReadBeforeAssign: false }],
      "curly":                  ["error"],
      "eqeqeq":                 ["error"],
      "no-multi-spaces":        ["error"],
      "no-lone-blocks":         ["error"],
      "no-self-compare":        ["error"],
      "no-unused-expressions":  ["error"],
      "no-useless-call":        ["error"],
      "no-use-before-define":   ["error"],
      "camelcase":              ["error", { properties: "never" }],
      "func-call-spacing":      ["error"],
      "no-lonely-if":           ["error"],
      "array-bracket-spacing":  ["error"],
      "no-console":             ["off"],
    },
    settings: {
      react: {
        version: "detect",  
      },
    },
  },
]);
