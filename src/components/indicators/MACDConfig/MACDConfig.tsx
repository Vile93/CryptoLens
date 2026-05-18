import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTradeStore } from "@/store/trade.store";
import { Dot } from "lucide-react";

const MACDConfig = () => {
    const {
        indicators: {
            macd: { fast, slow, signal, enabled },
        },
        toggleMacd,
        changeMacdFast,
        changeMacdSignal,
        changeMacdSlow,
    } = useTradeStore();
    return (
        <Card className={cn(!enabled ? "opacity-50" : "")}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">MACD</CardTitle>
                    <Switch checked={enabled} onCheckedChange={toggleMacd} />
                </div>
                <CardDescription>Схождение/расхождение скользящих средних</CardDescription>
            </CardHeader>
            <CardContent className={cn("grid gap-6", !enabled ? "pointer-events-none" : "")}>
                <div className="space-y-2">
                    <div className="flex items-center gap-4">
                        <Slider
                            defaultValue={[fast]}
                            max={50}
                            step={1}
                            className="flex-1"
                            onValueChange={([value]) => changeMacdFast(value)}
                        />
                        <div className="flex items-center gap-1 min-w-10 justify-end">
                            <span className="text-sm font-mono">{fast}</span>
                            <Dot className="text-blue-500 h-6 w-6 fill-current" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Slider
                            defaultValue={[slow]}
                            max={100}
                            step={1}
                            className="flex-1"
                            onValueChange={([value]) => changeMacdSlow(value)}
                        />
                        <div className="flex items-center gap-1 min-w-10 justify-end">
                            <span className="text-sm font-mono">{slow}</span>
                            <Dot className="text-orange-500 h-6 w-6 fill-current" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Slider
                            defaultValue={[signal]}
                            max={30}
                            step={1}
                            className="flex-1"
                            onValueChange={([value]) => changeMacdSignal(value)}
                        />
                        <div className="flex items-center gap-1 min-w-10 justify-end">
                            <span className="text-sm font-mono">{signal}</span>
                            <Dot className="text-transparent" />
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground border-t pt-2">
                    <span>Гистограмма:</span>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span>Рост</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span>Спад</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MACDConfig;
