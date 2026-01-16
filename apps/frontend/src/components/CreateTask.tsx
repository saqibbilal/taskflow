'use client';
import { useRef } from "react";
import { addTask } from "@/app/actions";
import { SubmitButton } from "@/components/SubmitButton";

export default function CreateTask({ projectId }: { projectId: number }) {
    const formRef = useRef<HTMLFormElement>(null);

    return (
        <form
            ref={formRef}
            action={async (formData) => {
                await addTask(formData);
                formRef.current?.reset();
            }}
            className="flex items-center gap-2 w-full"
        >
            <input type="hidden" name="project_id" value={projectId} />

            <div className="relative flex-1 flex items-center">
                <input
                    type="text"
                    name="name"
                    placeholder="Add a task..."
                    /* Using task-input-field for consistent rounding.
                       Removed border-b and replaced with full border.
                    */
                    className="task-input-field w-full bg-white/5 border border-white/10 px-3 py-1.5 2xl:py-2 text-[11px] 2xl:text-xs text-white placeholder:text-white/30 outline-none focus:border-white/40 transition-all"
                    required
                />
            </div>

            <SubmitButton />
        </form>
    );
}