import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import createHtml from './html'
import createImportToCDN from './importToCDN';
import { svgBuilder } from './svgBuilder';

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [
        vue(),
        vueJsx(),
        svgBuilder("./src/icons/svg/"),//全局导入svg
    ];
    vitePlugins.push(createHtml(viteEnv, isBuild))
    vitePlugins.push(createImportToCDN(viteEnv))

    return vitePlugins;
}