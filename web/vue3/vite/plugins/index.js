import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx";
import createHtml from './html'
import createImportToCDN from './importToCDN';

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = [vue(), vueJsx()];
    vitePlugins.push(createHtml(viteEnv, isBuild))
    vitePlugins.push(createImportToCDN(viteEnv))

    return vitePlugins;
}