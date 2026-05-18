import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dot } from "lucide-react";

const MAConfig = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">MA (Moving Average)</CardTitle>
                    <Switch />
                </div>
                <CardDescription>Накладывает линию тренда на график цены</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                    <Slider defaultValue={[20]} max={200} step={1} className="flex-1" />
                    <div className="flex items-center gap-1 min-w-10 justify-end">
                        <span className="text-sm font-mono font-bold">20</span>
                        <Dot className="text-yellow-400 h-6 w-6 fill-current" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MAConfig;
