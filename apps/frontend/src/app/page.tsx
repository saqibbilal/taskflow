import {Project} from "@/types/project"; // Import Project instead
import {addTask} from "@/app/actions";
import TaskItem from "@/components/TaskItem";
import CreateProject from "@/components/CreateProject";
import {deleteProject} from "@/app/actions";
import DeleteProjectButton from "@/components/DeleteProjectButton";

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
                    // 1. Logic lives here (BEFORE the return)
                    const totalTasks = project.tasks.length;
                    const completedTasks = project.tasks.filter((t) => t.is_completed).length;
                    const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

                    // 2. You MUST have a return statement here
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

                            {/* Progress Section */}
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-semibold text-slate-600">Progress</span>
                                <span className="text-sm font-bold text-blue-600">{progress}%</span>
                            </div>

                            <div className="w-full bg-slate-100 h-2.5 rounded-full mb-6 overflow-hidden">
                                <div
                                    className="bg-blue-600 h-full transition-all duration-500 ease-out"
                                    style={{width: `${progress}%`}}
                                ></div>
                            </div>

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