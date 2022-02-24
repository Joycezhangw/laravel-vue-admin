/**
 * 默认头像
 * @param {string} url 头像地址
 * @returns 
 */
export function defaultAvatar(url) {
    if (!url) {
        return require('@/assets/img/default-avatar.png')
    }
    return url;
}
/**
 * 默认昵称
 * @param {string} name 昵称
 * @returns 
 */
export function defaultName(name) {
    if (!name) {
        return "可爱的你^-^"
    }
    return name;
}
/**
 * 金额格式化
 * 10000 => "10,000"
 * @param {number} num 
 * @returns 
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
/**
 * 数据脱敏
 * @param {String} str 需要脱敏的字符串
 * @param {Number} beginLen 起始显示长度
 * @param {Number} endLen 结束显示长度
 * @returns 
 */
 export function desensitization(str, beginLen = 3, endLen = 4) {
    let len = str.length, firstStr = str.substring(0, beginLen), lastStr = str.substring(len-endLen);
    let middleStr = str.substring(beginLen, len - Math.abs(endLen)).replace(/[\s\S]/ig, '*');
    return firstStr + middleStr + lastStr;
}