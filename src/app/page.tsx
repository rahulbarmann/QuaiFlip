import { Swap } from "@/components/Swap";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-gray-900 to-black">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
                <h1 className="text-4xl font-bold text-center mb-8 text-white">
                    QuaiFlip
                </h1>
                <Swap />
            </div>
        </main>
    );
}
