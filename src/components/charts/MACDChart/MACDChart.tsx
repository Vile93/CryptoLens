import Chart, { type ChartHandle, type ChartProps } from "@/components/Chart/Chart";
import type { MACDData } from "@/utils/indicators";
import { HistogramSeries, LineSeries, type SeriesDataItemTypeMap } from "lightweight-charts";
import { forwardRef } from "react";

interface FormattedMACDData {
    macd: SeriesDataItemTypeMap["Line"][];
    signal: SeriesDataItemTypeMap["Line"][];
    histogram: SeriesDataItemTypeMap["Histogram"][];
}

const formatMACDData = (data: MACDData[]): FormattedMACDData => {
    return {
        macd: data.map((d) => ({ time: d.time, value: d.macd })),
        signal: data.map((d) => ({ time: d.time, value: d.signal })),
        histogram: data.map((d) => ({
            time: d.time,
            value: d.histogram,
            color: d.histogram >= 0 ? "#26a69a" : "#ef5350",
        })),
    };
};

type Props = {
    data: MACDData[];
} & Partial<ChartProps>;

const MACDChart = forwardRef(({ options, data }: Props, ref: React.ForwardedRef<ChartHandle>) => {
    const { grid, timeScale, ...otherOptionsProps } = options || {};

    const displayData = formatMACDData(data);

    return (
        <Chart
            series={[
                {
                    definition: HistogramSeries,
                    data: displayData.histogram,
                    options: {
                        color: "#26a69a",
                        base: 0,
                        priceFormat: { type: "volume" },
                        priceScaleId: "macd-hist",
                    },
                },
                {
                    definition: LineSeries,
                    data: displayData.macd,
                    options: {
                        color: "#2962ff",
                        lineWidth: 2,
                        priceLineVisible: false,
                    },
                },
                {
                    definition: LineSeries,
                    data: displayData.signal,
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
});

export default MACDChart;
