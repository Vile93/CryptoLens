import type { CandlestickData, Time } from "lightweight-charts";

export interface BinanceCandle {
    time: Time;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    closeTime: number;
    quoteVolume: number;
    trades: number;
    baseVolume: number;
    quoteBaseVolume: number;
}

export interface CandleUpdate {
    symbol: string;
    interval: string;
    data: CandlestickData<Time>;
}

type CandleCallback = (data: CandleUpdate) => void;

const INTERVAL_MAP: Record<number, { binance: string; seconds: number }> = {
    60: { binance: "1m", seconds: 60 },
    180: { binance: "3m", seconds: 180 },
    300: { binance: "5m", seconds: 300 },
    900: { binance: "15m", seconds: 900 },
    1800: { binance: "30m", seconds: 1800 },
    3600: { binance: "1h", seconds: 3600 },
    7200: { binance: "2h", seconds: 7200 },
    14400: { binance: "4h", seconds: 14400 },
    21600: { binance: "6h", seconds: 21600 },
    28800: { binance: "8h", seconds: 28800 },
    43200: { binance: "12h", seconds: 43200 },
    86400: { binance: "1d", seconds: 86400 },
    259200: { binance: "3d", seconds: 259200 },
    604800: { binance: "1w", seconds: 604800 },
    2592000: { binance: "1M", seconds: 2592000 },
};

class BinanceService {
    private static readonly REST_BASE = "https://api.binance.com/api/v3";
    private static readonly WS_BASE = "wss://stream.binance.com:9443/ws";
    private ws: WebSocket | null = null;
    private callbacks: Map<string, CandleCallback[]> = new Map();
    private wsUrl: string | null = null;

    async getCandles(
        symbol: string,
        interval: number,
        limit: number = 500,
    ): Promise<CandlestickData<Time>[]> {
        const intervalInfo = INTERVAL_MAP[interval];
        if (!intervalInfo) {
            throw new Error(`Unsupported interval: ${interval} seconds`);
        }

        try {
            const params = new URLSearchParams({
                symbol: symbol.toUpperCase(),
                interval: intervalInfo.binance,
                limit: Math.min(limit, 1000).toString(),
            });

            const response = await fetch(`${BinanceService.REST_BASE}/klines?${params}`);

            if (!response.ok) {
                throw new Error(`Binance API error: ${response.statusText}`);
            }

            const data = (await response.json()) as Array<unknown[]>;

            return data.map((candle) => {
                const [openTime, open, high, low, close] = candle;
                return {
                    time: Math.floor((openTime as number) / 1000) as Time,
                    open: parseFloat(open as string),
                    high: parseFloat(high as string),
                    low: parseFloat(low as string),
                    close: parseFloat(close as string),
                };
            });
        } catch (error) {
            console.error("Failed to fetch candles:", error);
            throw error;
        }
    }

    subscribe(symbol: string, interval: number, callback: CandleCallback): () => void {
        const key = `${symbol}_${interval}`;
        if (!this.callbacks.has(key)) {
            this.callbacks.set(key, []);
        }
        this.callbacks.get(key)!.push(callback);
        if (this.callbacks.size === 1 || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
            this.connectWebSocket(symbol);
        }
        return () => {
            const callbacks = this.callbacks.get(key);
            if (callbacks) {
                const index = callbacks.indexOf(callback);
                if (index > -1) {
                    callbacks.splice(index, 1);
                }
                if (callbacks.length === 0) {
                    this.callbacks.delete(key);
                }
            }
            if (this.callbacks.size === 0) {
                this.disconnectWebSocket();
            }
        };
    }

    private connectWebSocket(symbol: string): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            return;
        }

        const streamName = `${symbol.toLowerCase()}@kline_1m`;
        this.wsUrl = `${BinanceService.WS_BASE}/${streamName}`;

        this.ws = new WebSocket(this.wsUrl);

        this.ws.addEventListener("message", (event) => {
            try {
                const message = JSON.parse(event.data as string);

                // Проверяем, что это сообщение о свече (k - это kline/свеча)
                if (!message.k || !("c" in message.k)) {
                    return;
                }

                const kline = message.k;

                // Преобразуем 1m свечу в данные свечи
                const candleTime = Math.floor((kline.t as number) / 1000) as Time;
                const candleData: CandlestickData<Time> = {
                    time: candleTime,
                    open: parseFloat(kline.o as string),
                    high: parseFloat(kline.h as string),
                    low: parseFloat(kline.l as string),
                    close: parseFloat(kline.c as string),
                };

                // Отправляем всем подписчикам с корректным интервалом
                this.callbacks.forEach((callbacks, key) => {
                    const [, intervalStr] = key.split("_");
                    const interval = parseInt(intervalStr);
                    callbacks.forEach((callback) => {
                        callback({
                            symbol: message.s,
                            interval: intervalStr,
                            data: candleData,
                        });
                    });
                });
            } catch (error) {
                console.error("Failed to parse WebSocket message:", error);
            }
        });

        this.ws.addEventListener("error", (error) => {
            console.error("WebSocket error:", error);
        });

        this.ws.addEventListener("close", () => {
            console.log("WebSocket disconnected");
            this.ws = null;
        });
    }

    /**
     * Отключиться от WebSocket
     */
    private disconnectWebSocket(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.wsUrl = null;
    }

    /**
     * Получить поддерживаемые интервалы (в секундах)
     */
    getSupportedIntervals(): number[] {
        return Object.keys(INTERVAL_MAP)
            .map((k) => parseInt(k))
            .sort((a, b) => a - b);
    }

    /**
     * Проверить, поддерживается ли интервал
     */
    isIntervalSupported(interval: number): boolean {
        return interval in INTERVAL_MAP;
    }

    /**
     * Получить информацию об интервале
     */
    getIntervalInfo(interval: number): { binance: string; seconds: number } | null {
        return INTERVAL_MAP[interval] || null;
    }
}

export const binanceService = new BinanceService();
