const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api1",
        createProxyMiddleware({
            target: "http://localhost:5555",
            changeOrigin: true,
            pathRewrite: {
                "^/api1": "quotes",
            },
        })
    );

    app.use(
        "/api2",
        createProxyMiddleware({
            target: "http://localhost:5555",
            changeOrigin: true,
            pathRewrite: {
                "^/api2": "memes",
            },
        })
    );
};
