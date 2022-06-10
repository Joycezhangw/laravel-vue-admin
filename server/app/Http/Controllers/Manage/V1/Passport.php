<?php

declare (strict_types=1);

namespace App\Http\Controllers\Manage\V1;


use App\Events\PassportManageLoginAfterEvent;
use App\Events\PassportManageRefreshTokenEvent;
use App\Http\Controllers\Controller;
use App\Http\ResponseCode;
use App\Services\Repositories\Manage\Interfaces\IManage;
use App\Support\CryptoJsSup;
use App\Validators\Passport\ManageLoginValidator;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use JoyceZ\LaravelLib\Aop\AopPassword;
use JoyceZ\LaravelLib\Contracts\Captcha as CaptchaInterface;
use JoyceZ\LaravelLib\Helpers\ResultHelper;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTFactory;

/**
 * 登录相关
 * Class Passport
 * @package App\Http\Controllers\Manage\V1
 */
class Passport extends Controller
{

    /**
     * 获取图形验证码
     * @param CaptchaInterface $captchaRepo
     * @return array
     */
    public function captcha(CaptchaInterface $captchaRepo)
    {
        $captcha = $captchaRepo->makeCode()->get();
        $captchaImg = Arr::get($captcha, 'image', '');
        $captchaUniqid = Arr::get($captcha, 'uniq', '');
        return ResultHelper::returnFormat('success', ResponseCode::SUCCESS, [
            'captcha' => $captchaImg,
            config('laraveladmin.passport.check_captcha_cache_key') => $captchaUniqid
        ]);
    }

    /**
     * 管理员登陆
     * @param Request $request
     * @param ManageLoginValidator $validator
     * @param Captcha $captchaRepo
     * @param IManage $manageRepo
     * @return array
     */
    public function login(Request $request, ManageLoginValidator $validator, CaptchaInterface $captchaRepo, IManage $manageRepo)
    {
        $params = $request->all();
        //表单校验
        $error = $validator->make($params)->errors();
        if ($error->count() > 0) {
            return ResultHelper::returnFormat($error->first(), ResponseCode::ERROR);
        }
        //图形验证码校验
       $captchaUniq = $params[config('laraveladmin.passport.check_captcha_cache_key')];
       if (!$captchaRepo->check($params['captcha'], $captchaUniq)) {
           return ResultHelper::returnFormat('验证码错误', ResponseCode::ERROR);
       }
        $manage = $manageRepo->getInfoByUsername(trim($params['username']));
        if (!$manage) {
            return ResultHelper::returnFormat('账号不存在', ResponseCode::ERROR);
        }
        $manageInfo = $manage->makeVisible(['password', 'pwd_salt'])->toArray();
        //将前端加密的密码进行解密
        $password = (new CryptoJsSup($captchaUniq))->decrypt($params['password']);
        //密码验证
        $pwdFlag = (new AopPassword())
            ->withSalt()
            ->check($manageInfo['password'], (string)$password, $manageInfo['pwd_salt']);
        if (!$pwdFlag) {
            return ResultHelper::returnFormat('账号密码错误', ResponseCode::ERROR);
        }
        if (intval($manageInfo['manage_status']) != 1) {
            return ResultHelper::returnFormat('用户已被禁用', ResponseCode::ERROR);
        }
//        $token = JWTAuth::fromUser($manage);
        $token = $this->withAuthGuard('admin')->login($manage);
        $jwt = [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => JWTFactory::getTTL() * 60
        ];
        event(new PassportManageLoginAfterEvent($manage, $jwt));
        return ResultHelper::returnFormat('登录成功', ResponseCode::SUCCESS, $jwt);
    }

    /**
     * 刷新令牌
     * https://www.yangpanyao.com/archives/81.html
     * https://zhuanlan.zhihu.com/p/80352766
     * https://github.com/tymondesigns/jwt-auth/issues?q=refresh
     * https://jwt-auth.readthedocs.io/en/develop/search.html?q=expires_in
     * @param IManage $manageRepo
     * @return array
     */
    public function refreshToken(IManage $manageRepo)
    {
        try {
//            $user = JWTAuth::parseToken()->touser();
            $manage = $this->getAuthUser('admin');
//            $manage = $manageRepo->getByPkId($user->manage_id);
            if (!$manage) {
                return ResultHelper::returnFormat('账号不存在', ResponseCode::ERROR);
            }
            if (intval($manage->manage_status) != 1) {
                return ResultHelper::returnFormat('用户已被禁用', ResponseCode::ERROR);
            }
//            $token = JWTAuth::parseToken()->refresh();
            //TODO:refresh 中不要再加任何参数，否则 getJWTCustomClaims 无效，刷新的令牌不会加上，model 中自定义的 role 参数
            $token = $this->withAuthGuard('admin')->refresh();
            $jwt = [
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => JWTFactory::getTTL() * 60
            ];
            event(new PassportManageRefreshTokenEvent($manage, $jwt));
            return ResultHelper::returnFormat('刷新成功', ResponseCode::SUCCESS, $jwt);
        } catch (TokenInvalidException $e) {
            return ResultHelper::returnFormat('无效token', ResponseCode::LOGIN_TOKEN_TIME_DIE);
        } catch (JWTException $e) {
            return ResultHelper::returnFormat('无法刷新令牌', ResponseCode::LOGIN_TOKEN_TIME_DIE);
        }
    }

    /**
     * 退出登录
     * @return array
     */
    public function logout()
    {
        try {
//            $user = JWTAuth::parseToken()->touser();
            $user = $this->getAuthUser('admin');
            event(new PassportManageRefreshTokenEvent($user, []));
//            JWTAuth::parseToken()->invalidate();//退出
            //使token无效
            $this->withAuthGuard('admin')->invalidate(true);
            return ResultHelper::returnFormat('登出成功', ResponseCode::SUCCESS);
        } catch (TokenInvalidException $e) {
            return ResultHelper::returnFormat('token 无效', ResponseCode::LOGIN_TOKEN_TIME_DIE);
        } catch (TokenBlacklistedException $e){
            return ResultHelper::returnFormat('token 无效', ResponseCode::LOGIN_TOKEN_TIME_DIE);
        }
    }


}
