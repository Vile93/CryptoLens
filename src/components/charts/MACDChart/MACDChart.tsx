import Chart, { type ChartHandle, type ChartProps } from "@/components/Chart/Chart";
import { HistogramSeries, LineSeries, type SeriesDataItemTypeMap } from "lightweight-charts";
import { forwardRef } from "react";

interface MACDData {
    macd: SeriesDataItemTypeMap["Line"][];
    signal: SeriesDataItemTypeMap["Line"][];
    histogram: SeriesDataItemTypeMap["Histogram"][];
}

const generateMACDData = (): MACDData => {
    const data: MACDData = { macd: [], signal: [], histogram: [] };
    let prevSignal = 0;

    for (let i = 0; i < 150; i++) {
        const time = new Date(2023, 0, i + 1).toISOString().split("T")[0];
        const macdValue =
            Math.sin(i * 0.15) * 15 + Math.cos(i * 0.05) * 5 + (Math.random() - 0.5) * 3;
        const signalValue = prevSignal * 0.85 + macdValue * 0.15;
        const histValue = macdValue - signalValue;

        data.macd.push({ time, value: macdValue });
        data.signal.push({ time, value: signalValue });
        data.histogram.push({
            time,
            value: histValue,
            color: histValue >= 0 ? "#26a69a" : "#ef5350",
        });

        prevSignal = signalValue;
    }
    return data;
};

const MOCK_MACD = generateMACDData();

const MACDChart = forwardRef(
    ({ options }: Partial<ChartProps>, ref: React.ForwardedRef<ChartHandle>) => {
        const { grid, timeScale, ...otherOptionsProps } = options || {};
        return (
            <Chart
                series={[
                    {
                        definition: HistogramSeries,
                        data: MOCK_MACD.histogram,
                        options: {
                            color: "#26a69a",
                            base: 0,
                            priceFormat: { type: "volume" },
                            priceScaleId: "macd-hist",
                        },
                    },
                    {
                        definition: LineSeries,
                        data: MOCK_MACD.macd,
                        options: {
                            color: "#2962ff",
                            lineWidth: 2,
                            priceLineVisible: false,
                        },
                    },
                    {
                        definition: LineSeries,
                        data: MOCK_MACD.signal,
                        options: {
                            color: "#ff6d00",
                            lineWidth: 2,
                            priceLineVisible: false,
                        },
                    },
                ]}
                options={{
                    grid: {
                        vertLines: { color: "transparent" },
                        horzLines: { color: "rgba(197, 203, 206, 0.2)" },
                        ...grid,
                    },
                    timeScale: {
                        borderVisible: false,
                        ...timeScale,
                    },
                    ...otherOptionsProps,
                }}
                ref={ref}
            />
        );
    },
);

export default MACDChart;
