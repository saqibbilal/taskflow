// src/components/ProjectCard.tsx
import DeleteProjectButton from "@/components/DeleteProjectButton";
import ProgressBar from "@/components/ProgressBar";
import TaskItem from "@/components/TaskItem";
import CreateTask from "@/components/CreateTask";
import { Project } from "@/types/project";

interface Props {
    project: Project;
}

export default function ProjectCard({ project }: Props) {
    // Logic: Calculate progress for the progress bar
    const completedCount = project.tasks.filter((t) => t.is_completed).length;
    const totalCount = project.tasks.length;

    return (
        /* - h-[550px]: Fixed height ensures uniformity with the "Add Project" card.
           - flex-col: Stacks Header, List, and Footer vertically.
        */
        <div className="glass min-w-[250px] max-w-[250px] h-[400px] p-6 rounded-3xl flex flex-col gap-6 border border-white/10 shadow-2xl transition-all duration-300 hover:translate-y-[-5px]">

            {/* 1. HEADER (Fixed) */}
            <div className="flex items-center justify-between shrink-0">
                <div className="overflow-hidden">
                    <h3 className="font-bold text-white text-lg tracking-tight truncate">
                        {project.name}
                    </h3>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">
                        Project Overview
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="bg-white/10 px-2 py-1 rounded-md text-[10px] font-bold text-white">
                        {totalCount}
                    </span>
                    <DeleteProjectButton projectId={project.id} projectName={project.name} />
                </div>
            </div>

            {/* 2. TASK LIST (Scrollable)
                - flex-1: Takes up all available space between header and footer.
                - overflow-y-auto: Only this section scrolls when tasks > 5.
                - custom-scrollbar: Uses the glass styles from globals.css.
            */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                {project.tasks.length > 0 ? (
                    project.tasks.map((task) => (
                        <div key={task.id} className="group">
                            <TaskItem task={task} />
                        </div>
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl opacity-30">
                        <p className="text-xs italic">No tasks yet</p>
                    </div>
                )}
            </div>

            {/* 3. FOOTER (Fixed) */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-4 shrink-0">
                <ProgressBar total={totalCount} current={completedCount} />

                {/* Create Task Input Wrapper */}
                <div className="bg-white/5 rounded-2xl p-1 border border-white/10 focus-within:border-white/30 transition-all">
                    <CreateTask projectId={project.id} />
                </div>
            </div>
        </div>
    );
}