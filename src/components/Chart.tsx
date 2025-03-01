export default function Chart() {
    return (
        <div className="bg-[#000000]/20 backdrop-blur-lg rounded-3xl p-6 border border-white/5">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#f7931a] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">₿</span>
                    </div>
                    <div>
                        <div className="font-bold">Bitcoin</div>
                        <div className="text-2xl font-bold">$62,420</div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm text-white/60">
                        1D
                    </button>
                    <button className="px-3 py-1 text-sm text-white/60">
                        1W
                    </button>
                    <button className="px-3 py-1 text-sm text-white/60">
                        1M
                    </button>
                    <button className="px-3 py-1 text-sm text-white/60 bg-white/10 rounded-md">
                        1Y
                    </button>
                    <button className="px-3 py-1 text-sm text-white/60">
                        5Y
                    </button>
                    <button className="px-3 py-1 text-sm text-white/60">
                        10Y
                    </button>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[300px] relative">
                <div className="absolute left-0 top-0 text-xs text-white/60">
                    $70,000
                </div>
                <div className="absolute left-0 top-[20%] text-xs text-white/60">
                    $60,000
                </div>
                <div className="absolute left-0 top-[40%] text-xs text-white/60">
                    $50,000
                </div>
                <div className="absolute left-0 top-[60%] text-xs text-white/60">
                    $40,000
                </div>
                <div className="absolute left-0 top-[80%] text-xs text-white/60">
                    $30,000
                </div>
                <div className="absolute left-0 bottom-0 text-xs text-white/60">
                    $20,000
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10"></div>
                <div className="absolute bottom-[20%] left-0 right-0 h-px bg-white/10"></div>
                <div className="absolute bottom-[40%] left-0 right-0 h-px bg-white/10"></div>
                <div className="absolute bottom-[60%] left-0 right-0 h-px bg-white/10"></div>
                <div className="absolute bottom-[80%] left-0 right-0 h-px bg-white/10"></div>

                <svg
                    className="w-full h-full"
                    viewBox="0 0 1000 300"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M0,250 C50,230 100,240 150,220 C200,200 250,210 300,190 C350,170 400,180 450,160 C500,140 550,150 600,130 C650,110 700,120 750,100 C800,80 850,90 900,70 C950,50 1000,30 1000,30 L1000,300 L0,300 Z"
                        fill="rgba(226, 41, 2, 0.2)"
                        stroke="#e22902"
                        strokeWidth="3"
                    />
                </svg>

                <div className="absolute bottom-0 left-[5%] text-xs text-white/60">
                    Jan
                </div>
                <div className="absolute bottom-0 left-[15%] text-xs text-white/60">
                    Feb
                </div>
                <div className="absolute bottom-0 left-[25%] text-xs text-white/60">
                    Mar
                </div>
                <div className="absolute bottom-0 left-[35%] text-xs text-white/60">
                    Apr
                </div>
                <div className="absolute bottom-0 left-[45%] text-xs text-white/60">
                    May
                </div>
                <div className="absolute bottom-0 left-[55%] text-xs text-white/60">
                    Jun
                </div>
                <div className="absolute bottom-0 left-[65%] text-xs text-white/60">
                    Jul
                </div>
                <div className="absolute bottom-0 left-[75%] text-xs text-white/60">
                    Aug
                </div>
                <div className="absolute bottom-0 left-[85%] text-xs text-white/60">
                    Sep
                </div>
                <div className="absolute bottom-0 left-[95%] text-xs text-white/60">
                    Oct
                </div>
            </div>
        </div>
    );
}
