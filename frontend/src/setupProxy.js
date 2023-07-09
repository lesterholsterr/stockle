const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3001;

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `http://localhost:${port}`,
      changeOrigin: true,
    })
  );
};
