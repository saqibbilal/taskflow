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