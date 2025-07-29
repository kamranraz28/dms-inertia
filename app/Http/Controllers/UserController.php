<?php

namespace App\Http\Controllers;

use App\Models\Retailer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
public function index()
{
    $users = User::with('roles')->get();

    return Inertia::render('Users/Index', [
        'users' => $users,
    ]);
}


    public function create()
    {
        $roles = Role::all();

        return Inertia::render('Users/Create', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:6|confirmed',
            'roles' => 'array',
            'phone' => 'nullable|string|max:15',
            'office_id' => 'nullable|string|max:255',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'] ?? null,
            'office_id' => $validated['office_id'] ?? null,
        ]);

        $user->syncRoles($validated['roles']);

        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        $roles = Role::all();

        return Inertia::render('Users/Edit', [
            'user' => $user->load('roles'),
            'roles' => $roles,
        ]);
    }

    public function update(Request $request, User $user)
{
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'roles' => 'array',
        'phone' => 'nullable|string|max:15',
        'office_id' => 'nullable|string|max:255',
    ]);

    $user->update([
        'name' => $validated['name'],
        'email' => $validated['email'],
        'phone' => $validated['phone'] ?? null,
        'office_id' => $validated['office_id'] ?? null,
    ]);

    $user->syncRoles($validated['roles']);

    return redirect()->route('users.index')->with('success', 'User updated successfully.');
}


    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
    }

    public function dealerRetailerMapping()
    {
        $retailers = Retailer::with('dealer','retailer')->get();
        Log::info('Dealer-Retailer Mapping Data Retrieved', ['retailers' => $retailers]);

        return Inertia::render('Users/DealerRetailerMapping', [
            'retailers' => $retailers,
        ]);
    }

    public function createMapping()
    {
        $dealers = User::role('dealer')->get();
        $retailers = User::role('retailer')->get();

        return Inertia::render('Users/CreateMapping', [
            'dealers' => $dealers,
            'retailers' => $retailers,
        ]);
    }
    public function storeMapping(Request $request)
    {
        $validated = $request->validate([
            'dealer_id' => 'required|exists:users,id',
            'retailer_id' => 'required|exists:users,id',
        ]);

        Retailer::create($validated);

        return redirect()->route('dealer-retailer-mapping')->with('success', 'Dealer-Retailer mapping created successfully.');
    }
}
