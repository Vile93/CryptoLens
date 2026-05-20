export const intervalFormatter = (interval: number) => {
    switch (interval) {
        case 60:
            return "1m";
        case 300:
            return "5m";
        case 900:
            return "15m";
        case 3600:
            return "1h";
        case 86400:
            return "1d";
        default:
            return String(interval);
    }
};
