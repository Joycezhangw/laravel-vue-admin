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
};
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
};
/**
 * 金额格式化
 * 10000 => "10,000"
 * @param {number} num 
 * @returns 
 */
export function toThousandFilter(num) {
    return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}