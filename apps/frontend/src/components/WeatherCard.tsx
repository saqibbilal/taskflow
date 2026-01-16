// src/components/WeatherCard.tsx
import { CloudSun } from "lucide-react";

export function WeatherCard() {
    const temp = "12°C";
    const desc = "CLOUDY";

    return (
        /* MATCHED CLASSES:
           - p-4 lg:p-6 (Synced padding)
           - min-h-[140px] lg:min-h-[180px] (Synced height)
           - w-full (Ensures it respects the grid cell)
        */
        <div className="glass p-4 lg:p-6 flex flex-col justify-between min-h-[140px] lg:min-h-[180px] rounded-3xl relative overflow-hidden transition-all hover:-translate-y-1 w-full">

            {/* Icon - Scaled down slightly for 1080p */}
            <div className="text-orange-400">
                <CloudSun size={32} className="lg:size-[40px]" />
            </div>

            {/* Info section - Matched typography logic */}
            <div className="flex flex-col gap-0 lg:gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                    {temp}
                </span>
                <span className="text-[10px] lg:text-xs text-white/70 font-bold tracking-widest uppercase">
                    {desc}
                </span>
            </div>

            {/* The decorative dots - Moved to absolute to prevent pushing content */}
            <div className="absolute top-4 lg:top-6 right-4 lg:right-6 flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
            </div>
        </div>
    );
}