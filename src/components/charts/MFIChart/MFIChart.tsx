import Chart, { type ChartHandle, type ChartProps } from "@/components/Chart/Chart";
import type { MFIData } from "@/utils/indicators";
import { LineSeries } from "lightweight-charts";
import { forwardRef } from "react";

type Props = {
    data: MFIData[];
} & Partial<ChartProps>;

const MFIChart = forwardRef(({ options, data }: Props, ref: React.ForwardedRef<ChartHandle>) => {
    const { grid, rightPriceScale, leftPriceScale, ...otherOptionsProps } = options || {};
    const validData = data.filter((d) => !isNaN(d.value));

    return (
        <Chart
            series={[
                {
                    definition: LineSeries,
                    data: validData,
                    options: {
                        color: "#9c27b0",
                        lineWidth: 2,
                        priceLineVisible: false,
                        lastValueVisible: true,
                    },
                },
            ]}
            options={{
                grid: {
                    vertLines: { visible: false },
                    horzLines: { color: "rgba(197, 203, 206, 0.1)" },
                    ...grid,
                },
                rightPriceScale: {
                    autoScale: true,
                    scaleMargins: {
                        top: 0.1,
                        bottom: 0.1,
                    },
                    ...rightPriceScale,
                },
                leftPriceScale: {
                    visible: false,
                    ...leftPriceScale,
                },
                ...otherOptionsProps,
            }}
            ref={ref}
        />
    );
});

export default MFIChart;
