import { create } from "zustand";
import { persist } from "zustand/middleware";

type TradeStore = {
    market: {
        symbol: string;
        interval: string;
    };
    setMarket: (symbol: string, interval: string) => void;
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
                interval: "1h",
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
            setMarket(symbol, interval) {
                set(() => ({
                    market: {
                        symbol,
                        interval,
                    },
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
