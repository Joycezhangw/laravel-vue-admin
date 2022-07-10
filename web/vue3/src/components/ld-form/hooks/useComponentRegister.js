import { add } from "../componentMap";
import { tryOnUnmounted } from '@vueuse/core';

/**
 * 注册外部组件
 * @param {*} compName 
 * @param {*} comp 
 */
export function useComponentRegister(compName, comp) {
    add(compName, comp);
    tryOnUnmounted(() => {
        del(compName)
    })
}