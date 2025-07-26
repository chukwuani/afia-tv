import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { Separator } from "../../../../components/ui/separator";

// Navigation menu items data
const navigationItems = [
  { name: "Dashboard", icon: "/group.png", active: true },
  { name: "Content", icon: "/group-1.png", active: false },
  { name: "Analytics", icon: "/group-2.png", active: false },
  { name: "Community", icon: "/group-3.png", active: false },
  { name: "Subtitles", icon: "/group-4.png", active: false },
  { name: "Copyright", icon: "/group-5.png", active: false },
];

// Analytics summary data
const analyticsSummary = [
  { label: "Views", value: "0", change: "—" },
  { label: "Watch time (hours)", value: "0.0", change: "—" },
];

export const DashboardSection = () => {
  return (
    <div className="flex w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-black border-r border-[#ffffff1a] flex flex-col">
        {/* Profile section */}
        <div className="flex flex-col items-center pt-6 pb-4">
          <div className="w-28 h-28 rounded-[56px] bg-[url(/stephen-chukwuani.png)] bg-cover bg-center" />
          <div className="mt-4 text-center">
            <p className="text-white text-[15px] font-medium">Your channel</p>
            <p className="text-[#aaaaaa] text-xs tracking-[0.13px]">
              Stephen Chukwuani
            </p>
          </div>
        </div>

        {/* Navigation menu */}
        <ScrollArea className="flex-1 px-3 py-6">
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className={`flex items-center h-12 px-3 rounded-lg ${
                  item.active ? "bg-[#1f1f1f]" : ""
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <img src={item.icon} alt={item.name} className="w-5 h-5" />
                </div>
                <span
                  className={`ml-6 font-haffer !text-[0.75rem] tracking-[2.4px] uppercase text-white ${
                    item.active ? "font-medium" : "font-normal"
                  }`}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-[#282828] overflow-auto">
        {/* Header */}
        <header className="h-[55px] flex justify-between items-center px-8">
          <h1 className="text-white text-[23.2px] font-semibold">
            Channel dashboard
          </h1>
          <div className="flex space-x-2">
            {["/group-11.png", "/group-12.png", "/group-13.png"].map(
              (icon, index) => (
                <div
                  key={index}
                  className="w-[38px] h-[38px] rounded-[19px] border border-[#ffffff33] flex items-center justify-center"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <img src={icon} alt="Action" className="w-5 h-5" />
                  </div>
                </div>
              )
            )}
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Upload videos card */}
            <Card className="bg-[#282828] border-[#ffffff1a] rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="border border-dashed border-[#ffffff1a] rounded-lg p-6 flex flex-col items-center justify-center min-h-[450px]">
                  <div className="w-[152px] h-[152px] bg-[url(/no-content-illustration-v4-darkmode-svg.svg)] bg-contain bg-no-repeat bg-center" />
                  <p className="text-[#aaaaaa] text-[13px] text-center mt-4">
                    Want to see metrics on your recent video?
                    <br />
                    Upload and publish a video to get started.
                  </p>
                  <Button className="mt-6 bg-white text-[#030303] hover:bg-white/90 rounded-[18px] h-9">
                    Upload videos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Channel analytics card */}
            <Card className="bg-[#282828] border-[#ffffff1a] rounded-2xl overflow-hidden">
              <CardHeader className="pb-0 pt-6 px-6">
                <CardTitle className="text-white text-lg font-medium">
                  Channel analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div>
                  <p className="text-white text-[13px]">Current subscribers</p>
                  <p className="text-white text-[34px] tracking-[-0.34px] font-normal">
                    0
                  </p>
                </div>

                <Separator className="my-6 bg-[#ffffff1a]" />

                <div>
                  <h3 className="text-white text-[15px] font-medium">
                    Summary
                  </h3>
                  <p className="text-[#aaaaaa] text-xs tracking-[0.13px] mt-1">
                    Last 28 days
                  </p>

                  <div className="mt-4 space-y-4">
                    {analyticsSummary.map((item) => (
                      <div
                        key={item.label}
                        className="flex justify-between items-center"
                      >
                        <span className="text-white text-[13px]">
                          {item.label}
                        </span>
                        <div className="flex items-center">
                          <span className="text-white text-[13px] text-right">
                            {item.value}
                          </span>
                          <span className="text-white text-[13px] ml-4">
                            {item.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-6 bg-[#ffffff1a]" />

                <div>
                  <h3 className="text-white text-[15px] font-medium">
                    Top videos
                  </h3>
                  <p className="text-[#aaaaaa] text-xs tracking-[0.13px] mt-1">
                    Last 48 hours · Views
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="mt-6 bg-[#ffffff1a] text-white hover:bg-[#ffffff33] border-none rounded-[18px] h-9"
                >
                  Go to channel analytics
                </Button>
              </CardContent>
            </Card>

            {/* Creator Insider card */}
            <Card className="bg-[#282828] border-[#ffffff1a] rounded-2xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-0 pt-6 px-6">
                <CardTitle className="text-white text-lg font-medium">
                  Creator Insider
                </CardTitle>
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center cursor-pointer">
                    <img
                      src="/group-14.png"
                      alt="Previous"
                      className="w-2 h-3"
                    />
                  </div>
                  <span className="text-[#aaaaaa] text-xs tracking-[0.13px]">
                    1 / 2
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center cursor-pointer">
                    <img src="/group-15.png" alt="Next" className="w-2 h-3" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="w-full h-40 rounded-lg bg-[url(/none---link---adca4cbc6b8e7d2f584dd42e42971bbc0265dd87195a594130.png)] bg-cover bg-center" />
                <h3 className="text-white text-[15px] font-medium mt-4">
                  This Week at YouTube
                </h3>
                <p className="text-[#aaaaaa] text-[13px] mt-2">
                  Hello Insiders! Updates: top fan leaderboard test,
                  <br />
                  safer search experiment &amp; a reminder on yellow
                  <br />
                  icon &amp; monetization fixes.
                </p>
                <Button
                  variant="outline"
                  className="mt-4 bg-[#ffffff1a] text-white hover:bg-[#ffffff33] border-none rounded-[18px] h-9"
                >
                  Watch on YouTube
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
