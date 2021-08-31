<?php

namespace App\Providers;

use App\Events\Listener\PassportManageLoginAfterListener;
use App\Events\Listener\PassportManageRefreshTokenListener;
use App\Events\PassportManageLoginAfterEvent;
use App\Events\PassportManageRefreshTokenEvent;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        //登录
        PassportManageLoginAfterEvent::class => [
            PassportManageLoginAfterListener::class
        ],
        //刷新token、退出登录
        PassportManageRefreshTokenEvent::class => [
            PassportManageRefreshTokenListener::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
