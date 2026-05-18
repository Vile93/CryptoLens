import ChartsContainer from "@/components/ChartsContainer/ChartsContainer";
import IndicatorCard from "@/components/indicators/IndicatorCard/IndicatorCard";
import MarketSelector from "@/components/market/MarketSelector/MarketSelector";
import MarketHeader from "@/components/MarketHeader/MarketHeader";

function App() {
    return (
        <div className="container mx-auto grid xl:grid-cols-[3fr_1fr] 2xl:grid-cols-[4fr_1fr] overflow-hidden gap-2 w-full">
            <div className="h-screen py-4 flex flex-col gap-2">
                <MarketHeader />
                <ChartsContainer />
            </div>
            <aside className="flex flex-col gap-1 pr-2 py-4 border-l bg-card/30 h-screen overflow-hidden">
                <div className="px-2">
                    <MarketSelector />
                </div>
                <div className="flex-1 overflow-hidden px-2">
                    <IndicatorCard />
                </div>
            </aside>
        </div>
    );
}

export default App;
