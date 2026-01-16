// src/app/page.tsx
import { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard"; // We'll use your TodoTranslation logic here
import { WeatherCard } from "@/components/WeatherCard";
import { Users, Zap, Target } from "lucide-react";

async function getProjects(): Promise<Project[]> {
    const response = await fetch("http://backend.test/api/projects", {
        cache: 'no-store'
    });
    return response.json();
}

export default async function Page() {
    const projects = await getProjects();

    return (
        /* THE PAGE WRAPPER: Vertical Stack with large gap */
        <div className="flex flex-col gap-10 p-2">

            {/* TOP SECTION: WIDGETS (Grid)
                We use a grid so they wrap on smaller screens,
                but stay horizontal on desktop. */}
            /* ONE UNIFIED SECTION FOR ALL WIDGETS */
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
                            {/* Dynamic Color classes in v4 require full strings or mapping */}
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
                    <h2 className="text-xl font-bold tracking-tight">Active Projects</h2>
                    <button className="text-xs font-bold text-white/40 hover:text-white transition-all uppercase tracking-widest">
                        See All
                    </button>
                </div>

                {/* The Scroll Container:
                    'overflow-x-auto' = allows horizontal scrolling
                    'scrollbar-hide' = keeps it clean (optional utility)
                    'pb-6' = gives room for the scrollbar shadow */}
                <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
                    {projects.map((project) => (
                        <div key={project.id} className="snap-start">
                            {/* We rename your TodoTranslation component to ProjectCard */}
                            <ProjectCard project={project} />
                        </div>
                    ))}

                    {/* Empty state "Add Project" placeholder to show at the end of the scroll */}
                    <div className="glass min-w-[250px] max-w-[250px] h-[400px] rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-white/20 hover:text-white/40 hover:border-white/20 cursor-pointer transition-all">
                        <span className="text-4xl font-light">+</span>
                        <span className="text-xs font-bold uppercase tracking-widest mt-2">New Project</span>
                    </div>
                </div>
            </section>
        </div>
    );
}