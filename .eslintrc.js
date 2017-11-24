// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "no-extend-native": 0, // 禁止扩展native对象
    "space-before-function-paren": [0, "always"],// 函数定义时括号前面要不要有空格
    "no-eq-null": 0,//禁止对null使用==或!=运算符
    "no-useless-escape": 0,
    "quotes": [0, "single"]//引号类型 `` "" ''
  }
}
