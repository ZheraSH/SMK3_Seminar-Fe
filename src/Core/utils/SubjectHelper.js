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
    BookMarked,
    FlaskRound,
    ScrollText,
    LibraryBig
  } from "lucide-react"
  import React from "react"
  
  export const getIconBySubject = (name) => {
    if (name.toLowerCase().includes("pkk")) return React.createElement(Briefcase, { className: "text-white", size:24 })
    if (name.toLowerCase().includes("pjok")) return React.createElement(Activity, { className: "text-white", size: 24 })
    if (name.toLowerCase().includes("produktif"))
      return React.createElement(Settings, { className: "text-white", size: 24 })
    if (name.toLowerCase().includes("madura"))
      return React.createElement(Landmark, { className: "text-white", size: 24 })
    if (name.toLowerCase().includes("inggris"))
      return React.createElement(Globe, { className: "text-white", size: 24 })
    if (name.toLowerCase().includes("indo"))
      return React.createElement(BookOpenText, { className: "text-white", size: 24 })
    if (name.toLowerCase().includes("seni budaya"))
      return React.createElement(Palette, { className: "text-white", size: 24 })
    if (name.toLowerCase().includes("islam")) return React.createElement(MoonIcon, { className: "text-white", size: 24 })
    if (name.toLowerCase().includes("ppkn")) return React.createElement(Landmark, { className: "text-white", size: 24 })
    if (name.toLowerCase().includes("ipas")) return React.createElement(FlaskRound, { className: "text-white", size: 24 })
    if (name.toLowerCase().includes("sejarah")) return React.createElement(ScrollText, { className: "text-white", size: 24 })
    if (name.toLowerCase().includes("matematika"))
      return React.createElement(SquareFunction, { className: "text-white", size: 24 })
    return React.createElement(LibraryBig, { className: "text-white", size: 24 })
  }
  
  export const getBgColorBySubject = (name) => {
    if (name.toLowerCase().includes("pkk")) return "bg-[#F59E0B]"
    if (name.toLowerCase().includes("pjok")) return "bg-[#84CC16]"
    if (name.toLowerCase().includes("sejarah")) return "bg-[#D97706]"
    if (name.toLowerCase().includes("produktif")) return "bg-[#06B6D4]"
    if (name.toLowerCase().includes("madura")) return "bg-[#F43F5E]"
    if (name.toLowerCase().includes("inggris")) return "bg-[#0EA5E9]"
    if (name.toLowerCase().includes("indo")) return "bg-[#6366F1]"
    if (name.toLowerCase().includes("seni")) return "bg-[#EC4899]"
    if (name.toLowerCase().includes("islam")) return "bg-[#15803D]"
    if (name.toLowerCase().includes("ppkn")) return "bg-[#EF4444]"
    if (name.toLowerCase().includes("ipas")) return "bg-[#10B981]"
    if (name.toLowerCase().includes("matematika")) return "bg-[#8B5CF6]"
    return "bg-[#3B82F6]"
  }
  