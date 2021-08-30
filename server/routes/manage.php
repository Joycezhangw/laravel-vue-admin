<?php

use Illuminate\Support\Facades\Route;

Route::group([
    'namespace' => 'Manage\\V1',
    'prefix' => 'v1',
    'middleware' => ['hashids', 'manage.log']
], function ($router) {
    $router->get('/passport/captcha', 'Passport@captcha')->name('passport.captcha');
    $router->post('/passport/login', 'Passport@login')->name('passport.login');
    $router->group([
        'middleware' => ['manage.auth'],
    ], function ($router) {
        $router->put('/passport/refreshToken', 'Passport@refreshToken')->name('passport.refreshToken');//刷新token
        $router->post('/passport/logout', 'Passport@logout')->name('passport.logout');//退出登录
    });
});
