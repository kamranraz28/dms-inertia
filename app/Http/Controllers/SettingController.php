<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function logoForm()
    {
        $setting = Setting::first();

        return Inertia::render('Settings/ApplicationLogo', [
            'logo' => $setting?->logo,
            'status' => session('status'),
        ]);
    }



    public function uploadLogo(Request $request)
    {
        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $setting = Setting::first() ?? new Setting();

        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($setting->logo && Storage::disk('public')->exists('logo/' . $setting->logo)) {
                Storage::disk('public')->delete('logo/' . $setting->logo);
            }

            $file = $request->file('logo');
            $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();

            $file->storeAs('logo', $filename, 'public');

            $setting->logo = $filename;
            $setting->save();
        }

        return redirect()->route('settings.logo')->with('status', 'Logo uploaded successfully.');
    }

    public function colorForm()
    {
        $settings = Setting::first(); // assumes only one settings row

        return inertia('Settings/ApplicationColor', [
            'settings' => [
                'header_color' => $settings?->header_color ?? '#ffffff',
                'sidebar_color' => $settings?->sidebar_color ?? '#000000',
            ],
        ]);
    }

    public function updateColor(Request $request)
    {
        $request->validate([
            'header_color' => 'required|string',
            'sidebar_color' => 'required|string',
        ]);

        $settings = Setting::firstOrCreate([]);
        $settings->update([
            'header_color' => $request->header_color,
            'sidebar_color' => $request->sidebar_color,
        ]);

        return back()->with('status', 'Colors updated successfully.');
    }

}
