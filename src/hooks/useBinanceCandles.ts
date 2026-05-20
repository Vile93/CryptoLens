import { binanceService } from "@/services/binance.service";
import { useTradeStore } from "@/store/trade.store";
import { useEffect, useRef } from "react";

export const useBinanceCandles = () => {
    const symbol = useTradeStore((state) => state.market.symbol);
    const interval = useTradeStore((state) => state.market.interval);
    const unsubscribeRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        const { setLoading, setCandleData, updateCurrentPrice, updateLatestCandle } =
            useTradeStore.getState();
        let isMounted = true;
        const loadData = async () => {
            try {
                setLoading(true);

                if (!binanceService.isIntervalSupported(interval)) {
                    console.warn(
                        `Interval ${interval}s is not supported. Supported intervals:`,
                        binanceService.getSupportedIntervals(),
                    );
                    setLoading(false);
                    return;
                }

                const candles = await binanceService.getCandles(symbol, interval, 500);
                if (!isMounted) return;
                setCandleData(candles);
                if (candles.length > 0) {
                    updateCurrentPrice(candles[candles.length - 1]!.close);
                }
                unsubscribeRef.current = binanceService.subscribe(symbol, interval, (update) => {
                    if (isMounted) {
                        updateLatestCandle(update.data);
                    }
                });
            } catch (error) {
                console.error("Failed to load candles:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();

        return () => {
            isMounted = false;
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
                unsubscribeRef.current = null;
            }
        };
    }, [symbol, interval]);

    return {
        isLoading: useTradeStore((state) => state.isLoading),
        candles: useTradeStore((state) => state.candles),
    };
};

export const useIntervalInfo = (interval: number) => {
    return binanceService.getIntervalInfo(interval);
};

export const useSupportedIntervals = () => {
    return binanceService.getSupportedIntervals();
};
