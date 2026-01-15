import {Project} from "@/types/project";
import CreateProject from "@/components/CreateProject";
import ProjectCard from "@/components/ProjectCard";
import { WeatherCard } from "@/components/WeatherCard";

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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <WeatherCard />
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-8">My Projects</h1>

                <CreateProject/>

                {projects.map((project) => {

                    // You MUST have a return statement here
                    return (
                        <ProjectCard key={project.id} project={project}/>
                    ); // End of return
                })}
            </div>
        </main>
    );
}