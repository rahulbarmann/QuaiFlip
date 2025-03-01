export default function SwapForm() {
    return (
        <div className="bg-[#000000]/20 backdrop-blur-lg rounded-3xl p-6 border border-white/5">
            <h2 className="text-2xl font-bold mb-6 text-white">Swap</h2>

            <div className="mb-2 text-sm text-white">
                Avl. balance: 502.2 APT
            </div>
            <div className="bg-[#000000]/40 rounded-2xl p-3 mb-4 flex items-center border border-white/10">
                <input
                    type="text"
                    placeholder="Enter amount"
                    className="bg-transparent border-none outline-none flex-1 text-white"
                />
                <div className="flex items-center gap-2 bg-[#000000]/60 rounded-full px-3 py-1.5 border border-white/10">
                    {/* Token logo placeholder */}
                    <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                    {/* Dropdown icon placeholder */}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 6L8 10L12 6"
                            stroke="white"
                            stroke-opacity="0.8"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>

            <div className="flex justify-center my-4">
                <button className="w-8 h-8 rounded-full flex items-center justify-center  ">
                    {/* Swap icon placeholder */}
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M18.3333 14.1667L14.9999 17.5L11.6666 14.1667"
                            stroke="white"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M10.8333 2.5H11.6667C12.5507 2.5 13.3986 2.85119 14.0237 3.47631C14.6488 4.10143 15 4.94928 15 5.83333V17.5"
                            stroke="white"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M1.66659 5.83333L4.99992 2.5L8.33325 5.83333"
                            stroke="white"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M9.16675 17.5H8.33341C7.44936 17.5 6.60151 17.1488 5.97639 16.5237C5.35127 15.8986 5.00008 15.0507 5.00008 14.1667V2.5"
                            stroke="white"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </button>
            </div>

            <div className="mb-2 text-sm text-white">
                Avl. balance: 2000 USDC
            </div>
            <div className="bg-[#000000]/40 rounded-2xl p-3 mb-6 flex items-center border border-white/10">
                <input
                    type="text"
                    placeholder="Enter amount"
                    className="bg-transparent border-none outline-none flex-1 text-white"
                />
                <div className="flex items-center gap-2 bg-[#000000]/60 rounded-full px-3 py-1.5 border border-white/10">
                    {/* Token logo placeholder */}
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
                        $
                    </div>
                    {/* Dropdown icon placeholder */}
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M4 6L8 10L12 6"
                            stroke="white"
                            stroke-opacity="0.8"
                            stroke-width="1.33333"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>

            <div className="flex justify-between items-center mb-2">
                <div className="text-sm text-white">Max Slippage</div>
                <div className="flex items-center gap-1 bg-[#000000]/40 rounded-full px-3 py-1 border border-white/10">
                    <span className="text-sm text-white">1%</span>
                    {/* Dropdown icon placeholder */}
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 5L6 8L9 5"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="text-sm text-white">1 APT = $8 USDT</div>
                <div className="flex items-center gap-1 text-sm text-white">
                    {/* Fuel icon placeholder */}
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1.75 12.8333H8.75"
                            stroke="#CECECE"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M2.33325 5.25H8.16659"
                            stroke="#CECECE"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M8.16659 12.8333V2.33332C8.16659 2.0239 8.04367 1.72716 7.82488 1.50837C7.60608 1.28957 7.30934 1.16666 6.99992 1.16666H3.49992C3.1905 1.16666 2.89375 1.28957 2.67496 1.50837C2.45617 1.72716 2.33325 2.0239 2.33325 2.33332V12.8333"
                            stroke="#CECECE"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                        <path
                            d="M8.16675 7.58332H9.33341C9.64283 7.58332 9.93958 7.70624 10.1584 7.92503C10.3772 8.14383 10.5001 8.44057 10.5001 8.74999V9.91666C10.5001 10.2261 10.623 10.5228 10.8418 10.7416C11.0606 10.9604 11.3573 11.0833 11.6667 11.0833C11.9762 11.0833 12.2729 10.9604 12.4917 10.7416C12.7105 10.5228 12.8334 10.2261 12.8334 9.91666V5.73416C12.8335 5.58021 12.8032 5.42776 12.7441 5.28559C12.6851 5.14343 12.5984 5.01436 12.4892 4.90582L10.5001 2.91666"
                            stroke="#CECECE"
                            stroke-width="1.4"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    <span>$0.006</span>
                </div>
            </div>

            <button className="w-full bg-[#e22902] hover:bg-[#e22902]/90 text-white py-3 rounded-full font-medium">
                Swap now
            </button>
        </div>
    );
}
