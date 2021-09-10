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

Request-params:{
    "username":'用户名',
    "password":'密码',//后期使用 cryptoJs 对密码加密传输
    "captcha":'图形验证码',
    "captcha_uniqid":'验证码key'
}

Response:{
    "code": 200,
    "message": "登录成功",
    "data": {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4",
        "token_type": "bearer",
        "expires_in": 3600
    }
}
```

> 刷新 token

```
POST:/manage/v1/passport/refreshToken

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Response:{
    "code": 200,
    "message": "刷新成功",
    "data": {
        "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4",
        "token_type": "bearer",
        "expires_in": 3600
    }
}
```


> 登出

```
POST:/manage/v1/passport/logout

Request-Header: {
    'Authorization': bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cubGFyYXZlbHZ1ZS5jb21cL21hbmFnZVwvdjFcL3Bhc3Nwb3J0XC9sb2dpbiIsImlhdCI6MTYzMDMxNzIwNCwiZXhwIjoxNjMwMzIwODA0LCJuYmYiOjE2MzAzMTcyMDQsImp0aSI6IkVtbFVyM0oyMFU1OURySDEiLCJzdWIiOjEwMDAxLCJwcnYiOiI1OWY1MjliYjg4ZDY0NDAzOThhMjJkZjY1MDUwNDZhODVjN2VkMTUzIn0.UUgK-1b22bIXAGs3LJLiHIbZMPTT6ECoM-aIIQYERw4
}

Response:{
    "code": 200,
    "message": "登出成功",
}
```