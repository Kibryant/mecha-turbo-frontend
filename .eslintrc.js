module.exports = {
  extends: ["expo", "prettier", "eslint:recommended"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "import/no-unresolved": "off",
  },
};
