import { useState, useCallback } from "react";
import { Contract, Interface, JsonRpcSigner } from "quais";
import { ROUTER_ADDRESS, ROUTER_ABI, ERC20_ABI } from "@/constants/contracts";
import { useWallet } from "./useWallet";

interface ContractError {
    message: string;
}

interface ERC20Functions {
    approve(
        spender: string,
        amount: string
    ): Promise<{ wait(): Promise<void> }>;
    allowance(owner: string, spender: string): Promise<bigint>;
    balanceOf(account: string): Promise<bigint>;
    connect(signer: JsonRpcSigner): ERC20Functions;
}

export function useSwap() {
    const { signer, provider } = useWallet();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getTokenContract = useCallback(
        (tokenAddress: string) => {
            if (!provider) return null;
            const erc20Interface = new Interface(ERC20_ABI);
            return new Contract(
                tokenAddress,
                erc20Interface,
                provider
            ) as unknown as ERC20Functions;
        },
        [provider]
    );

    const getRouterContract = useCallback(() => {
        if (!signer) return null;
        return new Contract(ROUTER_ADDRESS, ROUTER_ABI, signer);
    }, [signer]);

    const approveToken = useCallback(
        async (tokenAddress: string, amount: string) => {
            try {
                setLoading(true);
                setError(null);

                const tokenContract = getTokenContract(tokenAddress);
                if (!tokenContract || !signer) {
                    throw new Error("Contracts not initialized");
                }

                const connectedContract = tokenContract.connect(signer);
                const tx = await connectedContract.approve(
                    ROUTER_ADDRESS,
                    amount
                );
                await tx.wait();

                return true;
            } catch (err) {
                const error = err as ContractError;
                setError(error.message || "Failed to approve token");
                return false;
            } finally {
                setLoading(false);
            }
        },
        [getTokenContract, signer]
    );

    const swapExactTokensForTokens = useCallback(
        async (
            amountIn: string,
            amountOutMin: string,
            path: string[],
            deadline: number
        ) => {
            try {
                setLoading(true);
                setError(null);

                const routerContract = getRouterContract();
                if (!routerContract || !signer) {
                    throw new Error("Contracts not initialized");
                }

                const tx = await routerContract.swapExactTokensForTokens(
                    amountIn,
                    amountOutMin,
                    path,
                    await signer.getAddress(),
                    deadline
                );

                await tx.wait();
                return true;
            } catch (err) {
                const error = err as ContractError;
                setError(error.message || "Swap failed");
                return false;
            } finally {
                setLoading(false);
            }
        },
        [getRouterContract, signer]
    );

    const getAmountsOut = useCallback(
        async (amountIn: string, path: string[]) => {
            try {
                const routerContract = getRouterContract();
                if (!routerContract) {
                    throw new Error("Router contract not initialized");
                }

                const amounts = await routerContract.getAmountsOut(
                    amountIn,
                    path
                );
                return amounts[amounts.length - 1].toString();
            } catch (err) {
                const error = err as ContractError;
                console.error("Error getting amounts out:", error);
                return "0";
            }
        },
        [getRouterContract]
    );

    const getTokenBalance = useCallback(
        async (tokenAddress: string, address: string) => {
            try {
                const tokenContract = getTokenContract(tokenAddress);
                if (!tokenContract) {
                    throw new Error("Token contract not initialized");
                }

                const balance = await tokenContract.balanceOf(address);
                return balance.toString();
            } catch (err) {
                const error = err as ContractError;
                console.error("Error getting token balance:", error);
                return "0";
            }
        },
        [getTokenContract]
    );

    return {
        loading,
        error,
        approveToken,
        swapExactTokensForTokens,
        getAmountsOut,
        getTokenBalance,
    };
}
