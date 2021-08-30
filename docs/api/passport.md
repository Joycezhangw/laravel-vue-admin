## 后台用户登录相关


> 图形验证码

```
GET:/manage/v1/passport/captcha


Response:{
    message:'',
    code:200,
    data:{
        captcha:'',//base64图片
        captchaId:''//校验码
    }
}
```

> 登录

默认账号： `peadmin`

密码：`123qwe@ASD` 密码组成：8位以上，由数字、字母、必须有一个大写字母、特殊字符组成

```
POST:/manage/v1/passport/login
```