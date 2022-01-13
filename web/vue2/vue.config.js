'use strict'
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const path = require('path')
const buildConf = require('./build.config')
const packageConf = require('./package.json')
const isProduction = process.env.NODE_ENV === "production";
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: "/",
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    parallel: require("os").cpus().length > 1,
    css: {
        extract: isProduction,
        sourceMap: false,
        loaderOptions: {
            sass: {
                additionalData: `@import "~@/assets/css/common.scss";`
            }
        }
    },
    devServer: {
        port: process.env.VUE_APP_CLI_PORT,
        open: true,
        compress: false,
        overlay: {
            warnings: false,
            errors: true
        },
        disableHostCheck: true,
        proxy: {
            // 把key的路径代理到target位置
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: { // 需要代理的路径   例如 '/api'
                // target: `${process.env.VUE_APP_BASE_PATH}:${process.env.VUE_APP_SERVER_PORT}/`, // 代理到 目标路径,需要端口号
                target: `${process.env.VUE_APP_BASE_PATH}/`,
                changeOrigin: true,
                pathRewrite: { // 修改路径数据
                    ['^' + process.env.VUE_APP_BASE_API]: process.env.VUE_APP_BASE_API // 举例 '^/api:""' 把路径中的/api字符串删除
                }
            }
        }
    },
    configureWebpack: {
        // @路径走src文件夹
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === "development", config => {
            config.devtool('cheap-source-map')
        })

        // 设置 svg
        config.module.rule("svg").uses.clear();

        config.module
            .rule("svg-sprite-loader")
            .test(/.svg$/)
            .exclude.add(/node_modules/)
            .end()
            .use("svg-sprite-loader")
            .loader("svg-sprite-loader")
            .options({
                symbolId: "[name]"
            });

        // 生产模式下
        if (isProduction) {
            // 去掉元素之间空格
            config.module
                .rule("vue")
                .use("vue-loader")
                .loader("vue-loader")
                .tap(options => {
                    options.compilerOptions.preserveWhitespace = true;
                    return options;
                })
                .end();

            // 移除 prefetch 插件
            config.plugins.delete("prefetch-index");

            // 移除 preload 插件，避免加载多余的资源
            config.plugins.delete("preload-index");

            config.optimization.minimizer("terser").tap(args => {
                // 去掉注释
                args[0].terserOptions.output = {
                    comments: false
                };
                return args;
            });
            // 不打包 begin
            // 1.目前已经测试通过[vue,axios,echarts]可以cdn引用，其它组件测试通过后可继续添加
            // 2.此处添加不打包后，需在public/index.html head中添加相应cdn资源链接
            config.set('externals', buildConf.cdns.reduce((p, a) => {
                p[a.name] = a.scope
                return p
            }, {}))
            // 不打包 end
            config.plugin('html')
                .tap(args => {
                    if (buildConf.title) {
                        args[0].title = buildConf.title
                    }
                    if (buildConf.cdns.length > 0) {
                        args[0].cdns = buildConf.cdns.map(conf => {
                            if (conf.path) {
                                conf.js = `${buildConf.baseCdnUrl}${conf.path}`
                            } else {
                                conf.js = `${buildConf.baseCdnUrl}/${conf.name}/${packageConf.dependencies[conf.name].replace('^', '')}/${conf.name}.min.js`
                            }
                            return conf
                        })
                    }
                    return args
                })
            config
                .plugin('ScriptExtHtmlWebpackPlugin')
                .after('html')
                .use('script-ext-html-webpack-plugin', [{
                    // `runtime` must same as runtimeChunk name. default is `runtime`
                    inline: /single\..*\.js$/
                }])
                .end()
            // 分割模块
            config.optimization.splitChunks({
                chunks: 'all',
                cacheGroups: {
                    libs: {
                        name: 'chunk-libs',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial' // only package third parties that are initially dependent
                    },
                    elementUI: {
                        name: 'chunk-elementUI', // split elementUI into a single package
                        priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                        test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                    },
                    commons: {
                        name: 'chunk-commons',
                        test: resolve('src/components'), // can customize your rules
                        minChunks: 3, //  minimum common number
                        priority: 5,
                        reuseExistingChunk: true
                    }
                }
            });
            config.optimization.runtimeChunk('single')
        }
    },
    configureWebpack: config => {
        // 构建缓存
        config.plugins.push(new HardSourceWebpackPlugin());
    }
}