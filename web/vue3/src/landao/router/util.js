import { isArray,cloneDeep } from "lodash";
import { router } from "./index";

/**
 * 获取目录下的 .vue、.tsx 全部文件
 * @method import.meta.globEager
 */
const viewsModules = import.meta.globEager("@/views/**/*.{vue,tsx}");

/**
 * 路由多级嵌套数组处理成一维数组
 * @param arr 传入路由菜单数据数组
 * @returns 返回处理后的一维路由菜单数组
 */
 export function formatFlatteningRoutes(arr) {;
	if (arr.length <= 0) return false;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].children) {
			arr = arr.slice(0, i + 1).concat(arr[i].children, arr.slice(i + 1));
		}
	}
	return arr;
}

/**
 * 将后端获取的动态路由添加到 Layout 中
 * @param {*} routeList 
 */
export function addViews(routeList) {
    const list = isArray(routeList) ? routeList : [routeList];
    list.forEach(element => {
        const item = cloneDeep(element);
        if(!item.component){
            let url = item.component;
            if (url) {
				if (
					/^(http[s]?:\/\/)([0-9a-z.]+)(:[0-9]+)?([/0-9a-z.]+)?(\?[0-9a-z&=]+)?(#[0-9-a-z]+)?/i.test(
						url
					)
				) {
					item.meta.iframeUrl = url;
					item.component = () => url;
				} else {
					item.component = () => Promise.resolve(viewsModules[url]);
				}
			} else {
				item.redirect = "/404";
			}
        }
		//批量添加路由
        router.addRoute("Layout",item)
    });
}