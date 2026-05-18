import Chart, { type ChartHandle, type ChartProps } from "@/components/Chart/Chart";
import { LineSeries, type SeriesDataItemTypeMap } from "lightweight-charts";
import { forwardRef } from "react";

const generateMFIData = (): SeriesDataItemTypeMap["Line"][] => {
    const data: SeriesDataItemTypeMap["Line"][] = [];
    let prevValue = 50;

    for (let i = 0; i < 150; i++) {
        const time = new Date(2023, 0, i + 1).toISOString().split("T")[0];
        // Генерация значений около уровней 20-80
        const change = (Math.random() - 0.5) * 15;
        let newValue = prevValue + change;

        // Ограничиваем индекс пределами 0-100
        if (newValue > 90) newValue = 85;
        if (newValue < 10) newValue = 15;

        data.push({ time, value: newValue });
        prevValue = newValue;
    }
    return data;
};

const MOCK_MFI = generateMFIData();

const MFIChart = forwardRef(
    ({ options }: Partial<ChartProps>, ref: React.ForwardedRef<ChartHandle>) => {
        const { grid, rightPriceScale, leftPriceScale, ...otherOptionsProps } = options || {};
        return (
            <Chart
                series={[
                    {
                        definition: LineSeries,
                        data: MOCK_MFI,
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
    },
);

export default MFIChart;
