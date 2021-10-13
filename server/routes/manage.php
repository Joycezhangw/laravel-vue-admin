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
        'middleware' => ['hashids', 'jwt.role:admin'],
    ], function ($router) {
        $router->put('/passport/refreshToken', 'Passport@refreshToken')->name('manage.passport.refreshToken');//刷新token
        $router->post('/passport/logout', 'Passport@logout')->name('manage.passport.logout');//退出登录
        //个人信息
        $router->get('/profile', 'Profile@index')->name('manage.profile.index');
        $router->put('/profile/update', 'Profile@update')->name('manage.profile.update');
        $router->get('/profile/rules', 'Profile@rules')->name('manage.profile.rules');

        //中间件进行权限认证
        $router->group([
            'middleware' => 'rbac.admin.permissiion',
        ], function ($router) {
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
            $router->get('/role/list', 'Role@lists')->name('manage.role.list');//列表
            $router->post('/role/store', 'Role@store')->name('manage.role.store');//提交菜单数据
            $router->put('/role/update/{id}', 'Role@update')->name('manage.role.update');//更新菜单
            $router->delete('/role/delete/{id}', 'Role@destroy')->name('manage.role.destroy');//删除菜单
            //部门
            $router->get('/dept', 'Dept@index')->name('manage.dept.index');//用户列表
            $router->get('/dept/read/{id}', 'Dept@read')->name('manage.dept.read');//详情
            $router->post('/dept/store', 'Dept@store')->name('manage.dept.store');//新增用户
            $router->put('/dept/update/{id}', 'Dept@update')->name('manage.dept.update');//更新用户
            $router->delete('/dept/delete/{id}', 'Dept@destroy')->name('manage.dept.destroy');//删除
            //后台用户
            $router->get('/user', 'Manage@index')->name('manage.user.index');//用户列表
            $router->get('/user/read/{id}', 'Manage@read')->name('manage.user.read');//详情
            $router->post('/user/store', 'Manage@store')->name('manage.user.store');//新增用户
            $router->put('/user/update/{id}', 'Manage@update')->name('manage.user.update');//更新用户
            $router->delete('/user/delete/{id}', 'Manage@destroy')->name('manage.user.destroy');//删除
            //请求日志
            $router->get('/log', 'Log@index')->name('manage.log.index');//请求日志
            $router->delete('/log/delete/{id}', 'Log@destroy')->name('manage.log.destroy');//删除
            //前台用户
//        $router->get('/member', 'Member@index')->name('manage.member.index');//前台用户列表
        });

    });
});
