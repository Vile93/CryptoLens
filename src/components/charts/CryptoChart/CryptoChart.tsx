import Chart, { type ChartHandle, type ChartProps } from "@/components/Chart/Chart";
import { CandlestickSeries, type SeriesDataItemTypeMap } from "lightweight-charts";
import { forwardRef } from "react";

type Props = Omit<ChartProps, "series"> & {
    series: SeriesDataItemTypeMap["Candlestick"][];
};

const CryptoChart = forwardRef(
    ({ options, series }: Props, ref: React.ForwardedRef<ChartHandle>) => {
        const { layout, grid, timeScale, crosshair, rightPriceScale, ...otherOptionsProps } =
            options || {};

        return (
            <Chart
                ref={ref}
                series={[
                    {
                        definition: CandlestickSeries,
                        data: series,
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
