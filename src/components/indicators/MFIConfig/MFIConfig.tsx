import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Dot } from "lucide-react";

const MFIConfig = () => {
    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">MFI</CardTitle>
                    <Switch />
                </div>
                <CardDescription>Индекс денежного потока</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                    <Slider defaultValue={[14]} max={50} step={1} className="flex-1" />
                    <div className="flex items-center gap-1 min-w-10 justify-end">
                        <span className="text-sm font-mono font-bold">14</span>
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
