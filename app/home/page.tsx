"use client";

import React from "react";

import { ContainerByAnima } from "@/components/ContainerByAnima";
import { HeaderByAnima } from "@/components/HeaderByAnima";
import { SectionByAnima } from "@/components/SectionByAnima";
import { SectionWrapperByAnima } from "@/components/SectionWrapperByAnima";
import TestimonialsSection from "@/components/testimonial";
import WorkflowPage from "@/components/workflow";
import Preview from "@/components/preview";

const HomePage = () => {
  return (
    <main className="flex flex-col w-full items-start">
      <div className="relative w-full">
        <HeaderByAnima />
        {/* <Preview /> */}
        <SectionWrapperByAnima />
        {/* <TestimonialsSection /> */}

        <div className="w-full">
          <SectionByAnima />
          <ContainerByAnima />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
