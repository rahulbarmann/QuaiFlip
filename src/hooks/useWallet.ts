/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import { quais } from "quais";

// Extend Window interface to include pelagus
declare global {
    interface Window {
        pelagus: any;
    }
}

const isPelagusAvailable = (): boolean => {
    return (
        typeof window !== "undefined" && typeof window.pelagus !== "undefined"
    );
};

export function useWallet() {
    const [isConnected, setIsConnected] = useState(false);
    const [account, setAccount] = useState<string>("");
    const [provider, setProvider] = useState<quais.BrowserProvider | null>(
        null
    );
    const [signer, setSigner] = useState<quais.JsonRpcSigner | null>(null);

    // Instead of storing the shard as a string, let's store the zone object directly
    // or store it as a string representation if needed for display
    const [shardZone, setShardZone] = useState<string>("");

    const connect = useCallback(async () => {
        if (isPelagusAvailable()) {
            try {
                const web3provider = new quais.BrowserProvider(window.pelagus);

                // Use quai_requestAccounts to prompt user to connect
                const accounts = await web3provider.send(
                    "quai_requestAccounts",
                    []
                );

                if (accounts && accounts.length > 0) {
                    // Get shard information for the account
                    const zone = quais.getZoneForAddress(accounts[0]);
                    // Convert the zone to a string representation if needed
                    const zoneStr = zone ? zone.toString() : "";

                    const currentSigner = await web3provider.getSigner();

                    setAccount(accounts[0]);
                    setShardZone(zoneStr);
                    setProvider(web3provider);
                    setSigner(currentSigner);
                    setIsConnected(true);

                    return {
                        success: true,
                        account: accounts[0],
                        shard: zoneStr,
                    };
                } else {
                    return { success: false, error: "No accounts returned" };
                }
            } catch (error) {
                console.error("Error connecting wallet:", error);
                return { success: false, error };
            }
        } else {
            return { success: false, error: "Pelagus wallet not found" };
        }
    }, []);

    const disconnect = useCallback(() => {
        setAccount("");
        setShardZone("");
        setProvider(null);
        setSigner(null);
        setIsConnected(false);
    }, []);

    useEffect(() => {
        // Check if already connected
        if (isPelagusAvailable()) {
            const web3provider = new quais.BrowserProvider(window.pelagus);

            // Use quai_accounts (doesn't prompt) to check existing connection
            web3provider
                .send("quai_accounts", [])
                .then((accounts: string[]) => {
                    if (accounts.length > 0) {
                        const zone = quais.getZoneForAddress(accounts[0]);
                        const zoneStr = zone ? zone.toString() : "";

                        web3provider.getSigner().then((currentSigner) => {
                            setAccount(accounts[0]);
                            setShardZone(zoneStr);
                            setProvider(web3provider);
                            setSigner(currentSigner);
                            setIsConnected(true);
                        });
                    }
                })
                .catch((err: Error) => {
                    console.log("Error getting accounts:", err);
                });

            // Listen for account changes
            window.pelagus.on("accountsChanged", (accounts: string[]) => {
                if (accounts.length > 0) {
                    const zone = quais.getZoneForAddress(accounts[0]);
                    const zoneStr = zone ? zone.toString() : "";

                    setAccount(accounts[0]);
                    setShardZone(zoneStr);

                    // Update signer when account changes
                    if (provider) {
                        provider.getSigner().then(setSigner);
                    }
                } else {
                    disconnect();
                }
            });
        }
    }, [disconnect]);

    return {
        isConnected,
        account,
        shard: shardZone,
        provider,
        signer,
        connect,
        disconnect,
    };
}
