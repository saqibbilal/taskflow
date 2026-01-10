interface Props {
    total: number;
    current: number;
}

export default function ProgressBar({total, current}: Props) {

    // 1. Logic for the progress bar
    const progress = total > 0 ? Math.round((current / total) * 100) : 0;

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-slate-600">Progress</span>
                <span className="text-sm font-bold text-blue-600">{progress}%</span>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full mb-6 overflow-hidden">
                <div
                    className="bg-blue-600 h-full transition-all duration-500 ease-out"
                    style={{width: `${progress}%`}}
                ></div>
            </div>
        </>
    )
}

