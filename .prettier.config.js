module.exports = {
  semi: true,
  singleQuote: true,
  trailingComma: "all",
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  plugins: ["prettier-plugin-organize-imports"],
  organizeImports: true,
  importOrder: [
    "^@angular/(.*)$",
    "^@nestjs/(.*)$",
    "^@(.*)$",
    "^[a-z]",
    "^~/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  overrides: [
    {
      files: "*.html",
      options: {
        parser: "angular",
        htmlWhitespaceSensitivity: "css",
      },
    },
  ],
};
