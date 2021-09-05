import store from "store";

export default {
    //后缀标识
    suffix: "_expirationTime",
    /**
     * 获取
     * @param {string} key 关键字
     * @returns 
     */
    get(key) {
        return store.get(key)
    },
    /**
     * 获取全部
     * @returns 
     */
    getAll() {
        let data = {};
        store.each(function (value, key) {
            data[key] = value;
        });
        return data;
    },
    /**
     * 设置
     * @param {string} key 关键字 
     * @param {*} value 值
     * @param {never} expires 过期时间
     */
    set(key, value, expires) {
        store.set(key, value);
        if (expires) {
            store.set(`${key}${this.suffix}`, Date.parse(new Date()) + expires * 1000);
        }
    },
    /**
     * 判断是否过期
     * @param {string} key 关键字
     * @returns bool
     */
    hasExpired(key) {
        return (this.getExpiration(key) || 0) - Date.parse(new Date()) >= 2000;
    },
    /**
     * 获取过期时间
     * @param {string} key 
     * @returns 
     */
    getExpiration(key) {
        return this.get(`${key}${this.suffix}`)
    },
    /**
     * 移除
     * @param {string} key 关键字
     */
    remove(key) {
        store.remove(key);
        this.removeExpiration(key)
    },
    /**
     * 移除过期时间
     * @param {string} key  关键字
     */
    removeExpiration(key) {
        store.remove(`${key}${this.suffix}`)
    },
    /**
     * 清除所有缓存
     */
    clearAll() {
        store.clearAll()
    }
};