module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './../../tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  extends: ['plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },

  rules: {
    'prettier/prettier': [
      'error',
      {
        filepath: './prettier.config.js',
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',

    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'no-await-in-loop': 'error',

    'no-promise-executor-return': 'error',
    'no-template-curly-in-string': 'error',
    'no-unreachable-loop': 'error',
    'no-unsafe-optional-chaining': 'error',
    'require-atomic-updates': 'error',
    'accessor-pairs': 'error',
    'brace-style': 'error',
    'no-use-before-define': 'off',
    'object-curly-spacing': ['warn', 'always'],

    'import/prefer-default-export': 'off',
    indent: ['off', 2, { SwitchCase: 1 }],
    'no-console': 'off',
    'max-len': ['off', { code: 160 }],
    'no-plusplus': [
      'off',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-case-declarations': 'error',
    '@typescript-eslint/ban-ts-comment': 'off',
  },
}
