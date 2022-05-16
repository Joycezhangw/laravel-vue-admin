import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'
import { wrapperEnv } from './vite'
import path from 'path'


/**
 * 路径查找
 * @param {*} dir 
 * @returns 
 */
function resolve(dir) {
  return path.resolve(__dirname, ".", dir);
}
export default defineConfig(async ({ mode, command }) => {
  //当前执行node命令时文件夹的地址（工作目录）
  const root = process.cwd();
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)
  const isBuild = command === 'build';
  const { VITE_PORT } = env;
  return {
    plugins: createVitePlugins(viteEnv, isBuild),
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