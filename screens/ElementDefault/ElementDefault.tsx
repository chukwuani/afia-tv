import React from "react";
import { DashboardSection } from "./sections/DashboardSection";
import { HeaderSection } from "./sections/HeaderSection";

export const ElementDefault = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col">
        <HeaderSection />
        <DashboardSection />
      </div>
    </div>
  );
};
