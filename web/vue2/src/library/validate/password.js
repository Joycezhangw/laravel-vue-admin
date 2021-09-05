/**
 * 密码必须至少包含8个字符、至少含有一个数字、小写和大写字母以及特殊字符
 * @param {string} value 验证密码
 * @returns bool
 */
export function isComplexPwd(value) {
    const reg = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])[a-zA-Z0-9@#$%^&+=]*$/
    return reg.test(value);
}
