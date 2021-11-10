const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    const config = {
        apiPrefix: '/manage',
        development: {
            BASE_URL: 'http://www.laravelvue.com',
            MODE: 'development'
        },
        production: {
            BASE_URL: 'http://www.laravelvue.com',
            MODE: 'production'
        }
    }
    const isDev = process.env.NODE_ENV === "development";
    app.use(config.apiPrefix, createProxyMiddleware({
        target: isDev ? config.development.BASE_URL : config.production.BASE_URL,
        changeOrigin: true,
        pathRewrite: { //路径替换
            ['^' + config.apiPrefix]: config.apiPrefix, // axios 访问/api2 == target + /api
        }
    }));

};

// module.exports = function (app) {
//     const isDev = process.env.NODE_ENV === "development";
//     const API_PREFIX = '/manage';
//     app.use(createProxyMiddleware('/manage', {
//         target: 'http://www.laravelvue.com/manage',
//         secure:false,
//         changeOrigin: true,

//     }))
// }