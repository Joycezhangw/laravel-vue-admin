<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'namespace' => 'Manage\\V1',
    'prefix' => 'v1',
    'middleware' => ['manage.log']
], function ($router) {
    $router->get('/passport/captcha', 'Passport@captcha')->name('manage.passport.captcha');
    $router->post('/passport/login', 'Passport@login')->name('manage.passport.login');
    $router->group([
        'middleware' => ['hashids', 'manage.auth'],
    ], function ($router) {
        $router->put('/passport/refreshToken', 'Passport@refreshToken')->name('manage.passport.refreshToken');//刷新token
        $router->post('/passport/logout', 'Passport@logout')->name('manage.passport.logout');//退出登录
        //个人信息
        $router->get('/profile', 'Profile@index')->name('manage.profile.index');
        $router->put('/profile/update', 'Profile@update')->name('manage.profile.update');
        $router->get('/profile/rules', 'Profile@rules')->name('manage.profile.rules');

        //以下路由需要另起一个中间件进行权限认证
        //菜单
        $router->get('/menu', 'Menu@index')->name('manage.menu.index');//菜单权限列表
        $router->get('/menu/read/{id}', 'Menu@read')->name('manage.menu.read');//详情
        $router->post('/menu/store', 'Menu@store')->name('manage.menu.store');//提交菜单数据
        $router->put('/menu/update/{id}', 'Menu@update')->name('manage.menu.update');//更新菜单
        $router->delete('/menu/delete/{id}', 'Menu@destroy')->name('manage.menu.destroy');//删除菜单
        $router->get('/menu/power', 'Menu@power')->name('manage.menu.power');//获取route别名权限
        //角色
        $router->get('/role', 'Role@index')->name('manage.role.index');//菜单权限列表
        $router->get('/role/read/{id}', 'Role@read')->name('manage.role.read');//详情
        $router->post('/role/store', 'Role@store')->name('manage.role.store');//提交菜单数据
        $router->put('/role/update/{id}', 'Role@update')->name('manage.role.update');//更新菜单
        $router->delete('/role/delete/{id}', 'Role@destroy')->name('manage.role.destroy');//删除菜单

    });
});
