"use client";
import React, { useEffect, useState } from "react";

//Animasi Count Sementara ya cuy
export function SummaryCard({ title, value, color, duration = 1200 }) {
  const cleanedValue = Number.parseInt(value, 10);
  const safeValue = Number.isFinite(cleanedValue) ? cleanedValue : 0;

  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round(duration / 16);

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      setCount(Math.round(progress * safeValue));

      if (frame >= totalFrames) {
        clearInterval(interval);
        setCount(safeValue);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [safeValue, duration]);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-5.5 flex items-start gap-4">
      <div
        className="rounded-full"
        style={{
          width: "4px",
          backgroundColor: color,
          alignSelf: "stretch",
        }}
      />
      <div className="flex flex-col">
        <p className="text-[12px] font-semibold text-gray-800">{title}</p>
        <p className="text-[24px] font-semibold leading-none" style={{ color }}>
          {count}
        </p>
      </div>
    </div>
  );
}
