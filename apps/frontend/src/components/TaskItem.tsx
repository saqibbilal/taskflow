// src/components/TaskItem.tsx
import { Check } from "lucide-react";

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
    return (
        /* Using task-item-container to force the 1080p slimness */
        <div className={`task-item-container relative flex items-center gap-3 border border-white/10 transition-all
            ${task.is_completed ? 'bg-white/5 opacity-60' : 'bg-white/10 hover:bg-white/15'}`}>

            {/* ACCENT BAR - Keeps height consistent with container */}
            <div className={`absolute left-0 top-1 bottom-1 w-1 rounded-r-full 
                ${task.priority === 'HIGH' ? 'bg-emerald-400' : 'bg-purple-500'}`}
            />

            {/* CHECKBOX - Sized to not stretch the row */}
            <div className={`w-4 h-4 2xl:w-5 2xl:h-5 shrink-0 rounded-md border-2 flex items-center justify-center transition-all
                ${task.is_completed ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`}>
                {task.is_completed && <Check size={10} className="text-white font-bold" />}
            </div>

            <div className="flex flex-col gap-0 min-w-0">
                {/* Using task-item-title to force 11px on 1080p */}
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
                        {task.is_completed ? 'Done' : 'Today'}
                    </span>
                </div>
            </div>
        </div>
    );
}