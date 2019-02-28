module.exports = {
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "plugin:compat/recommended"],
  env: {
    browser: true,
    node: true,
    es6: true,
    mocha: true,
    jest: true,
    jasmine: true
  },
  globals: {
    APP_TYPE: true,
    page: true
  },
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-useless-escape": 0,
    // "react/jsx-wrap-multilines": 0,
    // "react/no-array-index-key": 0,
    "react/button-has-type": 0,
    "class-methods-use-this": 0,
    "global-require": 0,
    "react/prop-types": 0,
    "no-shadow": 0,
    // "react/forbid-prop-types": 0,
    "react/jsx-one-expression-per-line": 0,
    "array-callback-return": 0,
    "import/no-unresolved": [2, { ignore: ["^@", "^umi/"] }],
    "import/no-extraneous-dependencies": [2, { optionalDependencies: true }],
    // "jsx-a11y/no-noninteractive-element-interactions": 0,
    // "jsx-a11y/click-events-have-key-events": 0,
    // "jsx-a11y/no-static-element-interactions": 0,
    // "jsx-a11y/anchor-is-valid": 0,
    "linebreak-style": 0,
    "no-unused-expressions": 0,
    "no-else-return": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    // "no-nested-ternary": 0,
    // "react/jsx-indent": 0,
    "import/prefer-default-export": 0,
    "no-return-await": 0,
    // "react/destructuring-assignment": 0,
    "prefer-template": 0,
    // "no-param-reassign": 0,
    // "no-unneeded-ternary": 0,
    "no-console": 0
    // "react/no-access-state-in-setstate": 0,
    // "no-unused-vars": 0,
    // "no-plusplus": 0,
    // "react/jsx-boolean-value": 0,
    // "no-return-assign": 0,
    // "no-alert": 0,
    // "react/no-danger": 0,
    // "prefer-arrow-callback": 0,
    // "func-names": 0,
    // "guard-for-in": 0,
    // "no-restricted-syntax": 0,
    // "prefer-destructuring": 0,
    // "object-shorthand": 0,
    // "spaced-comment": 0,
    // "no-var": 0,
    // "no-use-before-define": 0,
    // "no-undef": 0,
    // "vars-on-top": 0
  },
  settings: {
    polyfills: ["fetch", "promises", "url"]
  }
};