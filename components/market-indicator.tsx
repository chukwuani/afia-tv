import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const MarketIndicator = () => {
  // Market data that can be mapped over
  const marketData = [
    { symbol: "SPX", value: "5,970.81", change: null },
    { symbol: "IXIC", value: "19,460.49", change: null },
    { symbol: "DJI", value: "42,427.74", change: null },
    { symbol: "STOXX", value: "552.89", change: "+0.34%", positive: true },
    { symbol: "FTSE", value: "8,823.88", change: "+0.26%", positive: true },
    { symbol: "N225", value: "37,554.49", change: "-0.51%", positive: false },
  ];

  return (
    <Card className="w-full border-0 rounded-none shadow-none font-haffer bg-transparent overflow-hidden">
      <CardContent className="p-0 bg-transparent">
        <div className="flex items-center h-[44px] border-y border-[#ffffff2b]">
          <div className="flex flex-1 h-10 ml-[30px]">
            {marketData.map((item, index) => (
              <div key={index} className="flex items-center h-10 mr-4">
                <span className="font-medium text-white text-[12.6px] leading-[14px] whitespace-nowrap">
                  {item.symbol}
                </span>
                <span className="ml-2 font-normal text-muted-foreground text-[12.6px] leading-[14px] whitespace-nowrap">
                  {item.value}
                </span>
                {item.change && (
                  <span
                    className={`ml-3 font-normal text-[12.8px] leading-[14px] whitespace-nowrap ${
                      item.positive ? "text-[#387c2b]" : "text-[#a00000]"
                    }`}
                  >
                    {item.positive ? (
                      <ArrowUpIcon className="inline w-3 h-3 mr-0.5" />
                    ) : (
                      <ArrowDownIcon className="inline w-3 h-3 mr-0.5" />
                    )}
                    {item.change}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center mr-4">
            <ArrowRightIcon className="w-4 h-4 text-blue-600 mr-1" />
            <span className="font-medium text-white text-[12.6px] leading-[14px] whitespace-nowrap">
              Get real-time market data
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketIndicator;
