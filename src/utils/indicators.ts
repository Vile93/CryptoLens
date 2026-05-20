import type { CandlestickData, Time } from "lightweight-charts";

// EMA: возвращает массив той же длины, что и input; первые (period - 1) элементов = NaN
const calculateEMA = (values: number[], period: number): number[] => {
    const ema: number[] = new Array(values.length).fill(NaN);
    if (values.length < period) return ema;

    const multiplier = 2 / (period + 1);

    // Считаем стартовое SMA для инициализации
    let sum = 0;
    for (let i = 0; i < period; i++) {
        sum += values[i];
    }

    let prevEMA = sum / period;
    ema[period - 1] = prevEMA;

    // Считаем последующие EMA
    for (let i = period; i < values.length; i++) {
        const currentEMA = (values[i] - prevEMA) * multiplier + prevEMA;
        ema[i] = currentEMA;
        prevEMA = currentEMA;
    }

    return ema;
};

export interface MACDData {
    time: Time;
    macd: number;
    signal: number;
    histogram: number;
}

// MACD data type
export const calculateMACD = (
    candles: CandlestickData<Time>[],
    fast: number,
    slow: number,
    signal: number,
): MACDData[] => {
    if (candles.length < slow) return [];

    const closes = candles.map((c) => c.close);
    const fastEMA = calculateEMA(closes, fast);
    const slowEMA = calculateEMA(closes, slow);

    // Считаем линию MACD (массивы одной длины, индексы совпадают со свечами)
    const macdLine = fastEMA.map((f, idx) => {
        const s = slowEMA[idx];
        return !isNaN(f) && !isNaN(s) ? f - s : NaN;
    });

    // Фильтруем валидные значения для расчета сигнальной линии
    const firstValidMacdIdx = macdLine.findIndex((v) => !isNaN(v));
    const validMacdValues = macdLine.slice(firstValidMacdIdx);

    const validSignalLine = calculateEMA(validMacdValues, signal);

    // Склеиваем сигнальную линию обратно в полный размер исходного массива
    const signalLine = new Array(macdLine.length).fill(NaN);
    for (let i = 0; i < validSignalLine.length; i++) {
        signalLine[firstValidMacdIdx + i] = validSignalLine[i];
    }

    // Собираем финальный результат без сдвигов по времени
    const result: MACDData[] = [];
    for (let i = 0; i < candles.length; i++) {
        if (!isNaN(macdLine[i]) && !isNaN(signalLine[i])) {
            result.push({
                time: candles[i].time,
                macd: macdLine[i],
                signal: signalLine[i],
                histogram: macdLine[i] - signalLine[i],
            });
        }
    }

    return result;
};

export interface MFIData {
    time: Time;
    value: number;
}

export const calculateMFI = (candles: CandlestickData<Time>[], period: number): MFIData[] => {
    // Для расчета разницы цен внутри периода нам физически нужно минимум (period + 1) свечей
    if (candles.length < period + 1) return [];

    const result: MFIData[] = [];

    // 1. Предрасчитываем типичные цены и сырой денежный поток для ВСЕХ свечей сразу
    const typicalPrices = candles.map((c) => (c.high + c.low + c.close) / 3);
    const rawMoneyFlows = candles.map((c, i) => typicalPrices[i] * ((c as any).volume ?? 1));

    // 2. Идем по графику начиная с индекса, где уже накопился нужный период
    for (let i = period; i < candles.length; i++) {
        let positiveFlow = 0;
        let negativeFlow = 0;

        // Смотрим назад на `period` свечей
        for (let j = i - period + 1; j <= i; j++) {
            // Сравниваем типичную цену текущей свечи [j] с ПРЕДЫДУЩЕЙ НА ГРАФИКЕ [j-1]
            if (typicalPrices[j] > typicalPrices[j - 1]) {
                positiveFlow += rawMoneyFlows[j];
            } else if (typicalPrices[j] < typicalPrices[j - 1]) {
                negativeFlow += rawMoneyFlows[j];
            }
        }

        // Защита от деления на ноль и крайних состояний рынка
        let mfi = 50; // дефолт если движений нет
        if (negativeFlow === 0 && positiveFlow > 0) {
            mfi = 100;
        } else if (positiveFlow === 0 && negativeFlow > 0) {
            mfi = 0;
        } else if (negativeFlow !== 0) {
            const moneyFlowRatio = positiveFlow / negativeFlow;
            mfi = 100 - 100 / (1 + moneyFlowRatio);
        }

        result.push({
            time: candles[i].time,
            value: mfi,
        });
    }

    return result;
};
