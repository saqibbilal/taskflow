'use client';

import {Task} from "@/types/project";
import {deleteTask, toggleTask} from "@/app/actions";

interface Props {
    task: Task;
}

export default function TaskItem({task}: Props) {
    return (
        <div className="py-3 flex items-center justify-between group">
            <div className="flex items-center gap-3">
                {/* Toggle Form - Simple and Clean */}
                <form action={() => toggleTask(task.id, task.is_completed)}>
                    <input
                        type="checkbox"
                        defaultChecked={task.is_completed}
                        onChange={(e) => e.target.form?.requestSubmit()}
                        className="w-4 h-4 cursor-pointer accent-blue-600"
                    />
                </form>

                <span className={task.is_completed ? "line-through text-gray-400" : "text-slate-700 font-medium"}>
          {task.title}
        </span>
            </div>

            {/* Delete Form - Just call the imported action */}
            <form action={() => deleteTask(task.id)}>
                <button
                    className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity text-xs font-medium px-2 py-1">
                    Delete
                </button>
            </form>
        </div>
    );
}