"use client";


import CounterCardsSection from "./components/counter-card";
import ChartsSection from "./components/charts-section";

export default function HomePage() {


  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-7xl sm:p-[24px] mb-10 relative">
        <CounterCardsSection />
        <ChartsSection />
      </div>
    </div>
  );
}

