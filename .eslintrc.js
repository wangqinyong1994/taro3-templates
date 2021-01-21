module.exports = {
  extends: ['taro/react'],
  rules: {
    'import/no-commonjs': [0],
    'jsx-quotes': 0,
    'react/jsx-key': 0,
    'react/sort-comp': 0,
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: 'Taro',
      },
    ],
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'no-restricted-imports': 'off',
    'no-const-assign': 'error',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    project: './jsconfig.json',
  },
  parser: 'babel-eslint',
};
