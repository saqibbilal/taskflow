'use client'; // We need this now because we're using a Ref
import { useRef } from "react";
import { addProject } from "@/app/actions";

export default function CreateProject() {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            ref={formRef}
            action={async (formData) => {
                await addProject(formData);
                formRef.current?.reset(); // This clears the input after the action finishes
            }}
            className="mb-12 flex gap-3"
        >
            <input
                type="text"
                name="name"
                placeholder="Create new project..."
                className="flex-1 border-2 border-slate-200 p-3 rounded-lg focus:border-blue-500 outline-none"
                required
            />
            <button type="submit" className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold">
                Create Project
            </button>
        </form>
    );
}