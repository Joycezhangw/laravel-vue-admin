import { defineConfig, loadEnv } from 'vite'
import createVitePlugins from './vite/plugins'
import { wrapperEnv } from './vite'
import { createProxy } from './vite/server/proxy'
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
  //获取到的全部都是string配置，node无法识别其他类型配置，比如 Array | Bool
  const env = loadEnv(mode, root);
  //将env转化成node可识别的配置
  const viteEnv = wrapperEnv(env)
  const isBuild = command === 'build';

  const { VITE_PORT, VITE_PROXY } = viteEnv;


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
      },
      extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    server: {
      //是否开启https
      https: false,
      //端口
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
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