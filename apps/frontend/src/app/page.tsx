import {Project} from "@/types/project"; // Import Project instead
import TaskItem from "@/components/TaskItem";
import CreateProject from "@/components/CreateProject";
import DeleteProjectButton from "@/components/DeleteProjectButton";
import ProgressBar from "@/components/ProgressBar";

export default async function Home() {
    // Fetch from the NEW projects endpoint
    const response = await fetch("http://backend.test/api/projects", {
        cache: 'no-store'
    });

    const projects: Project[] = await response.json();

    return (
        <main className="p-10 font-sans">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">TaskFlow</h1>
                <h1 className="text-3xl font-bold text-slate-800 mb-8">My Projects</h1>

                <CreateProject/>

                {projects.map((project) => {

                    // You MUST have a return statement here
                    return (
                        <section key={project.id} className="mb-10 bg-white p-6 rounded-xl shadow-sm border">
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

                            {/* Add Task Form... */}
                        </section>
                    ); // End of return
                })}
            </div>
        </main>
    );
}