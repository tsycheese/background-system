module.exports = {
  presets: ['@babel/preset-env', '@vue/babel-preset-app'],
  env: {
    development: {
      plugins: ['dynamic-import-node']
    }
  }
}
