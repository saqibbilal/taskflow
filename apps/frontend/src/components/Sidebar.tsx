// src/components/Sidebar.tsx
import {
    LayoutDashboard,
    Table,
    CreditCard,
    Box,
    User,
    Rocket
} from "lucide-react";

export function Sidebar() {
    const menuItems = [
        { name: "DASHBOARD", icon: <LayoutDashboard size={18}/>, active: true },
        { name: "TABLES", icon: <Table size={18}/> },
        { name: "BILLING", icon: <CreditCard size={18}/> },
        { name: "VIRTUAL REALITY", icon: <Box size={18}/> },
    ];

    return (
        /* LAYOUT LOGIC:
           1. Removed 'fixed' and 'top-4' so it naturally sits below the header in the flex container.
           2. 'sticky top-0': Keeps the sidebar visible while scrolling the main content.
           3. 'h-[calc(100vh-400px)]': Subtracts header height + desired bottom gap from the full viewport height.
           4. 'mb-4': Adds the final margin at the bottom for the 'floating' effect.
        */
        <aside className="glass w-64 rounded-3xl p-6 hidden lg:flex flex-col gap-8 sticky top-0 h-[calc(100vh-400px)] mb-4">

            {/* Logo Section matching Argon design */}
            <div className="flex items-center gap-3 px-2 font-bold text-white">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg">
                    <Box size={20} className="text-white"/>
                </div>
                <span className="text-sm tracking-tight">Argon Dashboard 2</span>
            </div>

            {/* Navigation Menu */}
            <nav className="flex flex-col gap-1">
                {menuItems.map((item) => (
                    <div
                        key={item.name}
                        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all cursor-pointer group
                        ${item.active ? 'bg-white/15 shadow-xl border border-white/10' : 'hover:bg-white/10'}`}
                    >
                        <span className={item.active ? "text-white" : "text-white/60 group-hover:text-white"}>
                            {item.icon}
                        </span>
                        <span className="text-[11px] font-bold tracking-wider uppercase">
                            {item.name}
                        </span>
                    </div>
                ))}

                <h4 className="text-[10px] font-bold text-white/40 mt-6 mb-2 px-4 tracking-widest">
                    ACCOUNT PAGES
                </h4>

                <div className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/10 text-white/60 hover:text-white cursor-pointer transition-all">
                    <User size={18} />
                    <span className="text-[11px] font-bold tracking-wider">PROFILE</span>
                </div>
            </nav>

            {/* Speed Insight / Documentation Card */}
            <div className="mt-auto bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-4 border border-white/20">
                <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center mb-3">
                    <Rocket size={16} className="text-white" />
                </div>
                <h4 className="text-sm font-bold mb-1 text-white">Need help?</h4>
                <p className="text-[10px] text-white/70 mb-4">
                    Please check our docs
                </p>
                <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-[10px] font-bold transition-all uppercase tracking-wider text-white">
                    Documentation
                </button>
            </div>
        </aside>
    );
}