'use client';
import { useRef, useEffect } from "react";
import { addProject } from "@/app/actions";

// The "Blueprint" you liked (Approach 2)
interface CreateProjectProps {
    onCancel: () => void;
}

export default function CreateProject({ onCancel }: CreateProjectProps) {
    const formRef = useRef<HTMLFormElement>(null);

    // The "Side Effect" (Approach 4)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onCancel();
        };
        // Start listening when component appears
        window.addEventListener('keydown', handleKeyDown);
        // Stop listening when component disappears (Cleanup)
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onCancel]);

    return (
        <div className="glass project-card-size rounded-3xl border border-white/20 p-6 flex flex-col shrink-0 animate-in fade-in zoom-in duration-200">
            <h3 className="text-white font-bold mb-6">New Project</h3>

            <form
                ref={formRef}
                action={async (formData) => {
                    await addProject(formData);
                    formRef.current?.reset(); // Clear the form (Approach 3)
                    onCancel();
                }}
                className="flex-1 flex flex-col"
            >
                <input
                    autoFocus
                    name="name"
                    placeholder="Project Name..."
                    className="bg-white/5 border border-white/10 p-3 rounded-xl text-white outline-none focus:border-white/30"
                    required
                />

                <div className="mt-auto flex flex-col gap-2">
                    <button type="submit" className="w-full py-3 bg-white text-black rounded-xl font-bold">
                        CREATE
                    </button>
                    <button type="button" onClick={onCancel} className="text-white/30 hover:text-white py-2 text-xs">
                        CANCEL
                    </button>
                </div>
            </form>
        </div>
    );
}