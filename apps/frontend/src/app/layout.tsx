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
        {/* Using flex-col here stacks the Header on top and the Content Area below it */}



        <body className="antialiased min-h-screen flex flex-col text-white relative">
        {/* BACKGROUND IMAGE LAYER */}
        <div
            className="fixed inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/7.jpg')" }}
        />



        {/* 1. FULL WIDTH HEADER: Placed at the top level of the body */}
        <header className="glass m-4 p-6 rounded-3xl flex items-center justify-between sticky top-4 z-50">
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
                        className="bg-transparent border-none outline-none text-xs text-white placeholder:text-white/40 w-32 md:w-48"
                    />
                </div>
                <button className="text-xs font-bold text-white/80 hover:text-white">Sign In</button>
            </div>
        </header>

        {/* 2. LOWER CONTAINER: Flex row puts the Sidebar and Main side-by-side */}
        <div className="flex flex-1 px-4 pb-4 gap-6 overflow-hidden">
            {/* Sidebar sits on the left, under the header line */}
            <Sidebar />

            {/* Main area for your Widgets and Project Cards */}
            <main className="flex-1 overflow-y-auto custom-scrollbar">
                {children}
            </main>
        </div>

        </body>
        </html>
    );
}