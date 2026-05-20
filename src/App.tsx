import ChartsContainer from "@/components/ChartsContainer/ChartsContainer";
import IndicatorCard from "@/components/indicators/IndicatorCard/IndicatorCard";
import MarketSelector from "@/components/market/MarketSelector/MarketSelector";
import MarketHeader from "@/components/MarketHeader/MarketHeader";
import { Settings, X } from "lucide-react";
import { useState } from "react";

function App() {
    const [showMobileIndicators, setShowMobileIndicators] = useState(false);

    return (
        <div className="container mx-auto grid grid-cols-1 xl:grid-cols-[3fr_1fr] 2xl:grid-cols-[4fr_1fr] overflow-hidden gap-2 w-full h-screen">
            <div className="h-full py-2 md:py-4 flex flex-col gap-2 overflow-hidden pb-20 xl:pb-0">
                <MarketHeader />
                <ChartsContainer />
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden xl:flex flex-col gap-1 pr-2 py-4 border-l bg-card/30 h-full overflow-hidden">
                <div className="px-2">
                    <MarketSelector />
                </div>
                <div className="flex-1 overflow-hidden px-2">
                    <IndicatorCard />
                </div>
            </aside>

            {/* Mobile Indicators Button */}
            <button
                onClick={() => setShowMobileIndicators(!showMobileIndicators)}
                className="fixed xl:hidden bottom-4 right-4 z-40 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
                {showMobileIndicators ? (
                    <>
                        <X size={20} />
                        <span className="hidden sm:inline">Закрыть</span>
                    </>
                ) : (
                    <>
                        <Settings size={20} />
                        <span className="hidden sm:inline">Индикаторы</span>
                    </>
                )}
            </button>

            {showMobileIndicators && (
                <div className="fixed xl:hidden inset-0 z-30 flex">
                    <div
                        className="flex-1 bg-black/50"
                        onClick={() => setShowMobileIndicators(false)}
                    />
                    <div className="w-full sm:w-80 bg-background border-l overflow-hidden flex flex-col">
                        <div className="px-4 py-3 border-b flex justify-between items-center">
                            <h3 className="font-semibold">Индикаторы</h3>
                            <button
                                onClick={() => setShowMobileIndicators(false)}
                                className="p-1 hover:bg-muted rounded transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto">
                            <div className="px-4 py-3">
                                <MarketSelector />
                            </div>
                            <div className="px-4">
                                <IndicatorCard />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
