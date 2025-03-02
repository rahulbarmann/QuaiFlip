"use client";

import { Wallet, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/components/ui/use-toast";

export default function Header() {
    const [activeTab, setActiveTab] = useState("Swap");
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const { isConnected, connect, account, disconnect } = useWallet();
    const { toast } = useToast();

    const tabs = ["Swap", "Limit", "Send", "Buy"];

    const handleConnectWallet = async () => {
        try {
            const result = await connect();
            if (!result.success) {
                throw new Error(result.error as string);
            }
            toast({
                title: "Success",
                description: "Wallet connected successfully",
            });
        } catch (err) {
            toast({
                variant: "destructive",
                title: "Connection Error",
                description:
                    (err as Error).message || "Failed to connect wallet",
            });
        }
    };

    return (
        <header className="relative flex justify-between items-center mb-8 py-4 px-4 lg:px-6">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 relative">
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 2V8H9"
                            stroke="#E22902"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M21 12C20.9984 10.2633 20.4944 8.56416 19.5487 7.10752C18.6031 5.65088 17.2562 4.49895 15.6705 3.79067C14.0848 3.0824 12.3281 2.84803 10.6121 3.11584C8.89623 3.38365 7.29445 4.14219 6 5.29998L3 7.99998"
                            stroke="#E22902"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M21 22V16H15"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M3 12C3.00158 13.7367 3.5056 15.4358 4.45125 16.8925C5.39691 18.3491 6.74382 19.501 8.32951 20.2093C9.9152 20.9176 11.6719 21.152 13.3879 20.8841C15.1038 20.6163 16.7056 19.8578 18 18.7L21 16"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-wider text-white">
                    QUAIFLIP
                </span>
            </div>

            {/* Mobile menu button */}
            <button
                className="lg:hidden text-white p-2"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
                {showMobileMenu ? (
                    <X className="h-6 w-6" />
                ) : (
                    <Menu className="h-6 w-6" />
                )}
            </button>

            {/* Desktop navigation */}
            <nav className="hidden lg:block absolute left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-6 py-2.5 text-white rounded-full ${
                                activeTab === tab
                                    ? "backdrop-blur-lg border border-white/10 bg-black/30 text-white"
                                    : "text-white"
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Mobile navigation */}
            {showMobileMenu && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-[#000000]/95 backdrop-blur-lg border-t border-white/10 py-4 z-50">
                    <div className="flex flex-col space-y-2 px-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`px-6 py-2.5 text-white rounded-full text-left ${
                                    activeTab === tab
                                        ? "backdrop-blur-lg border border-white/10 bg-black/30 text-white"
                                        : "text-white"
                                }`}
                                onClick={() => {
                                    setActiveTab(tab);
                                    setShowMobileMenu(false);
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="relative">
                {!isConnected ? (
                    <button
                        onClick={handleConnectWallet}
                        className="bg-[#E22902] hover:bg-[#E22902]/90 text-white px-5 py-2.5 rounded-full flex items-center gap-2"
                    >
                        <Wallet className="w-5 h-5" />
                        <span className="hidden sm:inline">Connect Wallet</span>
                    </button>
                ) : (
                    <>
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="bg-[#E22902] hover:bg-[#E22902]/90 text-white px-5 py-2.5 rounded-full flex items-center gap-2"
                        >
                            <Wallet className="w-5 h-5" />
                            <span className="hidden sm:inline">
                                {account.slice(0, 6)}...{account.slice(-4)}
                            </span>
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#000000]/40 backdrop-blur-lg border border-white/10 shadow-lg z-50">
                                <div className="p-4">
                                    <button
                                        onClick={() => {
                                            disconnect();
                                            setShowDropdown(false);
                                        }}
                                        className="w-full flex items-center gap-2 text-white/80 hover:text-white py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Disconnect</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </header>
    );
}
