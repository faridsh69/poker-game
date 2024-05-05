module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['react-app', 'eslint:recommended'],
  plugins: ['prettier'],
  root: true,
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  // settings: {
  //     'import/resolver': {
  //       typescript: {
  //         alwaysTryTypes: true
  //       }
  //     }
  //   },

  //     rules: {
  //       'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  //       '@typescript-eslint/ban-ts-comment': 'off',
  //       'react-hooks/exhaustive-deps': 'off',
  //     },

  rules: {
    'prettier/prettier': [
      'error',
      {
        filepath: './prettier.config.cjs',
      },
    ],
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

    'react/jsx-key': 'error',
    'react/jsx-props-no-spreading': 'off',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'warn',
    'react/prop-types': 'off',
    indent: ['off', 2, { SwitchCase: 1 }],
    'no-console': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn',
    'max-len': ['off', { code: 160 }],
    'no-plusplus': [
      'off',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-case-declarations': 'warn',
  },
}
