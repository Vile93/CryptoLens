import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useTradeStore } from "@/store/trade.store";
import { Dot } from "lucide-react";

const MAConfig = () => {
    const {
        indicators: {
            ma: { enabled, period },
        },
        toggleMa,
        changeMaPeriod,
    } = useTradeStore();
    return (
        <Card className={cn(!enabled ? "opacity-50" : "")}>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">MA (Moving Average)</CardTitle>
                    <Switch checked={enabled} onCheckedChange={toggleMa} />
                </div>
                <CardDescription>Накладывает линию тренда на график цены</CardDescription>
            </CardHeader>
            <CardContent className={cn("grid gap-4", !enabled ? "pointer-events-none" : "")}>
                <div className="flex items-center gap-4">
                    <Slider
                        defaultValue={[period]}
                        max={200}
                        step={1}
                        className="flex-1"
                        onValueChange={([value]) => changeMaPeriod(value)}
                    />
                    <div className="flex items-center gap-1 min-w-10 justify-end">
                        <span className="text-sm font-mono font-bold">{period}</span>
                        <Dot className="text-yellow-400 h-6 w-6 fill-current" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MAConfig;
