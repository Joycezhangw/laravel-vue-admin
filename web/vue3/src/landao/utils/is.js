
export function is(val, type) {
    return Object.prototype.toString.call(val) === `[object ${type}]`
}

export function isDef(val) {
    return typeof val !== 'undefined'
}

export function isUnDef(val) {
    return !isDef(val)
}

/**
 * 判断是否是 Object
 * @param {Object} val 
 * @returns 
 */
export function isObject(val) {
    return val !== null && is(val, 'Object')
}

/**
 * 判断是否是数组类型
 * @param {*} val 
 * @returns 
 */
export function isArray(val) {
    return val && Array.isArray(val)
}
/**
 * 判断是否是字符串
 * @param {*} val 
 * @returns 
 */
export function isString(val) {
    return is(val, 'String')
}
/**
 * 判断是否为空
 * 
 * @param {*} val 
 * @returns 
 */
export function isEmpty(val) {
    if (!isDef(val)) return true;
    if (isArray(val) || isString(val)) {
        return val.length === 0;
    }
    if (val instanceof Map || val instanceof Set) {
        return val.size === 0;
    }
    if (isObject(val)) {
        return Object.keys(val).length === 0;
    }
    return false;
}

export function isDate(val) {
    return is(val, 'Date');
}

export function isNull(val) {
    return val === null;
}

export function isNullAndUnDef(val) {
    return isUnDef(val) && isNull(val);
}

export function isNullOrUnDef(val) {
    return isUnDef(val) || isNull(val);
}

export function isNumber(val) {
    return is(val, 'Number');
}

export function isPromise(val) {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch);
}

export function isFunction(val) {
    return typeof val === 'function';
}

export function isBoolean(val) {
    return is(val, 'Boolean');
}

export function isRegExp(val) {
    return is(val, 'RegExp');
}

/**
 * 判断数组中的是否是字符串值
 * @param {Array} options 
 * @returns 
 */
export function isStringArray(options = []) {
    return options.some((item) => isString(item));
}



export function isUrl(path) {
    const reg =
    /^(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
    return reg.test(path);
}
