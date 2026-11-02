declare global {
    const process: {
        readonly env: {
            readonly API_URL?: string;
            readonly API_KEY?: string;
        };
    };
}

export {};
