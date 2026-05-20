import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CandlestickData, Time } from "lightweight-charts";

type TradeStore = {
    market: {
        symbol: string;
        interval: number;
        ohlc: {
            open: number;
            high: number;
            low: number;
            close: number;
        };
        currentPrice: number;
        change24h: number;
    };
    setMarket: (market: TradeStore["market"]) => void;
    candles: CandlestickData<Time>[];
    setCandleData: (candles: CandlestickData<Time>[]) => void;
    updateLatestCandle: (candle: CandlestickData<Time>) => void;
    appendCandle: (candle: CandlestickData<Time>) => void;
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
    indicators: {
        ma: {
            period: number;
            enabled: boolean;
        };
        macd: {
            fast: number;
            slow: number;
            signal: number;
            enabled: boolean;
        };
        mfi: {
            period: number;
            enabled: boolean;
        };
    };
    setMa: (period: number, enabled: boolean) => void;
    toggleMa: () => void;
    changeOhlc: (ohlc: { open: number; high: number; low: number; close: number }) => void;
    changeInterval: (interval: number) => void;
    changeMaPeriod: (period: number) => void;
    setMacd: (fast: number, slow: number, signal: number, enabled: boolean) => void;
    changeMacdFast: (fast: number) => void;
    changeMacdSlow: (slow: number) => void;
    changeMacdSignal: (signal: number) => void;
    toggleMacd: () => void;
    setMfi: (period: number, enabled: boolean) => void;
    toggleMfi: () => void;
    changeMfiPeriod: (period: number) => void;
};

export const useTradeStore = create<TradeStore>()(
    persist(
        (set, get) => ({
            market: {
                symbol: "BTCUSDT",
                interval: 3600,
                ohlc: {
                    open: 0,
                    high: 0,
                    low: 0,
                    close: 0,
                },
                currentPrice: 60000,
                change24h: 0,
            },
            candles: [],
            isLoading: false,
            setCandleData(candles) {
                set(() => ({ candles }));
            },
            updateLatestCandle(candle) {
                const state = get();
                if (state.candles.length === 0) {
                    set(() => ({ candles: [candle] }));
                    return;
                }

                const updated = [...state.candles];
                const lastCandle = updated[updated.length - 1]!;

                // Если это обновление текущей свечи (одинаковое время)
                if (lastCandle.time === candle.time) {
                    updated[updated.length - 1] = candle;
                } else {
                    // Если это новая свеча
                    updated.push(candle);
                    // Ограничиваем размер массива чтобы не использовать слишком много памяти
                    if (updated.length > 1000) {
                        updated.shift();
                    }
                }

                set(() => ({ candles: updated }));

                // Обновляем OHLC при получении новых данных
                get().changeOhlc({
                    open: candle.open,
                    high: candle.high,
                    low: candle.low,
                    close: candle.close,
                });
            },
            appendCandle(candle) {
                const state = get();
                const updated = [...state.candles, candle];

                // Ограничиваем размер массива
                if (updated.length > 1000) {
                    updated.shift();
                }

                set(() => ({ candles: updated }));
            },
            setLoading(loading) {
                set(() => ({ isLoading: loading }));
            },
            changeOhlc(ohlc) {
                const { setMarket, market } = get();
                setMarket({
                    ...market,
                    ohlc: {
                        open: ohlc.open ?? 0,
                        high: ohlc.high ?? 0,
                        low: ohlc.low ?? 0,
                        close: ohlc.close ?? 0,
                    },
                });
            },
            changeInterval(interval) {
                const { setMarket, market } = get();
                setMarket({ ...market, interval });
            },
            indicators: {
                ma: {
                    period: 14,
                    enabled: true,
                },
                macd: {
                    fast: 12,
                    slow: 26,
                    signal: 9,
                    enabled: true,
                },
                mfi: {
                    period: 14,
                    enabled: true,
                },
            },
            setMfi(period, enabled) {
                set((state) => ({
                    indicators: {
                        ...state.indicators,
                        mfi: {
                            period,
                            enabled,
                        },
                    },
                }));
            },
            setMacd(fast, slow, signal, enabled) {
                set((state) => ({
                    indicators: {
                        ...state.indicators,
                        macd: {
                            fast,
                            slow,
                            signal,
                            enabled,
                        },
                    },
                }));
            },
            setMa(period, enabled) {
                set((state) => ({
                    indicators: {
                        ...state.indicators,
                        ma: {
                            period,
                            enabled,
                        },
                    },
                }));
            },
            changeMaPeriod: (period) => {
                const { setMa } = get();
                setMa(period, get().indicators.ma.enabled);
            },
            setMarket(market) {
                set(() => ({
                    market,
                }));
            },
            toggleMa() {
                const { setMa } = get();
                setMa(get().indicators.ma.period, !get().indicators.ma.enabled);
            },
            toggleMacd() {
                const { setMacd } = get();
                setMacd(
                    get().indicators.macd.fast,
                    get().indicators.macd.slow,
                    get().indicators.macd.signal,
                    !get().indicators.macd.enabled,
                );
            },
            changeMacdFast: (fast) => {
                const { setMacd } = get();
                setMacd(
                    fast,
                    get().indicators.macd.slow,
                    get().indicators.macd.signal,
                    get().indicators.macd.enabled,
                );
            },
            changeMacdSlow: (slow) => {
                const { setMacd } = get();
                setMacd(
                    get().indicators.macd.fast,
                    slow,
                    get().indicators.macd.signal,
                    get().indicators.macd.enabled,
                );
            },
            changeMacdSignal: (signal) => {
                const { setMacd } = get();
                setMacd(
                    get().indicators.macd.fast,
                    get().indicators.macd.slow,
                    signal,
                    get().indicators.macd.enabled,
                );
            },
            toggleMfi() {
                const { setMfi } = get();
                setMfi(get().indicators.mfi.period, !get().indicators.mfi.enabled);
            },
            changeMfiPeriod: (period) => {
                const { setMfi } = get();
                setMfi(period, get().indicators.mfi.enabled);
            },
        }),
        {
            name: "trade-store",
            partialize: (state) => ({
                market: state.market,
                indicators: state.indicators,
            }),
        },
    ),
);
