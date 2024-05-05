module.exports = {
  trailingComma: 'all',
  printWidth: 120,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  endOfLine: 'auto',
  arrowParens: 'avoid',
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrder: ['^@nestjs$', '<THIRD_PARTY_MODULES>', '^[src/]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
