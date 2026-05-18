import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MarketSelector = () => {
    return (
        <Card className="bg-muted/20 border-border/40 overflow-hidden">
            <CardHeader className="px-3 py-1 border-b border-border/40 bg-muted/10">
                <CardTitle className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground/80">
                    Рынок и период
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2 space-y-3">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-0.5">
                        Торговая пара
                    </label>
                    <Select defaultValue="BTC/USDT">
                        <SelectTrigger className="w-full font-mono bg-background/50 h-8 text-xs">
                            <SelectValue placeholder="Выберите пару" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="BTC/USDT" className="text-xs">
                                    BTC / USDT
                                </SelectItem>
                                <SelectItem value="ETH/USDT" className="text-xs">
                                    ETH / USDT
                                </SelectItem>
                                <SelectItem value="SOL/USDT" className="text-xs">
                                    SOL / USDT
                                </SelectItem>
                                <SelectItem value="TON/USDT" className="text-xs">
                                    TON / USDT
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 ml-0.5">
                        Таймфрейм
                    </label>
                    <Tabs defaultValue="1H" className="w-full">
                        <TabsList className="grid grid-cols-5 w-full bg-background/50 h-7 p-0.5">
                            <TabsTrigger
                                value="1M"
                                className="text-[9px] h-6 uppercase font-bold px-0"
                            >
                                1м
                            </TabsTrigger>
                            <TabsTrigger
                                value="5M"
                                className="text-[9px] h-6 uppercase font-bold px-0"
                            >
                                5м
                            </TabsTrigger>
                            <TabsTrigger
                                value="15M"
                                className="text-[9px] h-6 uppercase font-bold px-0"
                            >
                                15м
                            </TabsTrigger>
                            <TabsTrigger
                                value="1H"
                                className="text-[9px] h-6 uppercase font-bold px-0"
                            >
                                1ч
                            </TabsTrigger>
                            <TabsTrigger
                                value="1D"
                                className="text-[9px] h-6 uppercase font-bold px-0"
                            >
                                1д
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardContent>
        </Card>
    );
};

export default MarketSelector;
