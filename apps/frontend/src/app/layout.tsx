// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
    title: "TaskFlow VR",
    description: "End-to-end task management",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body className="antialiased overflow-x-hidden">
        <div className="flex min-h-screen p-4 gap-6">
            <Sidebar />

            <div className="flex-1 flex flex-col gap-6 lg:ml-72">
                {/* Header matching the breadcrumb style in your html */}
                <header className="glass flex items-center justify-between p-6 rounded-3xl sticky top-0 z-40">
                    <div className="flex flex-col">
                <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">
                  Pages / Virtual Reality
                </span>
                        <h1 className="text-xl font-bold">Virtual Reality</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="glass px-4 py-2 rounded-full border border-white/10">
                            <input
                                type="text"
                                placeholder="Type here..."
                                className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/40 w-32"
                            />
                        </div>
                        <button className="text-xs font-bold text-white/80 hover:text-white">Sign In</button>
                    </div>
                </header>

                <main className="pb-10">
                    {children}
                </main>
            </div>
        </div>

        {/* Animated Plant - Fixed as per styles.css */}
        <div className="fixed bottom-10 left-10 text-9xl pointer-events-none z-[-1] animate-bounce opacity-40 grayscale filter blur-[1px] hidden xl:block">
            🌿
        </div>
        </body>
        </html>
    );
}