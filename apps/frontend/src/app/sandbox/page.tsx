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

function TodoTranslation({project}: Props) {
    return (
        <div className="mb-10 bg-purple-950 p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between bg-purple-500">
                <div>to do</div>
                <div className="flex items-center gap-2">
                    <div>7</div>
                    <div>+</div>
                </div>
            </div>
            <div className="space-y-2 glass">
                {project.tasks.map((task) => (
                    <TaskItem key={task.id} task={task}/>
                ))}
            </div>
            <ProgressBar total={project.tasks.length}
                         current={project.tasks.filter((t) => t.is_completed).length}/>


        </div>
    );
}