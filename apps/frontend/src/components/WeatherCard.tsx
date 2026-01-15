import { CloudSun } from "lucide-react";

export function WeatherCard() {
    // This is where logic (like fetching temperature) would live later
    const temp = "12°C";
    const desc = "CLOUDY";

    return (
        /* Instead of .weather-card in CSS, we use glass + Tailwind layout */
        <div className="glass p-8 flex flex-col justify-between min-h-[200px] rounded-3xl relative overflow-hidden transition-all hover:-translate-y-1">

            {/* Icon with Argon's orange glow */}
            <div className="text-orange-400">
                <CloudSun size={40} />
            </div>

            {/* Info section */}
            <div className="flex flex-col gap-1 mt-4">
                <span className="text-3xl font-bold text-white">{temp}</span>
                <span className="text-xs text-white/70 font-medium tracking-widest uppercase">
          {desc}
        </span>
            </div>

            {/* The decorative dots from your index.html */}
            <div className="flex gap-2 mt-4">
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"></span>
                <span className="w-2 h-2 rounded-full bg-white/30"></span>
                <span className="w-2 h-2 rounded-full bg-white/30"></span>
            </div>
        </div>
    );
}