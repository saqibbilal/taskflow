<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Task;
use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $project = Project::create(['name' => 'Test Project']);
        $project->tasks()->create(['title' => 'Task 1 of X', 'is_completed' => false]);
        $project->tasks()->create(['title' => 'Task 2 of X', 'is_completed' => false]);
        $project->tasks()->create(['title' => 'Task 3 of X', 'is_completed' => true]);
        $project->tasks()->create(['title' => 'Task 4 of X', 'is_completed' => true]);
        $project->tasks()->create(['title' => 'Task 5 of X', 'is_completed' => false]);


//         User::factory(10)->create();

//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);
    }
}
