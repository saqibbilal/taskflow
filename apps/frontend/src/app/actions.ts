'use server' // Crucial! This tells Next.js to run this function ONLY on the server.

import { revalidatePath } from 'next/cache';

export async function addTask(formData: FormData) {
    const title = formData.get('title');

    // Send the POST request to Laravel
    await fetch("http://backend.test/api/tasks", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ title }),
    });

    // This tells Next.js to clear the cache and fetch the list again
    revalidatePath('/');
}