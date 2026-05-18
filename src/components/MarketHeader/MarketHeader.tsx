const MarketHeader = () => {
    return (
        <div className="flex items-center justify-between h-12 px-1">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <span className="text-3xl font-black tracking-tighter">BTC / USDT</span>
                    <span className="px-2 py-1 rounded bg-secondary text-sm font-bold border">
                        1H
                    </span>
                </div>
                <div className="h-6 w-px bg-border mx-1" />
                <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-mono font-bold tracking-tight">60,000.00</span>
                    <span className="text-lg font-bold text-green-500">+3.23%</span>
                    <span className="text-sm text-foreground font-semibold">(+$2,000.00)</span>
                </div>
            </div>
            <div className="flex items-center gap-6 font-mono text-sm tracking-tight text-foreground">
                <div className="flex items-center gap-4 font-mono text-base tracking-tight text-foreground">
                    <div className="flex gap-2 items-center">
                        <span className="font-black text-primary/70">O</span>
                        <span className="font-bold">3212.0</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="font-black text-primary/70">H</span>
                        <span className="font-bold text-green-500">3532.5</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="font-black text-primary/70">L</span>
                        <span className="font-bold text-red-500">3012.2</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span className="font-black text-primary/70">C</span>
                        <span className="font-bold">3323.8</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketHeader;
