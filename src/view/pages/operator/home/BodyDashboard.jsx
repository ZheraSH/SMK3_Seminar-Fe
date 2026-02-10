"use client";


import CounterCardsSection from "./components/CounterCard";
import ChartsSection from "./components/ChartsSection";


   //MAIN
export default function MainDashboard() {

  if (loading) {
    return <LoadingData loading={loading} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-7xl sm:p-[24px] mb-10 relative">
        <CounterCardsSection />
        <ChartsSection />
      </div>
    </div>
  );
}
