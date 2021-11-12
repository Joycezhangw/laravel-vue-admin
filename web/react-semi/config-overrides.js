const { override, addWebpackAlias, addWebpackResolve } = require("customize-cra");
const { resolve } = require("path");

const path = require("path");

module.exports = override(
    //引用别名配置
    addWebpackAlias({
        "@": path.resolve(__dirname, "src")
    }),
    //导入文件的时候可以不用添加文件的后缀名
    addWebpackResolve({
        extensions:['.js','.jsx','.tsx','.ts','.json']
    }),
)