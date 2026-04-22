"use client";


import CounterCardsSection from "./components/counter-card";
import ChartsSection from "./components/charts-section";

export default function HomePage() {


  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-1 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl py-6 sm:py-8 lg:py-10 mb-10 relative">
        <CounterCardsSection />
        <ChartsSection />
      </div>
    </div>
  );
}

