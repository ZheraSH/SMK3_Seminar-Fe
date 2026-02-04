import React from "react";
import {
  TrendingUp,
  ClipboardList,
  Activity,
  AlertTriangle
} from "lucide-react";


const COLOR = {
  green: {
    main: "#10B981",
    bg: "#ECFDF5",
    bar: "#22C55E",
    icon: TrendingUp
  },
  orange: {
    main: "#F59E0B",
    bg: "#FFFBEB",
    bar: "#F59E0B",
    icon: ClipboardList
  },
  blue: {
    main: "#3B82F6",
    bg: "#EFF6FF",
    bar: "#3B82F6",
    icon: Activity
  },
  red: {
    main: "#EF4444",
    bg: "#FEF2F2",
    bar: "#EF4444",
    icon: AlertTriangle
  }
};


export default function StatsCard({
  title,
  value,
  color = "green",
  progress = 100
}) {
  const cfg = COLOR[color] ?? COLOR.green;
  const Icon = cfg.icon;

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 w-full h-[125px] flex flex-col justify-between shadow-sm">

      <div className="flex items-start justify-between">
        <div>
          <p className="text-[13px] text-gray-500">
            {title}
          </p>
          <p
            className="text-[24px] font-semibold mt-1"
            style={{ color: cfg.main }}
          >
            {value}
          </p>
        </div>

        <div
          className="w-[40px] h-[40px] rounded-lg flex items-center justify-center"
          style={{ backgroundColor: cfg.bg }}
        >
          <Icon size={18} color={cfg.main} />
        </div>
      </div>

      <div>
        <p className="text-[11px] text-gray-400 mb-1">
          Bulan ini
        </p>
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              backgroundColor: cfg.bar
            }}
          />
        </div>
      </div>
    </div>
  );
}
