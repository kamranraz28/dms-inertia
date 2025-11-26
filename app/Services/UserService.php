<?php

namespace App\Services;

use App\Repositories\UserRepository;

class UserService
{
    protected $userRepository;
    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getAllUsers()
    {
        return $this->userRepository->getAllUser();
    }

    public function dealers()
    {
        return $this->userRepository->dealers();
    }
    public function retailers()
    {
        return $this->userRepository->retailers();
    }
}
