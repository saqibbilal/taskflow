// src/components/TaskItem.tsx
import { Check } from "lucide-react"; // For the custom checkbox

interface Props {
    task: {
        id: number;
        title: string;
        is_completed: boolean;
        priority?: string; // e.g., "HIGH", "MEDIUM"
        due_date?: string;
    }
}

export default function TaskItem({ task }: Props) {
    return (
        /* 1. CONTAINER: Row + Glass effect + Overflow hidden to clip the accent bar */
        <div className={`relative flex items-center gap-4 p-4 rounded-2xl border border-white/10 transition-all
            ${task.is_completed ? 'bg-white/5 opacity-60' : 'bg-white/10 hover:bg-white/15'}`}>

            {/* 2. ACCENT BAR: Absolute positioning to stick it to the left edge */}
            <div className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full 
                ${task.priority === 'HIGH' ? 'bg-emerald-400' : 'bg-purple-500'}`}
            />

            {/* 3. CUSTOM CHECKBOX */}
            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all
                ${task.is_completed ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`}>
                {task.is_completed && <Check size={14} className="text-white font-bold" />}
            </div>

            {/* 4. TEXT CONTENT: Vertical Stack */}
            <div className="flex flex-col gap-1">
                <span className={`text-sm font-semibold transition-all
                    ${task.is_completed ? 'line-through text-white/40' : 'text-white'}`}>
                    {task.title}
                </span>

                {/* METADATA ROW: Priority Badge + Time */}
                <div className="flex items-center gap-3">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter
                        ${task.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                        {task.priority || 'MEDIUM'}
                    </span>
                    <span className="text-[10px] text-white/40 font-medium">
                        {task.is_completed ? 'Done' : 'Today'}
                    </span>
                </div>
            </div>
        </div>
    );
}