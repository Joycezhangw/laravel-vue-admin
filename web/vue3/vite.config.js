import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import importToCDN from 'vite-plugin-cdn-import'
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
export default defineConfig(({ mode }) => {
  const { VITE_PORT } = loadEnv(mode, root);
  console.log(VITE_PORT)

  return {
    plugins: [
      vue(),
      importToCDN({
        modules: [
          {
            name: 'vue',
            var: 'Vue',
            path: "https://unpkg.com/vue@3.2.33/dist/vue.runtime.global.prod.js"
          },
          {
            name: 'element-plus',
            var: 'ElementPlus',
            path: '//unpkg.com/element-plus',
            css: '//unpkg.com/element-plus/dist/index.css'
          }
        ],
      }),
    ],
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
      open: true
    }
  }
})