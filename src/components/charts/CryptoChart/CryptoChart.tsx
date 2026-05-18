import Chart, { type ChartHandle, type ChartProps } from "@/components/Chart/Chart";
import { CandlestickSeries, type SeriesDataItemTypeMap } from "lightweight-charts";
import { forwardRef } from "react";

// Генерируем реалистичные данные для крипто-графика
const generateCandleData = (): SeriesDataItemTypeMap["Candlestick"][] => {
    const data: SeriesDataItemTypeMap["Candlestick"][] = [];
    let lastClose = 60000;

    for (let i = 0; i < 200; i++) {
        const time = new Date(2023, 0, i + 1).toISOString().split("T")[0];
        const open = lastClose + (Math.random() - 0.5) * 500;
        const close = open + (Math.random() - 0.5) * 1000;
        const high = Math.max(open, close) + Math.random() * 300;
        const low = Math.min(open, close) - Math.random() * 300;

        data.push({ time, open, high, low, close });
        lastClose = close;
    }
    return data;
};

const MOCK_CANDLES = generateCandleData();

const CryptoChart = forwardRef(
    ({ options }: Partial<ChartProps>, ref: React.ForwardedRef<ChartHandle>) => {
        const { layout, grid, timeScale, crosshair, rightPriceScale, ...otherOptionsProps } =
            options || {};

        return (
            <Chart
                ref={ref}
                series={[
                    {
                        definition: CandlestickSeries,
                        data: MOCK_CANDLES,
                        options: {
                            upColor: "#26a69a",
                            downColor: "#ef5350",
                            borderVisible: false,
                            wickUpColor: "#26a69a",
                            wickDownColor: "#ef5350",
                        },
                    },
                ]}
                options={{
                    layout: {
                        background: { color: "transparent" },
                        ...layout,
                    },
                    grid: {
                        vertLines: { color: "rgba(197, 203, 206, 0.05)" },
                        horzLines: { color: "rgba(197, 203, 206, 0.05)" },
                        ...grid,
                    },
                    rightPriceScale: {
                        borderColor: "rgba(197, 203, 206, 0.1)",
                        ...rightPriceScale,
                    },
                    timeScale: {
                        borderColor: "rgba(197, 203, 206, 0.1)",
                        timeVisible: true,
                        secondsVisible: false,
                        ...timeScale,
                    },
                    crosshair: {
                        mode: 0,
                        ...crosshair,
                    },
                    ...otherOptionsProps,
                }}
            />
        );
    },
);

export default CryptoChart;
