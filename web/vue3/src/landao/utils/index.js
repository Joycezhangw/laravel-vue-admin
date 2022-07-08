
import CryptoJS from "./crypto";
import storage from "./storage";
import { isObject } from "lodash-es";
export { CryptoJS, storage }
/**
 * 跳转
 * @param {string} path 地址
 * @param {Boolean} newWindow 是否打开新窗口
 * @returns 
 */
export function href(path, newWindow = false) {
    const { origin, pathname } = window.location;

    if (pathname == path) {
        return false;
    }

    let url = "";

    if (app.router.mode == "history") {
        url = origin + import.meta.env.VITE_APP_HOST + path.substr(1);
    } else {
        url = origin + import.meta.env.VITE_APP_HOST + "#" + path;
    }

    if (newWindow) {
        window.open(url);
    } else {
        window.location.href = url;
    }
}
/**
 * 浏览器信息
 * @returns 
 */
export function getBrowser() {
    const { clientHeight, clientWidth } = document.documentElement;

    // 浏览器信息
    const ua = navigator.userAgent.toLowerCase();

    // 浏览器类型
    let type = (ua.match(/firefox|chrome|safari|opera/g) || "other")[0];

    if ((ua.match(/msie|trident/g) || [])[0]) {
        type = "msie";
    }

    // 平台标签
    let tag = "";

    const isTocuh =
        "ontouchstart" in window || ua.indexOf("touch") !== -1 || ua.indexOf("mobile") !== -1;
    if (isTocuh) {
        if (ua.indexOf("ipad") !== -1) {
            tag = "pad";
        } else if (ua.indexOf("mobile") !== -1) {
            tag = "mobile";
        } else if (ua.indexOf("android") !== -1) {
            tag = "androidPad";
        } else {
            tag = "pc";
        }
    } else {
        tag = "pc";
    }

    // 浏览器内核
    let prefix = "";

    switch (type) {
        case "chrome":
        case "safari":
        case "mobile":
            prefix = "webkit";
            break;
        case "msie":
            prefix = "ms";
            break;
        case "firefox":
            prefix = "Moz";
            break;
        case "opera":
            prefix = "O";
            break;
        default:
            prefix = "webkit";
            break;
    }

    // 操作平台
    const plat = ua.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();

    // 屏幕信息
    let screen = "full";

    if (clientWidth < 768) {
        screen = "xs";
    } else if (clientWidth < 992) {
        screen = "sm";
    } else if (clientWidth < 1200) {
        screen = "md";
    } else if (clientWidth < 1920) {
        screen = "xl";
    } else {
        screen = "full";
    }

    // 是否 ios
    const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

    // 浏览器版本
    const version = (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];

    // 是否 PC 端
    const isPC = tag === "pc";

    // 是否移动端
    const isMobile = isPC ? false : true;

    // 是否移动端 + 屏幕宽过小
    const isMini = screen === "xs" || isMobile;

    return {
        height: clientHeight,
        width: clientWidth,
        version,
        type,
        plat,
        tag,
        prefix,
        isMobile,
        isIOS,
        isPC,
        isMini,
        screen
    };
}

export function orderBy(list, key) {
    return list.sort((a, b) => a[key] - b[key]);
}
/**
 * 转树形菜单
 * @param {Array} list 一维原始数据
 * @param {String} nodeKey 主键id
 * @param {String} pKey  父级id
 * @param {String} order 排序key
 * @returns 
 */
export function deepTree(list, nodeKey = 'menuId', pKey = 'parentId', order = 'menuOrder') {
    let newList = [], map = {};
    list.forEach((e) => (map[e[nodeKey]] = e));

    list.forEach((e) => {
        let parent = map[e[pKey]];

        if (parent) {
            (parent.children || (parent.children = [])).push(e);
        } else {
            newList.push(e);
        }
    });

    const fn = (list) => {
        list.map((e) => {
            if (e.children instanceof Array) {
                e.children = orderBy(e.children, order);

                fn(e.children);
            }
        });
    };

    fn(newList);

    return orderBy(newList, order);
}

//深度合并
export function deepMerge(src = {}, target = {}) {
    let key = ''
    for (key in target) {
        src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
    }
    return src
}
/**
 * 路径名称
 * @param {*} path 路径
 * @returns 
 */
export function basename(path) {
    let index = path.lastIndexOf("/");
    index = index > -1 ? index : path.lastIndexOf("\\");
    if (index < 0) {
        return path;
    }
    return path.substring(index + 1);
}