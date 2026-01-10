import DeleteProjectButton from "@/components/DeleteProjectButton";
import ProgressBar from "@/components/ProgressBar";
import TaskItem from "@/components/TaskItem";
import {Project} from "@/types/project";


interface Props {
    project: Project
}

export default function ProjectCard({project}: Props) {

    return (
        <section className="mb-10 bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">{project.name}</h2>

                {/* Project Delete Button */}
                <DeleteProjectButton
                    projectId={project.id}
                    projectName={project.name}
                />
            </div>

            <ProgressBar total={project.tasks.length}
                         completed={project.tasks.filter((t) => t.is_completed).length}/>

            {/* Your existing Tasks mapping code goes here */}
            <div className="space-y-2">
                {project.tasks.map((task) => (
                    <TaskItem key={task.id} task={task}/>
                ))}
            </div>
        </section>
    )
}