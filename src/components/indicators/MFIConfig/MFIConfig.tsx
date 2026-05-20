import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTradeStore } from "@/store/trade.store";
import { Dot } from "lucide-react";

const MFIConfig = () => {
    const {
        changeMfiPeriod,
        indicators: {
            mfi: { enabled, period },
        },
        toggleMfi,
    } = useTradeStore();
    return (
        <Card className={cn(!enabled ? "opacity-50" : "")}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">MFI</CardTitle>
                    <Switch checked={enabled} onCheckedChange={toggleMfi} />
                </div>
                <CardDescription>Индекс денежного потока</CardDescription>
            </CardHeader>
            <CardContent className={cn("grid gap-4", !enabled ? "pointer-events-none" : "")}>
                <div className="flex items-center gap-4">
                    <Slider
                        defaultValue={[period]}
                        max={100}
                        min={0}
                        step={1}
                        className="flex-1"
                        onValueChange={([value]) => changeMfiPeriod(value)}
                    />
                    <div className="flex items-center gap-1 min-w-10 justify-end">
                        <span className="text-sm font-mono font-bold">{period}</span>
                        <Dot className="text-purple-500 h-6 w-6 fill-current" />
                    </div>
                </div>
                <div className="bg-muted/50 p-2 rounded-md text-center text-[10px] font-medium uppercase tracking-wider">
                    Зоны: 20 / 80
                </div>
            </CardContent>
        </Card>
    );
};

export default MFIConfig;
