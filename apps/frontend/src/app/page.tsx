import { Project } from "@/types/project"; // Import Project instead
import { addTask } from "@/app/actions";
import TaskItem from "@/components/TaskItem";

export default async function Home() {
    // Fetch from the NEW projects endpoint
    const response = await fetch("http://backend.test/api/projects", {
        cache: 'no-store'
    });

    const projects: Project[] = await response.json();

    return (
        <main className="p-10 font-sans">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-800 mb-8">My Projects</h1>

                {projects.map((project) => (
                    <section key={project.id} className="mb-10 bg-white p-6 rounded-xl shadow-sm border">
                        <h2 className="text-xl font-semibold text-blue-600 mb-4">{project.name}</h2>

                        <div className="mt-4 pt-4 border-t">
                            <form
                                action={async (formData) => {
                                    'use server';
                                    await addTask(project.id, formData);
                                }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Add task to this project..."
                                    className="flex-1 border p-2 rounded text-sm"
                                    required
                                />
                                <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                                    Add
                                </button>
                            </form>
                        </div>

                        <div className="divide-y border-t">
                            {project.tasks.map((task) => (
                                <div key={task.id} className="py-3 flex items-center justify-between">
                  <span className={task.is_completed ? "line-through text-gray-400" : ""}>
                    {task.title}
                  </span>
                                    <TaskItem task={task} />
                                </div>
                            ))}

                            {project.tasks.length === 0 && (
                                <p className="py-4 text-gray-400 italic">No tasks in this project yet.</p>
                            )}
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}