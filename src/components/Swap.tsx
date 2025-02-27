"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from "@/hooks/useWallet";
import { useSwap } from "@/hooks/useSwap";
import { parseUnits, formatUnits } from "quais";

interface SwapError {
    message: string;
}

export function Swap() {
    const { toast } = useToast();
    const { isConnected, connect } = useWallet();
    const {
        loading,
        error,
        approveToken,
        swapExactTokensForTokens,
        getAmountsOut,
    } = useSwap();

    const [fromAmount, setFromAmount] = useState("");
    const [toAmount, setToAmount] = useState("");
    const [fromToken, setFromToken] = useState("");
    const [toToken, setToToken] = useState("");

    useEffect(() => {
        if (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: error,
            });
        }
    }, [error, toast]);

    const calculateSlippage = (amount: string, slippagePercent: number) => {
        try {
            const parsedAmount = parseUnits(amount, 18);
            const slippageBps = 10000 - slippagePercent * 100; // 0.5% = 9950
            return (
                parsedAmount.toString().slice(0, -4) +
                slippageBps.toString().padStart(4, "0")
            );
        } catch (err) {
            console.error("Error calculating slippage:", err);
            return "0";
        }
    };

    const handleFromAmountChange = async (value: string) => {
        setFromAmount(value);
        if (value && fromToken && toToken) {
            try {
                const parsedAmount = parseUnits(value, 18);
                const amountOut = await getAmountsOut(parsedAmount.toString(), [
                    fromToken,
                    toToken,
                ]);
                setToAmount(formatUnits(amountOut, 18));
            } catch (err) {
                console.error("Error calculating output amount:", err);
                setToAmount("");
            }
        } else {
            setToAmount("");
        }
    };

    const handleSwap = async () => {
        if (!fromAmount || !toAmount || !fromToken || !toToken) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Please fill in all fields",
            });
            return;
        }

        try {
            // First approve the router to spend tokens
            const amountIn = parseUnits(fromAmount, 18).toString();
            const approved = await approveToken(fromToken, amountIn);

            if (!approved) {
                throw new Error("Failed to approve token");
            }

            // Calculate minimum amount out with 0.5% slippage
            const amountOutMin = calculateSlippage(toAmount, 0.5);

            // Execute the swap
            const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from now
            const success = await swapExactTokensForTokens(
                amountIn,
                amountOutMin,
                [fromToken, toToken],
                deadline
            );

            if (success) {
                toast({
                    title: "Success",
                    description: "Swap completed successfully",
                });
                setFromAmount("");
                setToAmount("");
            }
        } catch (err) {
            const error = err as SwapError;
            toast({
                variant: "destructive",
                title: "Error",
                description: error.message || "Failed to complete swap",
            });
        }
    };

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
            const error = err as SwapError;
            toast({
                variant: "destructive",
                title: "Connection Error",
                description: error.message || "Failed to connect wallet",
            });
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto bg-gray-800 border-gray-700">
            <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                    <Label htmlFor="fromToken" className="text-white">
                        From Token Address
                    </Label>
                    <Input
                        id="fromToken"
                        placeholder="0x..."
                        value={fromToken}
                        onChange={(e) => setFromToken(e.target.value)}
                        className="bg-gray-700 text-white border-gray-600"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="fromAmount" className="text-white">
                        Amount
                    </Label>
                    <Input
                        id="fromAmount"
                        type="number"
                        placeholder="0.0"
                        value={fromAmount}
                        onChange={(e) => handleFromAmountChange(e.target.value)}
                        className="bg-gray-700 text-white border-gray-600"
                    />
                </div>

                <div className="flex justify-center">
                    <Button
                        type="button"
                        variant="ghost"
                        className="text-white hover:text-gray-300"
                        onClick={() => {
                            const tempToken = fromToken;
                            const tempAmount = fromAmount;
                            setFromToken(toToken);
                            setFromAmount(toAmount);
                            setToToken(tempToken);
                            setToAmount(tempAmount);
                        }}
                    >
                        ↓
                    </Button>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="toToken" className="text-white">
                        To Token Address
                    </Label>
                    <Input
                        id="toToken"
                        placeholder="0x..."
                        value={toToken}
                        onChange={(e) => setToToken(e.target.value)}
                        className="bg-gray-700 text-white border-gray-600"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="toAmount" className="text-white">
                        You Receive
                    </Label>
                    <Input
                        id="toAmount"
                        type="number"
                        placeholder="0.0"
                        value={toAmount}
                        readOnly
                        className="bg-gray-700 text-white border-gray-600"
                    />
                </div>

                {!isConnected ? (
                    <Button
                        type="button"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleConnectWallet}
                    >
                        Connect Wallet
                    </Button>
                ) : (
                    <Button
                        type="button"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleSwap}
                        disabled={loading}
                    >
                        {loading ? "Swapping..." : "Swap"}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}
