import { Task } from "@/types/project";
import { deleteTask } from "@/app/actions";

interface Props {
    task: Task;
}

export default function TaskItem({ task }: Props) {
    return (
        <div className="py-3 flex items-center justify-between group">
      <span className={task.is_completed ? "line-through text-gray-400" : "text-slate-700"}>
        {task.title}
      </span>

            <form action={async () => {
                'use server';
                await deleteTask(task.id);
            }}>
                <button className="text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity text-xs font-medium">
                    Delete
                </button>
            </form>
        </div>
    );
}