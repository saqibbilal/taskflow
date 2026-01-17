'use client';

import { Check, Trash2 } from "lucide-react"; // Added Trash2
import { useTransition } from "react";
import { toggleTask, deleteTask } from "@/app/actions"; // Added deleteTask

interface Props {
    task: {
        id: number;
        title: string;
        is_completed: boolean;
        priority?: string;
        due_date?: string;
    }
}

export default function TaskItem({ task }: Props) {
    const [isPending, startTransition] = useTransition();

    const handleToggle = () => {
        startTransition(async () => {
            await toggleTask(task.id, task.is_completed);
        });
    };

    // The Delete Handler
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Stops the row from toggling when you click trash

        if (confirm("Are you sure you want to delete this task?")) {
            startTransition(async () => {
                await deleteTask(task.id);
            });
        }
    };

    return (
        <div
            onClick={handleToggle}
            /* Added 'group' to handle the hover effect on the trash icon */
            className={`task-item-container group relative flex items-center gap-3 border border-white/10 transition-all cursor-pointer
                ${isPending ? 'opacity-50 grayscale' : ''} 
                ${task.is_completed ? 'bg-white/5 opacity-60' : 'bg-white/10 hover:bg-white/15'}`}
        >

            {/* ACCENT BAR */}
            <div className={`absolute left-0 top-1 bottom-1 w-1 rounded-r-full 
                ${task.priority === 'HIGH' ? 'bg-emerald-400' : 'bg-purple-500'}`}
            />

            {/* CHECKBOX */}
            <div className={`w-4 h-4 2xl:w-5 2xl:h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all
                ${task.is_completed ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`}>
                {(task.is_completed || isPending) && <Check size={10} className="text-white font-bold" />}
            </div>

            <div className="flex flex-col gap-0 min-w-0 flex-1">
                <span className={`task-item-title font-semibold transition-all truncate
                    ${task.is_completed ? 'line-through text-white/40' : 'text-white'}`}>
                    {task.title}
                </span>

                <div className="flex items-center gap-2">
                    <span className={`text-[8px] 2xl:text-[9px] font-bold px-1.5 py-0 rounded-full uppercase tracking-tighter
                        ${task.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                        {task.priority || 'MEDIUM'}
                    </span>
                    <span className="text-[8px] 2xl:text-[10px] text-white/40 font-medium">
                        {isPending ? 'Updating...' : (task.is_completed ? 'Done' : 'Today')}
                    </span>
                </div>
            </div>

            {/* TRASH BUTTON - Hidden by default, shows on hover thanks to 'group-hover' */}
            <button
                onClick={handleDelete}
                disabled={isPending}
                className="opacity-0 group-hover:opacity-100 p-2 text-white/10 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
            >
                <Trash2 size={14} />
            </button>
        </div>
    );
}