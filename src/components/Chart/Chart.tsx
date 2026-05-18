import {
    createChart,
    type DeepPartial,
    type IChartApi,
    type ISeriesApi,
    type SeriesDataItemTypeMap,
    type SeriesDefinition,
    type SeriesOptionsMap,
    type SeriesType,
    type TimeChartOptions,
} from "lightweight-charts";
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type ChartHandle = {
    getChart: () => IChartApi | null;
    getSeries: () => ISeriesApi<SeriesType>[] | null;
};

export type ChartProps = {
    series: SeriesConfig[];
    options?: DeepPartial<TimeChartOptions>;
};

type SeriesConfig<T extends SeriesType = SeriesType> = {
    definition: SeriesDefinition<T>;
    data: SeriesDataItemTypeMap[T][];
    options?: DeepPartial<SeriesOptionsMap[T]>;
};

const Chart = forwardRef(
    ({ options, series }: ChartProps, ref: React.ForwardedRef<ChartHandle>) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const chartRef = useRef<IChartApi | null>(null);
        const seriesListRef = useRef<ISeriesApi<SeriesType>[]>(null);
        useImperativeHandle(ref, () => ({
            getChart: () => chartRef.current,
            getSeries: () => seriesListRef.current,
        }));
        useEffect(() => {
            if (!containerRef.current) return;
            const chart = createChart(containerRef.current, {
                ...options,
            });
            chartRef.current = chart;
            series.forEach(({ definition, data, options: seriesOptions }) => {
                const series = chart.addSeries(definition, seriesOptions);
                seriesListRef.current = [...(seriesListRef.current || []), series];
                series.setData(data);
            });
            chart.timeScale().fitContent();
            return () => {
                chart.remove();
            };
        }, [options, series]);

        return <div className="w-full h-full min-w-0 min-h-0" ref={containerRef}></div>;
    },
);

export default Chart;
