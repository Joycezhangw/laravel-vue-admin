<?php
return [
    'passport' => [
        'check_captcha_cache_key' => 'captcha_uniqid',
        'password_salt' => '37490a66eaf28cc00437e5b67a36fcc7'
    ],
    'captcha' => [
        'charset' => 'abcdefghkmnprstuvwxyzABCDEFGHKMNPRSTUVWXYZ23456789',
        'codelen' => 4,
        'width' => 130,
        'height' => 50,
        // 为空为默认字体
        'font' => '',
        'fontsize' => 20,
        'cachetime' => 300,
    ],
];
