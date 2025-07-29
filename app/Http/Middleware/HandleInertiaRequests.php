<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Setting;
use Illuminate\Support\Facades\Session;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $setting = Setting::first();

        return array_merge(parent::share($request), [
            'logo' => $setting?->logo,
            'header_color' => $setting?->header_color ?? '#4f46e5',
            'sidebar_color' => $setting?->sidebar_color ?? '#1e293b',
            'auth' => [
                'user' => $request->user()?->load('roles'),
                'permissions' => $request->user()
                    ? $request->user()->getAllPermissions()->pluck('name')->toArray()
                    : [],
            ],
            'flash' => [
                'success' => Session::get('success'),
                'error' => Session::get('error'),
                'errors' => Session::get('errors'), // optional for validation errors
            ],
        ]);
    }
}
