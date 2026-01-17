import { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";
import { WeatherCard } from "@/components/WeatherCard";
import { Users, Zap, Target } from "lucide-react";
import ProjectCreationToggle from "@/components/ProjectCreationToggle";

async function getProjects(): Promise<Project[]> {
    // Note: Ensure your Laravel backend is running at this local URL
    const response = await fetch("http://backend.test/api/projects", {
        cache: 'no-store'
    });
    return response.json();
}

export default async function Page() {
    const projects = await getProjects();

    return (
        /* THE PAGE WRAPPER */
        <div className="flex flex-col gap-10 p-2">

            {/* TOP SECTION: WIDGETS (Responsive Grid) */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

                {/* 1. The Weather Card */}
                <WeatherCard />

                {/* 2. The Stat Widgets (Mapped for perfect consistency) */}
                {[
                    { label: "Efficiency", value: "88%", desc: "System Performance", icon: <Zap size={20}/>, color: "orange" },
                    { label: "Team", value: "12", desc: "Active Collaborators", icon: <Users size={20}/>, color: "blue" },
                    { label: "Goals", value: projects.length, desc: "Projects in Progress", icon: <Target size={20}/>, color: "emerald" }
                ].map((stat, i) => (
                    <div key={i} className="glass p-4 lg:p-6 rounded-3xl flex flex-col justify-between min-h-[140px] lg:min-h-[180px] w-full transition-all">
                        <div className="flex justify-between items-start">
                            <div className={`p-2 lg:p-3 rounded-2xl ${
                                stat.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                                    stat.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                                        'bg-emerald-500/20 text-emerald-400'
                            }`}>
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">
                                {stat.label}
                            </span>
                        </div>
                        <div>
                            <h4 className="text-2xl lg:text-4xl font-bold">{stat.value}</h4>
                            <p className="text-[10px] lg:text-xs text-white/60 font-medium mt-1">
                                {stat.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </section>

            {/* BOTTOM SECTION: PROJECTS (Horizontal Scroll) */}
            <section className="flex flex-col gap-6">
                <div className="flex justify-between items-center px-2">
                    <h2 className="text-xl font-bold tracking-tight text-white">Active Projects</h2>
                    <button className="text-xs font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest">
                        See All
                    </button>
                </div>

                {/* THE SCROLL CONTAINER
                    - snap-x: Enables the "magnetic" snapping for cards.
                    - custom-scrollbar: Uses your glass scrollbar from globals.css.
                    - px-4 md:px-0: Adds side padding on mobile only.
                */}
                <div className="flex gap-6 overflow-x-auto pb-8 snap-x items-start custom-scrollbar p-2 px-4 md:px-0">

                    {/* Render existing projects from Laravel */}
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}

                    {/* Empty state "Add Project" placeholder */}
                    < ProjectCreationToggle />
                </div>
            </section>
        </div>
    );
}