<?php

namespace App\Services;

use App\Models\Cat;
use App\Repositories\CategoryRepository;

class CategoryService
{
    protected $repo;

    public function __construct(CategoryRepository $repo)
    {
        $this->repo = $repo;
    }

    public function getAllCategories()
    {
        return $this->repo->all();
    }

    public function createCategory(array $data)
    {
        return $this->repo->create($data);
    }

    public function updateCategory(Cat $category, array $data)
    {
        return $this->repo->update($category, $data);
    }

    public function deleteCategory(Cat $category)
    {
        return $this->repo->delete($category);
    }
}
