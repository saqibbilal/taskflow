<?php

namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectApiTest extends TestCase
{
    // This is CRITICAL: It ensures tests don't mess up your real data
    use RefreshDatabase;

    /**
     * Test that the projects endpoint returns data.
     */
    public function test_projects_endpoint_returns_list(): void
    {
        // 1. Arrange: Create a project in the temporary test database
        Project::factory()->create(['name' => 'Deployment Project']);

        // 2. Act: Send a GET request to the API
        $response = $this->getJson('/api/projects');

        // 3. Assert: Verify the status and the data structure
        $response->assertStatus(200);
        $response->assertJsonFragment(['name' => 'Deployment Project']);
    }
}
