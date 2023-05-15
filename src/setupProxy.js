const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://thesis-production-0069.up.railway.app/',
      changeOrigin: true,
    })
  );
};