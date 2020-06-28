/**
 * @file config-overrides.js
 * @author narigele
 * 基于 customize 和 react-app-rewired 的定制化配置文件
*/

// 从 customize - cra 引入一些相关的方法
const { override,
  addLessLoader,
  fixBabelImports,
  addDecoratorsLegacy
} = require('customize-cra')

const modifyVars = require('./lessVars')

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars
    }
  }),
  addDecoratorsLegacy(),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  })
)