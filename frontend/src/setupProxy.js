const { createProxyMiddleware } = require("http-proxy-middleware");
const dotenv = require("dotenv").config();
const backendPort = process.env.REACT_APP_BACKEND_PORT || 3001;

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `http://localhost:${backendPort}`,
      changeOrigin: true,
    })
  );
};
