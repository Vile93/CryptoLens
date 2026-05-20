import { useTradeStore } from "@/store/trade.store";
import { intervalFormatter } from "@/utils/interval-formatter";

const MarketHeader = () => {
    const {
        market: { change24h, ohlc, symbol, interval, currentPrice },
    } = useTradeStore();
    const changeColor = change24h < 0 ? "text-green-500" : "text-red-500";
    const priceChange = (currentPrice * change24h) / 100;

    return (
        <div className="flex items-center justify-between h-12 px-1">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-black tracking-tighter">{symbol}</span>
                    <span className="px-2 py-1 rounded bg-secondary text-sm font-bold border">
                        {intervalFormatter(interval).toUpperCase()}
                    </span>
                </div>
                <div className="h-6 w-px bg-border mx-1" />
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-mono font-bold tracking-tight">
                        {currentPrice.toFixed(2)}
                    </span>
                    <span className={`text-lg font-bold ${changeColor}`}>
                        {change24h > 0 ? "+" : ""}
                        {change24h.toFixed(2)}%
                    </span>
                    <span className={`text-sm text-foreground font-semibold ${changeColor}`}>
                        ({priceChange >= 0 ? "+" : "-"}${priceChange.toFixed(2)})
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-6 font-mono text-sm tracking-tight text-foreground">
                <div className="flex items-center gap-4 font-mono text-base tracking-tight text-foreground">
                    <div className="flex gap-2 items-center">
                        <span className="font-black text-primary/70">O</span>
                        <span className="font-bold">{ohlc.open.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="font-black text-primary/70">H</span>
                        <span className="font-bold text-green-500">{ohlc.high.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="font-black text-primary/70">L</span>
                        <span className="font-bold text-red-500">{ohlc.low.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="font-black text-primary/70">C</span>
                        <span className="font-bold">{ohlc.close.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketHeader;
