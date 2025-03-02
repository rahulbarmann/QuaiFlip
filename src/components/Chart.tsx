"use client";

import { useEffect, useRef, useState } from "react";

interface TimeframeOption {
    label: string;
    value: string;
}

const timeframes: TimeframeOption[] = [
    { label: "1D", value: "D" },
    { label: "1W", value: "W" },
    { label: "1M", value: "M" },
    { label: "1Y", value: "12M" },
    { label: "5Y", value: "60M" },
    { label: "ALL", value: "ALL" },
];

export default function Chart() {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [activeTimeframe, setActiveTimeframe] = useState("D");

    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
        script.type = "text/javascript";
        script.async = true;
        script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: "QUAIUSDT",
            interval: activeTimeframe,
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            enable_publishing: false,
            hide_top_toolbar: true,
            hide_legend: false,
            withdateranges: true,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            save_image: false,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            gridColor: "rgba(255, 255, 255, 0.05)",
            container_id: "tradingview_chart",
        });

        if (chartContainerRef.current) {
            chartContainerRef.current.innerHTML = "";
            chartContainerRef.current.appendChild(script);
        }

        return () => {
            if (chartContainerRef.current) {
                chartContainerRef.current.innerHTML = "";
            }
        };
    }, [activeTimeframe]);

    return (
        <div className="bg-[#000000]/20 backdrop-blur-lg rounded-3xl p-6 border border-white/5">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#E22902] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">Q</span>
                    </div>
                    <div>
                        <div className="font-bold text-white">QUAI</div>
                        <div className="text-2xl font-bold text-white">
                            $0.15
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap sm:justify-end">
                    {timeframes.map(({ label, value }) => (
                        <button
                            key={value}
                            onClick={() => setActiveTimeframe(value)}
                            className={`px-3 py-1 text-sm rounded-md transition-colors ${
                                activeTimeframe === value
                                    ? "text-white bg-white/20"
                                    : "text-white/60 bg-white/10 hover:bg-white/15"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
            <div
                className="h-[400px] rounded-xl overflow-hidden sm:h-[300px]"
                ref={chartContainerRef}
                id="tradingview_chart"
            />
        </div>
    );
}
