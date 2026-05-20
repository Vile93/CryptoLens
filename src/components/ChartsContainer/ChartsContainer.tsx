import type { ChartHandle } from "@/components/Chart/Chart";
import CryptoChart from "@/components/charts/CryptoChart/CryptoChart";
import MACDChart from "@/components/charts/MACDChart/MACDChart";
import MFIChart from "@/components/charts/MFIChart/MFIChart";
import { useBinanceCandles } from "@/hooks/useBinanceCandles";
import { useChartsSync } from "@/hooks/useChartsSync";
import { useOhlcSync } from "@/hooks/useOhlcSync";
import { cn } from "@/lib/utils";
import { useTradeStore } from "@/store/trade.store";
import { calculateMACD, calculateMFI } from "@/utils/indicators";
import { useEffect, useRef } from "react";

const ChartsContainer = () => {
    const indicators = useTradeStore((state) => state.indicators);
    const candles = useTradeStore((state) => state.candles);
    const macdData = calculateMACD(
        candles,
        indicators.macd.fast,
        indicators.macd.slow,
        indicators.macd.signal,
    );
    const mfiData = calculateMFI(candles, indicators.mfi.period);
    const { isLoading } = useBinanceCandles();
    const mainRef = useRef<ChartHandle>(null);
    const macdRef = useRef<ChartHandle>(null);
    const mfiRef = useRef<ChartHandle>(null);
    useChartsSync(mainRef, macdRef, mfiRef, [indicators]);
    useOhlcSync(mainRef, candles);

    return (
        <div
            className={cn(
                "flex flex-col gap-2 h-full min-h-0",
                isLoading && "pointer-events-none opacity-50",
            )}
        >
            <div className="flex-3 min-h-0 bg-card/20 rounded-lg border overflow-hidden">
                <CryptoChart ref={mainRef} series={candles} />
            </div>
            {indicators.macd.enabled && (
                <div className="flex-1 min-h-0 bg-card/20 rounded-lg border overflow-hidden">
                    <MACDChart
                        ref={macdRef}
                        data={macdData}
                        options={{
                            timeScale: {
                                visible: false,
                            },
                        }}
                    />
                </div>
            )}
            {indicators.mfi.enabled && (
                <div className="flex-1 min-h-0 bg-card/20 rounded-lg border overflow-hidden">
                    <MFIChart
                        ref={mfiRef}
                        data={mfiData}
                        options={{
                            timeScale: {
                                visible: false,
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default ChartsContainer;
