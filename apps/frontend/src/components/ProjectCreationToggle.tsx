'use client';
import { useState } from "react";
import CreateProject from "@/components/CreateProject";

export default function ProjectCreationToggle(){
    const [isCreating, setIsCreating] = useState(false);

    return (
        /* Added snap-start to the wrapper so the scroll behavior
           stays consistent whether it's the form or the button */
        <div className="snap-start shrink-0 transition-all duration-300 ease-in-out">
            {isCreating ? (
                /* We pass a prop called 'onCancel' so CreateProject
                   can tell this component to hide the form */
                <CreateProject onCancel={() => setIsCreating(false)} />
            ) : (
                <div
                    className="glass project-card-size rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-white/20 hover:text-white/40 hover:border-white/20 cursor-pointer transition-all"
                    onClick={() => setIsCreating(true)}
                >
                    <span className="text-4xl font-light">+</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-2">New Project</span>
                </div>
            )}
        </div>
    );
}