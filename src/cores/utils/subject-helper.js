import {
  Briefcase,
  Activity,
  Settings,
  Landmark,
  Globe,
  BookOpenText,
  Palette,
  MoonIcon,
  SquareFunction,
  FlaskRound,
  ScrollText,
  LibraryBig
} from "lucide-react"
import React from "react"

const SUBJECT_CONFIG = [
  { pattern: "pkk", icon: Briefcase, bg: "bg-[#F59E0B]" },
  { pattern: "pjok", icon: Activity, bg: "bg-[#84CC16]" },
  { pattern: "produktif", icon: Settings, bg: "bg-[#06B6D4]" },
  { pattern: "madura", icon: Landmark, bg: "bg-[#F43F5E]" },
  { pattern: "inggris", icon: Globe, bg: "bg-[#0EA5E9]" },
  { pattern: "indo", icon: BookOpenText, bg: "bg-[#6366F1]" },
  { pattern: "seni budaya", icon: Palette, bg: "bg-[#EC4899]" },
  { pattern: "seni", icon: Palette, bg: "bg-[#EC4899]" },
  { pattern: "islam", icon: MoonIcon, bg: "bg-[#15803D]" },
  { pattern: "ppkn", icon: Landmark, bg: "bg-[#EF4444]" },
  { pattern: "ipas", icon: FlaskRound, bg: "bg-[#10B981]" },
  { pattern: "sejarah", icon: ScrollText, bg: "bg-[#D97706]" },
  { pattern: "matematika", icon: SquareFunction, bg: "bg-[#8B5CF6]" },
];

export const getIconBySubject = (name) => {
  const lowerName = name.toLowerCase();
  const match = SUBJECT_CONFIG.find(item => lowerName.includes(item.pattern));
  return React.createElement(match?.icon || LibraryBig, { className: "text-white", size: 24 });
}

export const getBgColorBySubject = (name) => {
  const lowerName = name.toLowerCase();
  const match = SUBJECT_CONFIG.find(item => lowerName.includes(item.pattern));
  return match?.bg || "bg-[#3B82F6]";
}

const STATUS_BG_MAP = {
  izin: "bg-[#0EA5E9]",
  sakit: "bg-[#F59E0B]",
  dispensasi: "bg-[#22C55E]",
  hadir: "bg-[#22C55E]",
  telat: "bg-[#F59E0B]",
  alpa: "bg-[#EF4444]",
};

export const getBgColorStatus = (name) => {
  return STATUS_BG_MAP[name.toLowerCase()] || "bg-black";
}

const TIPE_BG_MAP = {
  disetujui: "bg-[#22C55E]",
  ditolak: "bg-[#EF4444]",
};

export const getBgColorTipe = (name) => {
  return TIPE_BG_MAP[name.toLowerCase()] || "bg-[#FBBF24]";
}

const ROLE_CONFIG = [
  { patterns: ["wali kelas", "homeroom"], style: "bg-[#10B981] text-white" },
  { patterns: ["guru pengajar", "teacher"], style: "bg-[#8B5CF6] text-white" },
  { patterns: ["bk", "counselor", "bimbingan", "konseling"], style: "bg-[#F59E0B] text-white" },
  { patterns: ["admin"], style: "bg-[#EF4444] text-white" },
  { patterns: ["staff", "tata usaha"], style: "bg-[#6366F1] text-white" },
  { patterns: ["kepala", "wakil", "waka", "coordinator", "kurikulum"], style: "bg-[#0EA5E9] text-white" },
];

export const getBgColorRole = (role) => {
  const label = (role?.label || "").toLowerCase();
  const value = (role?.value || (typeof role === "string" ? role : "")).toLowerCase();
  const name = `${label} ${value}`;

  const match = ROLE_CONFIG.find(config =>
    config.patterns.some(p => name.includes(p))
  );

  return match ? match.style : "bg-[#3B82F6] text-white";
}


