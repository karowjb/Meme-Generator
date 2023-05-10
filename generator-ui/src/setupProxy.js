const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/quotes",
        createProxyMiddleware({
            target: "http://localhost:5555",
            changeOrigin: true,
            pathRewrite: {
                "^/quotes": "quotes",
            },
        })
    );

    app.use(
        "/memes",
        createProxyMiddleware({
            target: "http://localhost:5555",
            changeOrigin: true,
            pathRewrite: {
                "^/memes": "memes",
            },
        })
    );
    app.use(
        "/quotesall",
        createProxyMiddleware({
            target: "http://localhost:5555",
            changeOrigin: true,
            pathRewrite: {
                "^/quotesall": "quotesall",
            },
        })
    );
    app.use(
        "/memesall",
        createProxyMiddleware({
            target: "http://localhost:5555",
            changeOrigin: true,
            pathRewrite: {
                "^/memesall": "memesall",
            },
        })
    );
    app.use(
        "/bucket",
        createProxyMiddleware({
            target: "http://localhost:5555",
            changeOrigin: true,
            pathRewrite: {
                "^/bucket": "bucket",
            },
        })
    );
};
