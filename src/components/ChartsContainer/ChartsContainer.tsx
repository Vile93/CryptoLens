import type { ChartHandle } from "@/components/Chart/Chart";
import CryptoChart from "@/components/charts/CryptoChart/CryptoChart";
import MACDChart from "@/components/charts/MACDChart/MACDChart";
import MFIChart from "@/components/charts/MFIChart/MFIChart";
import { useRef } from "react";

const ChartsContainer = () => {
    const mainRef = useRef<ChartHandle | null>(null);
    const macdRef = useRef<ChartHandle | null>(null);
    const mfiRef = useRef<ChartHandle | null>(null);
    return (
        <div className="flex flex-col gap-2 h-full min-h-0">
            <div className="flex-3 min-h-0 bg-card/20 rounded-lg border overflow-hidden">
                <CryptoChart ref={mainRef} />
            </div>
            <div className="flex-1 min-h-0 bg-card/20 rounded-lg border overflow-hidden">
                <MACDChart ref={macdRef} />
            </div>
            <div className="flex-1 min-h-0 bg-card/20 rounded-lg border overflow-hidden">
                <MFIChart ref={mfiRef} />
            </div>
        </div>
    );
};

export default ChartsContainer;
