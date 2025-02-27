interface RequestArguments {
    method: string;
    params?: unknown[] | object;
}

interface PelagusProvider {
    request: (args: RequestArguments) => Promise<unknown>;
    on: (eventName: string, handler: (accounts: string[]) => void) => void;
    removeListener: (
        eventName: string,
        handler: (accounts: string[]) => void
    ) => void;
}

declare global {
    interface Window {
        pelagus: PelagusProvider;
    }
}
