import { useEffect } from "react";
import type { ChartHandle } from "@/components/Chart/Chart";
import type { IChartApi, LogicalRange } from "lightweight-charts";

/**
 * Hook для синхронизации временной шкалы между несколькими графиками
 * Когда пользователь перемещается по одному графику, остальные автоматически синхронизируются
 */
export const useChartsSync = (
    mainRef: React.RefObject<ChartHandle | null>,
    macdRef: React.RefObject<ChartHandle | null>,
    mfiRef: React.RefObject<ChartHandle | null>,
    dependencies: unknown[] = [],
) => {
    useEffect(() => {
        const charts = [
            mainRef.current?.getChart(),
            macdRef.current?.getChart(),
            mfiRef.current?.getChart(),
        ].filter(Boolean) as IChartApi[];

        if (charts.length < 2) return;

        const handlers = new Map<IChartApi, (range: LogicalRange | null) => void>();

        charts.forEach((chart) => {
            const handler = (range: LogicalRange | null) => {
                if (!range) return;

                // Синхронизируем все остальные графики
                charts.forEach((ch) => {
                    if (ch !== chart) {
                        ch.timeScale().setVisibleLogicalRange(range);
                    }
                });
            };

            chart.timeScale().subscribeVisibleLogicalRangeChange(handler);
            handlers.set(chart, handler);
        });

        // Очистка подписок
        return () => {
            handlers.forEach((handler, chart) => {
                chart.timeScale().unsubscribeVisibleLogicalRangeChange(handler);
            });
        };
    }, dependencies);
};
