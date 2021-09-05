import request from '@/library/http/request'
class Passport {
    static get apiUrl() {
        return {
            getCaptcha: '/v1/passport/captcha',
            login: '/v1/passport/login',
            logout: '/v1/passport/logout',
            refreshToken: '/v1/passport/refreshToken'
        }
    }
    /**
     * 获取图形验证码
     * @returns 
     */
    static getCaptcha() {
        return request.get(this.apiUrl.getCaptcha)
    }
    /**
     * 登录
     * @param {Object} params 
     * @returns 
     */
    static login(params) {
        return request.post(this.apiUrl.login, params)
    }

    /**
     * 退出登录
     * @returns 
     */
    static logout() {
        return request.post(this.apiUrl.logout)
    }

    /**
     * 刷新令牌
     * @returns 
     */
    static refreshToken() {
        return request({
            url: this.apiUrl.refreshToken,
            method: 'put'
        })
    }
}
export default Passport