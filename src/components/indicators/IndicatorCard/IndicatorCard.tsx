import MACDConfig from "@/components/indicators/MACDConfig/MACDConfig";
import MAConfig from "@/components/indicators/MAConfig/MAConfig";
import MFIConfig from "@/components/indicators/MFIConfig/MFIConfig";

const IndicatorCard = () => {
    return (
        <div className="flex flex-col h-full bg-muted/20 rounded-lg border border-border/40">
            <div className="px-3 border-b border-border/40 bg-muted/10">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/80">
                    Индикаторы и осцилляторы
                </h3>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-3 max-h-[calc(100vh-250px)]">
                <div className="grid gap-3">
                    <MAConfig />
                    <MACDConfig />
                    <MFIConfig />
                </div>

                <div className="sticky bottom-0 h-4 bg-linear-to-t from-background/50 to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default IndicatorCard;
