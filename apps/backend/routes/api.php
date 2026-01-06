<?php

use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// This handles the Project list (and we will include tasks in the response)
Route::apiResource('projects', ProjectController::class);

// This handles the Tasks list (and we need it to create and delete tasks)
Route::apiResource('tasks', TaskController::class);
