/**
 * 验证邮箱
 * @param {string} string 要验证的邮箱
 * @returns 
 */
export function isEmail(value) {
	const reg = /^[A-Za-z1-9]+([-_.][A-Za-z1-9]+)*@([A-Za-z1-9]+[-.])+[A-Za-z]{2,5}$/;
	return reg.test(value);
}
