import { useTradeStore } from "@/store/trade.store";
import { intervalFormatter } from "@/utils/interval-formatter";

const MarketHeader = () => {
    const {
        market: { ohlc, symbol, interval, currentPrice },
    } = useTradeStore();

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-4 px-1 md:h-12">
            <div className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xl md:text-3xl font-black tracking-tighter">
                        {symbol}
                    </span>
                    <span className="px-2 py-1 rounded bg-secondary text-xs md:text-sm font-bold border">
                        {intervalFormatter(interval).toUpperCase()}
                    </span>
                </div>
                <div className="hidden md:block h-6 w-px bg-border mx-1" />
                <div className="flex items-baseline gap-2 md:gap-3">
                    <span className="text-lg md:text-3xl font-mono font-bold tracking-tight">
                        {currentPrice.toFixed(2)}$
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-3 md:gap-6 font-mono text-xs md:text-sm tracking-tight text-foreground">
                <div className="flex items-center gap-2 md:gap-4 font-mono text-xs md:text-base tracking-tight text-foreground">
                    <div className="flex gap-1 md:gap-2 items-center">
                        <span className="font-black text-primary/70">O</span>
                        <span className="font-bold">{ohlc.open.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-1 md:gap-2 items-center">
                        <span className="font-black text-primary/70">H</span>
                        <span className="font-bold text-green-500">{ohlc.high.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-1 md:gap-2 items-center">
                        <span className="font-black text-primary/70">L</span>
                        <span className="font-bold text-red-500">{ohlc.low.toFixed(2)}</span>
                    </div>
                    <div className="flex gap-1 md:gap-2 items-center">
                        <span className="font-black text-primary/70">C</span>
                        <span className="font-bold">{ohlc.close.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketHeader;
