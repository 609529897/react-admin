const { createProxyMiddleware } = require('http-proxy-middleware');//1.0.0版本前都是用proxy,1.0.0后使用porxy会报错,应使用createProxyMiddleware;
module.exports = function (app) {
  app.use(
    createProxyMiddleware(
      '/use',
      {
        target: 'http://rap2.taobao.org:38080/app/mock/259350',
        pathRewrite: { '^/use': '' },
        changeOrigin: true,     // target是域名的话，需要这个参数，
        secure: false,
      }
    ))
};