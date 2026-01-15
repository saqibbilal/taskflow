// src/app/sandbox/page.tsx
import ProgressBar from "@/components/ProgressBar";
import TaskItem from "@/components/TaskItem";
import {Project} from "@/types/project";

export default async function SandboxPage() {
    const response = await fetch("http://backend.test/api/projects", {
        cache: 'no-store'
    });

    const projects: Project[] = await response.json();

    return (

        <div className="p-20 flex justify-center">
            <div className="flex items-center gap-6 w-[500px]">
                {projects.map((project) => {
                    return (
                        <TodoTranslation key={project.id} project={project}/>
                    );
                })}
            </div>
        </div>
    );
}

interface Props {
    project: Project
}

function TodoTranslation({ project }: Props) {
    // 1. Calculation Logic (The "PHP" part)
    const completedCount = project.tasks.filter((t) => t.is_completed).length;
    const totalCount = project.tasks.length;

    return (
        /* THE WRAPPER: Changed bg-purple-950 to 'glass' for that VR look */
        <div className="glass min-w-[350px] p-6 rounded-3xl flex flex-col gap-6 border-white/10 shadow-2xl">

            {/* HEADER: Recipe 'Push to Corners' + 'Items Center' */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-bold text-white text-lg tracking-tight">To-do list</h3>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">20 Dec 2021</p>
                </div>

                {/* The "7" and "+" Badge logic from your index.html */}
                <div className="flex items-center gap-2">
                    <span className="bg-white/10 px-2 py-1 rounded-md text-xs font-bold text-white">
                        {totalCount}
                    </span>
                    <button className="bg-white/20 hover:bg-white/30 w-6 h-6 rounded-md flex items-center justify-center transition-all">
                        +
                    </button>
                </div>
            </div>

            {/* TASK LIST: Added a height limit and scroll for the 'Box Model' */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {project.tasks.map((task) => (
                    /* We wrap TaskItem to ensure it doesn't have a white background */
                    <div key={task.id} className="group">
                        <TaskItem task={task} />
                    </div>
                ))}
            </div>

            {/* PROGRESS BAR: Ensure it's at the bottom with proper spacing */}
            <div className="pt-4 border-t border-white/10">
                <ProgressBar total={totalCount} current={completedCount} />
            </div>
        </div>
    );
}