import Image from "next/image";
import Header from "@/components/Header";
import Chart from "@/components/Chart";
import SwapForm from "@/components/SwapForm";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#121217] text-white relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 z-0 opacity-80">
                <Image
                    src="/placeholder.svg?height=1080&width=1920"
                    alt="Background pattern"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Main content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-4">
                <Header />

                {/* Main content */}
                <div className="grid md:grid-cols-5 gap-6">
                    {/* Chart section */}
                    <div className="md:col-span-3">
                        <Chart />
                    </div>

                    {/* Swap section */}
                    <div className="md:col-span-2">
                        <SwapForm />
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
}
