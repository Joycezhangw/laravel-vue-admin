import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import importToCDN from 'vite-plugin-cdn-import'

import { createHtmlPlugin } from "vite-plugin-html";

import path from 'path'

//当前执行node命令时文件夹的地址（工作目录）
const root = process.cwd();
/**
 * 路径查找
 * @param {*} dir 
 * @returns 
 */
function resolve(dir) {
  return path.resolve(__dirname, ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const { VITE_PORT, VITE_IS_IMPORT_TO_CDN, VITE_APP_TITLE } = loadEnv(mode, root);
  //cdn配置
  const buildImportToCNDConf = require(resolve('./importToCDN.config.js'));
  return {
    plugins: [
      vue(),
      importToCDN({
        modules: parseInt(VITE_IS_IMPORT_TO_CDN) === 1 ? buildImportToCNDConf.cdns : []
      }),
      createHtmlPlugin({
        inject: {//需要注入 index.html ejs 模版的数据
          data: {
            appTitle: VITE_APP_TITLE,
          },
        },
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          charset: false
        }
      }
    },
    resolve: {
      alias: {
        '~': resolve('/'),
        '@': resolve('src')
      }
    },
    server: {
      //是否开启https
      https: false,
      //端口
      port: VITE_PORT,
      //服务启动时是否自动打开浏览器
      open: true,
      sourcemap: false,
      polyfillDynamicImport: false // 必须为false
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
  }
})