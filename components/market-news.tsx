import { ChevronRight } from "lucide-react";

export default function MarketNews() {
  const newsItems = [
    {
      headline:
        "US stocks heal from tariff pain but trade news to keep markets edgy",
      timestamp: "11:04 AM GMT+1",
    },
    {
      headline: "Wall Street futures muted as investors await key jobs data",
      timestamp: "12:24 PM GMT+1",
    },
    {
      headline:
        "Sterling holds its own against stronger dollar, trade optimism lends supports",
      timestamp: "30 min ago",
    },
    {
      headline:
        "UK statistics agency says April inflation data overstated by 0.1 percentage points",
      timestamp: "an hour ago",
    },
  ];

  return (
    <div className="p-6 lg:px-12">
      {/* Markets Header */}
      <div className="flex items-center mb-8">
        <h1 className="text-white text-2xl font-medium">Markets</h1>
        <ChevronRight className="w-6 h-6 text-[#404040] ml-1" />
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {newsItems.map((item, index) => (
          <div key={index} className="space-y-3">
            <h2 className="text-white text-base font-normal leading-7 tracking-wide font-epilogue">
              {item.headline}
            </h2>
            <p className="text-muted-foreground text-xs font-outfit">
              {item.timestamp}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
