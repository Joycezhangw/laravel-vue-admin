import request from '@/landao/service/request'

// export const captcha = () =>request.get('/v1/passport/captcha')
/**
 * 登录相关
 */
export default class PassportService {
    static get apiUri() {
        return {
            captcha: '/v1/passport/captcha',
            login: '/v1/passport/login',
            logout: '/v1/passport/logout',
            refreshToken: '/v1/passport/refreshToken'
        }
    }

    /**
     * 图形验证码
     * @returns 
     */
    static captcha() {
        return request.get('/v1/passport/captcha')
    }

    /**
     * 登录
     * @param {Object} params 
     * @returns 
     */
    static login(params) {
        return request.post('/v1/passport/login', params)
    }

    /**
   * 退出登录
   * @returns 
   */
    static logout() {
        return request.post('/v1/passport/logout')
    }

    /**
     * 刷新令牌
     * @returns 
     */
    static refreshToken() {
        return request({
            url: '/v1/passport/refreshToken',
            method: 'put'
        })
    }
}