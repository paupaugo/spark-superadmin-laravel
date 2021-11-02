<?php

namespace App\Providers;

use App\Repositories\IPartnerRepository;
use App\Repositories\PartnerRepository;
use App\Repositories\IContentManagementRepository;
use App\Repositories\ContentManagementRepository;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $this->app->bind(IPartnerRepository::class, PartnerRepository::class);
        $this->app->bind(IContentManagementRepository::class, ContentManagementRepository::class);
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
