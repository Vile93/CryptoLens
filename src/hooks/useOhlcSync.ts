import { useEffect } from "react";
import type { ChartHandle } from "@/components/Chart/Chart";
import { useTradeStore } from "@/store/trade.store";
import type { CandlestickData, MouseEventParams, Time } from "lightweight-charts";

export const useOhlcSync = (
    mainRef: React.RefObject<ChartHandle | null>,
    candles: CandlestickData<Time>[],
) => {
    useEffect(() => {
        const chart = mainRef.current?.getChart();
        const {
            market: { ohlc },
            changeOhlc,
        } = useTradeStore.getState();
        const series = mainRef.current?.getSeries()?.[0];

        if (
            ohlc.open === 0 &&
            ohlc.close === 0 &&
            ohlc.high === 0 &&
            ohlc.low === 0 &&
            series &&
            candles.length > 0
        ) {
            const lastCandle = candles[candles.length - 1]!;
            changeOhlc({
                open: lastCandle.open,
                high: lastCandle.high,
                low: lastCandle.low,
                close: lastCandle.close,
            });
        }

        if (!chart) return;

        const handleMove = (param: MouseEventParams<Time>) => {
            if (!param.time) return;

            const series = Array.from(param.seriesData.keys())?.[0];
            if (!series) return;

            const data = param.seriesData.get(series) as CandlestickData<Time> | undefined;
            if (!data) return;

            changeOhlc({
                open: data.open,
                high: data.high,
                low: data.low,
                close: data.close,
            });
        };

        chart.subscribeCrosshairMove(handleMove);

        return () => {
            chart.unsubscribeCrosshairMove(handleMove);
        };
    }, [mainRef, candles]);
};
