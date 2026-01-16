// src/components/ProjectCard.tsx
import DeleteProjectButton from "@/components/DeleteProjectButton";
import ProgressBar from "@/components/ProgressBar";
import TaskItem from "@/components/TaskItem";
import CreateTask from "@/components/CreateTask";
import { Project } from "@/types/project";

interface Props { project: Project; }

export default function ProjectCard({ project }: Props) {
    const completedCount = project.tasks.filter((t) => t.is_completed).length;
    const totalCount = project.tasks.length;

    return (
        /* We use project-card-size here to force the CSS we just wrote */
        <div className="glass project-card-size p-5 2xl:p-6 rounded-3xl flex flex-col gap-4 border border-white/10 shadow-2xl transition-all duration-300 hover:translate-y-[-5px] snap-start shrink-0 overflow-hidden">

            <div className="flex items-center justify-between shrink-0 w-full">
                <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-white text-base tracking-tight truncate">{project.name}</h3>
                    <p className="text-[9px] text-white/50 font-bold uppercase tracking-widest">Project Overview</p>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="bg-white/10 px-2 py-1 rounded-md text-[10px] font-bold text-white">{totalCount}</span>
                    <DeleteProjectButton projectId={project.id} projectName={project.name} />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-3">
                {project.tasks.length > 0 ? (
                    project.tasks.map((task) => <TaskItem key={task.id} task={task} />)
                ) : (
                    <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-2xl opacity-30">
                        <p className="text-[10px] italic">No tasks yet</p>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3 shrink-0">
                <ProgressBar total={totalCount} current={completedCount} />
                <div className="bg-white/5 rounded-2xl p-1 border border-white/10 focus-within:border-white/30">
                    <CreateTask projectId={project.id} />
                </div>
            </div>
        </div>
    );
}