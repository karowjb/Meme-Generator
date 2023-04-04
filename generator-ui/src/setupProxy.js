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
    app.use(
        "/api3",
        createProxyMiddleware({
            target: "http://localhost:5555",
            changeOrigin: true,
            pathRewrite: {
                "^/api3": "quotesall",
            },
        })
    );
    app.use(
        "/api4",
        createProxyMiddleware({
            target: "http://localhost:5555",
            changeOrigin: true,
            pathRewrite: {
                "^/api4": "memesall",
            },
        })
    );
    app.use(
        "/api5",
        createProxyMiddleware({
            target: "http://localhost:5555",
            changeOrigin: true,
            pathRewrite: {
                "^/api5": "bucket",
            },
        })
    );
};
