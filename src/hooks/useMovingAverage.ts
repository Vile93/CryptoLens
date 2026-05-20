import { useEffect } from "react";
import type { CandlestickData, Time, SeriesDataItemTypeMap } from "lightweight-charts";
import type { ChartHandle } from "@/components/Chart/Chart";
import { calculateSMA } from "@/utils/indicators";

export const useMovingAverage = (
    chartRef: React.RefObject<ChartHandle | null>,
    candles: CandlestickData<Time>[],
    period: number,
    enabled: boolean,
) => {
    useEffect(() => {
        const series = chartRef.current?.getSeries();
        if (!series || series.length < 2) return;
        const maSeries = series[1];
        if (!maSeries) return;
        if (!enabled) {
            maSeries.applyOptions({ visible: false });
            return;
        }
        maSeries.applyOptions({ visible: true });
        if (candles.length < period) {
            return;
        }
        const closes = candles.map((c) => c.close);
        const smaValues = calculateSMA(closes, period);
        const maData: SeriesDataItemTypeMap["Line"][] = [];
        for (let i = 0; i < smaValues.length; i++) {
            const candleIndex = i + period - 1;
            maData.push({
                time: candles[candleIndex].time,
                value: smaValues[i],
            });
        }

        maSeries.setData(maData);
    }, [candles, period, enabled]);
};
