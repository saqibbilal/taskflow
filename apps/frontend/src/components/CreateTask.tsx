'use client';
import { useRef } from "react";
import { addTask } from "@/app/actions";

export default function CreateTask({ projectId }: { projectId: number }) {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            ref={formRef}
            action={async (formData) => {
                await addTask(formData);
                formRef.current?.reset();
            }}
            className="flex gap-2 mb-4"
        >
            {/* We pass the project_id as a hidden input so the action gets it */}
            <input type="hidden" name="project_id" value={projectId} />

            <input
                type="text"
                name="name"
                placeholder="Add a task..."
                className="flex-1 text-sm border-b border-slate-200 focus:border-blue-500 outline-none pb-1"
                required
            />
            <button type="submit" className="text-blue-600 text-sm font-bold hover:text-blue-800">
                Add
            </button>
        </form>
    );
}