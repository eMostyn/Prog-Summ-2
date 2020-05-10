module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
"ignorePatterns": ["static/sortable-0.8.0/*", "static/packages**","node_modules/"],
  rules: {
	"semi": [2, "always"],
      "indent": "off",
	"no-undef": "off",
"no-return-assign": "off",
"brace-style": ["error", "stroustrup"],
"handle-callback-err": "off",
"no-unused-vars": "off"
  }
}
