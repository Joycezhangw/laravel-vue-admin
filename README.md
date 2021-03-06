## 1. 基本介绍

### 1.1 项目介绍

> Laravel-vue-admin是一个基于 [vue](https://vuejs.org) 和 [laravel8] 开发的全栈前后端分离的后台管理系统，集成jwt鉴权，动态路由，动态菜单。
> 对数据库敏感字段进行可逆加密，加密依赖包 `JoyceZ\LaravelLib`，地址`https://github.com/Joycezhangw/laravel-lib`

## 2. 技术栈

* 后端：**`laravel 8` `mysql` `jwt`**
* 前端：**`vue2.6.js` `element-ui` `jsx` `vuex` `vue-router`**

## 3. 使用说明

```
- node版本 > v16.13.1
- php版本 >= v7.3
```
### 3.1 server项目

打开server目录，不可以打开 laravel-vue-admin 根目录

```bash

# 克隆项目
git clone https://github.com/Joycezhangw/laravel-vue-admin.git
# 进入server文件夹
cd server

# 使用 composer 并安装php依赖包
composer install


#手动重命名 .env 文件，并配置上您的数据库等信息

#生成项目密钥
php artisan key:generate

#生成jwt密钥
php artisan jwt:secret

#数据库迁移
php artisan migrate

#数据填充
php artisan db:seed

#文件存储，软链接
php artisan storage:link
```

### 3.2 web项目

```bash
# 进入web文件夹
cd web/vue2

# 安装依赖
cnpm install || npm install

# 启动web项目
npm run serve
```

### 3.3 注意事项

#### 3.3.1
需要修改 `/src/config/env.js` 下 `treeParentId` 变量，此变量是树形结构数据的顶级 `id`。
由于`id` 使用了加密操作。故，需在完成以上动作之后，在 `系统管理-权限管理-菜单列表` 中得到。`系统管理` 中 `parentId` 就是所需要的顶级 `id=0=3vXAb8agzMlmO0kVA2WyJ5EoNjew9d1r`，顶级`id=0`，`0`的加密是根据后台`APP_KEY` 为加密盐。

#### 3.3.2 `sass-loader` 无法解析全局引入

由于 `sass-loader`版本不同，`loaderOptions` 中 `additionalData`的键名不同，

```
module.exports = {
	 css: {
        extract: isProduction,
        sourceMap: false,
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/css/common.scss";`
            }
        }
    },
}

//sass-loader` v8-,这个选项名是 "data"
//sass-loader` v8,这个选项名是 "prependData"
//sass-loader` v10+,这个选项名是 "additionalData"

```

出现 `Auth guard[api] is not defined ` 情况，请重新 `composer require tymon/jwt-auth`
https://jwt-auth.readthedocs.io/en/develop/laravel-installation/

#### 3.3.4 数据库敏感字段加密存储

- EncryptTableDbAttribute Eloquent 模型属性加密和解密
- 不支持模糊搜索，只支持精准搜索
- 加解密在 `config('laraveladmin.crypt.screct_key')` 进行配置
- 依赖 `JoyceZ\LaravelLib\Aop\AopCrypt` 加密工具 

```php
use JoyceZ\LaravelLib\Traits\EncryptTableDbAttribute;

class Client extends Model {

    use EncryptTableDbAttribute;
   
    /**
     * 
     * @var array  需要加密解密的字段
     */
    protected $encryptTable = [
        'id_number', 
        'email',
    ];
}
```
#### 3.3.5 前端枚举使用


```javascript

//在模板中使用
//根据枚举值获取描述
$enum.getLabelByValue("NATION_ENUM",scope.row.teacher_nation)
//获取全部键值枚举
$enum.getMap("NATION_ENUM")


```

## 4. 项目架构

### 4.1 目录结构


```
    ├── server
        ├── app    
        │   ├── Http  （控制器、中间件）   
        │   │    ├──Controllers  （控制器）
        │   │    │   ├── Manage  （后台控制器）
        │   │    │   │   ├── v1  （接口版本）
        │   │    │   │   └── vX  （接口第X个版本）
        │   │    │   ├── Member  （其他控制器）
        │   │    │   └── xxxx  （其他控制器）
        │   │    └──Middleware   （中间件）
        │   └── Services        （服务）     
        │       ├──Captcha      （图形验证码） //弃用，移动到 JoyceZ\LaravelLib 扩展包下
        │       ├──Contracts    （工具类服务接口）
        │       ├──Models       （Eloquent 模型类）
        │       ├──Enums        （状态枚举）     
        │       ├──Repositories （业务逻辑服务接口） 
        │       │   ├──Manage （业务逻辑服务接口） 
        │       │   │    ├──Interfaces （接口） 
        │       │   │    └──Providers  （服务注册） 
        │       │   └──其他业务仓
        │       ├──Support           
        │       ├──Traits           
        │       └──Validators       （表单验证规则） 
    
    └─web               （前端文件）
        └─vue2          （vue2版本开发）
           ├─public        （发布模板）
           └─src           （源码包）
             ├─api       （向后台发送ajax的封装层）
             ├─assets	（静态文件）
             ├─components（组件）
             ├─config    （配置）
             ├─router	（前端路由）
             ├─store     （vuex 状态管理仓）
             ├─library   （前端工具库）
             ├─layout    （布局）
             ├─icons     （svg 图标）
             ├─plugins   （插件）
             ├─filters   （全局过滤）
             ├─directive （自定义指令）
             └─view      （前端页面）

```

### 需要解决的问题


* [ ] 添加完路由菜单，没有实时更新路由菜单数据
