
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
        url = origin + import.meta.env.BASE_URL + path.substr(1);
    } else {
        url = origin + import.meta.env.BASE_URL + "#" + path;
    }

    if (newWindow) {
        window.open(url);
    } else {
        window.location.href = url;
    }
}