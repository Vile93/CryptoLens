import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dot } from "lucide-react";

const MACDConfig = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">MACD</CardTitle>
                    <Switch />
                </div>
                <CardDescription>Схождение/расхождение скользящих средних</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-4">
                        <Slider defaultValue={[12]} max={50} step={1} className="flex-1" />
                        <div className="flex items-center gap-1 min-w-10 justify-end">
                            <span className="text-sm font-mono">12</span>
                            <Dot className="text-blue-500 h-6 w-6 fill-current" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Slider defaultValue={[26]} max={100} step={1} className="flex-1" />
                        <div className="flex items-center gap-1 min-w-10 justify-end">
                            <span className="text-sm font-mono">26</span>
                            <Dot className="text-orange-500 h-6 w-6 fill-current" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Slider defaultValue={[9]} max={30} step={1} className="flex-1" />
                        <div className="flex items-center gap-1 min-w-10 justify-end">
                            <span className="text-sm font-mono">9</span>
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
