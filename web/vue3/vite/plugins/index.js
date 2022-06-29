import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import createHtml from './html'
import createImportToCDN from './importToCDN';
import { svgBuilder } from './svgBuilder';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [
        vue(),
        vueJsx(),
        svgBuilder("./src/icons/svg/"),//全局导入svg
        AutoImport({//自动按需导入
            resolvers: [ElementPlusResolver()],
        }),
        Components({//自动按需导入
            resolvers: [ElementPlusResolver()],
        }),
    ];
    vitePlugins.push(createHtml(viteEnv, isBuild))
    vitePlugins.push(createImportToCDN(viteEnv))

    return vitePlugins;
}