'use server'

import { revalidatePath } from 'next/cache';

const API_URL = "http://backend.test/api";

export async function addTask(projectId: number, formData: FormData) {
    const title = formData.get('title');

    await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ title, project_id: projectId }),
    });

    revalidatePath('/');
}

export async function deleteTask(id: number) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
    });

    revalidatePath('/');
}

export async function toggleTask(id: number, currentStatus: boolean) {
    await fetch(`http://backend.test/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            is_completed: !currentStatus
        }),
    });

    revalidatePath('/');
}

export async function addProject(formData: FormData) {
    try {
        const name = formData.get('name');

        const res = await fetch("http://backend.test/api/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ name }),
        });

        if (!res.ok) {
            // This will tell us if Laravel is complaining about something
            const errorText = await res.text();
            console.error("Laravel Error Details:", errorText);
            return;
        }

        revalidatePath('/');
    } catch (error) {
        // This will tell us if the Node server itself is failing (e.g., can't find backend.test)
        console.error("Next.js Action Error:", error);
    }
}