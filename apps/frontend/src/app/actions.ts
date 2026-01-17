'use server'

import {revalidatePath} from 'next/cache';

export async function addTask(formData: FormData) {
    const title = formData.get('name');
    const project_id = formData.get('project_id');

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ title, project_id }),
    });

    revalidatePath('/');
}

export async function deleteTask(id: number) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Failed to delete task');
    }

    revalidatePath('/');npm run build
}

export async function toggleTask(id: number, currentStatus: boolean) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
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

    const name = formData.get('name');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({name}),
    });
    revalidatePath('/');
}

export async function deleteProject(id: number) {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects/${id}`, {
        method: 'DELETE',
    });
    revalidatePath('/');
}