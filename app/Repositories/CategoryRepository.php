<?php

namespace App\Repositories;

use App\Models\Cat;

class CategoryRepository
{
    public function all()
    {
        return Cat::all();
    }

    public function create(array $data)
    {
        return Cat::create($data);
    }

    public function update(Cat $category, array $data)
    {
        $category->update($data);
        return $category;
    }

    public function delete(Cat $category)
    {
        return $category->delete();
    }
}
