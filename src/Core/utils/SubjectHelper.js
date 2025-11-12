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
  } from "lucide-react"
  import React from "react"
  
  export const getIconBySubject = (name) => {
    if (name.toLowerCase().includes("pkk")) return React.createElement(Briefcase, { className: "text-white", size: 60 })
    if (name.toLowerCase().includes("pjok")) return React.createElement(Activity, { className: "text-white", size: 60 })
    if (name.toLowerCase().includes("produktif"))
      return React.createElement(Settings, { className: "text-white", size: 60 })
    if (name.toLowerCase().includes("bahasa madura"))
      return React.createElement(Landmark, { className: "text-white", size: 60 })
    if (name.toLowerCase().includes("bahasa inggris"))
      return React.createElement(Globe, { className: "text-white", size: 60 })
    if (name.toLowerCase().includes("bahasa indonesia"))
      return React.createElement(BookOpenText, { className: "text-white", size: 60 })
    if (name.toLowerCase().includes("pancasila"))
      return React.createElement(Landmark, { className: "text-white", size: 60 })
    if (name.toLowerCase().includes("seni budaya"))
      return React.createElement(Palette, { className: "text-white", size: 60 })
    if (name.toLowerCase().includes("islam")) return React.createElement(MoonIcon, { className: "text-white", size: 60 })
    if (name.toLowerCase().includes("matematika"))
      return React.createElement(SquareFunction, { className: "text-white", size: 60 })
    return React.createElement(BookMarked, { className: "text-[#1E3A8A]", size: 60 })
  }
  
  export const getBgColorBySubject = (name) => {
    if (name.toLowerCase().includes("pkk")) return "bg-[#F59E0B]"
    if (name.toLowerCase().includes("pjok")) return "bg-[#FACC15]"
    if (name.toLowerCase().includes("produktif")) return "bg-[#10B981]"
    if (name.toLowerCase().includes("madura")) return "bg-[#C2410C]"
    if (name.toLowerCase().includes("inggris")) return "bg-[#3B82F6]"
    if (name.toLowerCase().includes("indonesia")) return "bg-[#F87171]"
    if (name.toLowerCase().includes("pancasila")) return "bg-[#C62828]"
    if (name.toLowerCase().includes("seni")) return "bg-[#EC4899]"
    if (name.toLowerCase().includes("islam")) return "bg-[#059669]"
    if (name.toLowerCase().includes("matematika")) return "bg-[#8B5CF6]"
    return "bg-[#CBD5E1]"
  }
  