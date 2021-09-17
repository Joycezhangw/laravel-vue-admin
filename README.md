## 1. 基本介绍

### 1.1 项目介绍

> Laravel-vue-admin是一个基于 [vue](https://vuejs.org) 和 [laravel8] 开发的全栈前后端分离的后台管理系统，集成jwt鉴权，动态路由，动态菜单。

## 2. 技术栈

* 后端：**`laravel 8` `mysql` `jwt`**
* 前端：**`vue2.6.js` `element-ui` `jsx` `vuex` `vue-router`**

## 3. 使用说明

```
- node版本 > v12.18.3
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
composer update


#手动重命名 .env 文件，并配置上您的数据库等信息

#生成项目密钥
php artisan key:generate

#数据库迁移
php artisan migrate

#数据填充
php artisan db:seed
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
        │       ├──Captcha      （图形验证码）
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