<?php

namespace App\Http\Controllers;

use App\Models\Cat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    //
    public function index()
    {
        $categories = Cat::all();
        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }
    public function create()
    {
        return Inertia::render('Categories/Create');
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Cat::create($request->all());

        return redirect()->route('categories.index')->with('success', 'Category created successfully.');
    }
    public function edit($id)
    {
        $category = Cat::findOrFail($id);
        return Inertia::render('Categories/Edit', [
            'category' => $category,
        ]);
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Cat::findOrFail($id);
        $category->update($request->all());

        return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
    }
    public function destroy($id)
    {
        $category = Cat::findOrFail($id);
        $category->delete();
        return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
    }
}
