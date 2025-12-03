import React from "react";
import { TrendingUp, ClipboardList, Activity, AlertTriangle, TrendingDown } from "lucide-react";

const colorMap = {
    green: "#10B981", // Rata-rata 
    yellow: "#FACC15", // Izin 
    blue: "#3B82F6", // Sakit 
    red: "#FF5E53", // Alpha 
    neutral: "#9CA3AF"
};

const bgColorMap = {
    green: "#E6F7F0", 
    yellow: "#FFFBEB", 
    blue: "#ECF4FF", 
    red: "#FEEBEB", 
    neutral: "#F3F4F6"
};

const IconContainer = ({ cardColorName, children }) => {
    const mainColor = colorMap[cardColorName] || colorMap.neutral;
    const bgColor = bgColorMap[cardColorName] || bgColorMap.neutral;

    return (
        <div className="w-10 h-10 rounded-full flex items-center justify-center" >
            {React.cloneElement(children, { 
                className: "w-5 h-5", 
                style: { color: mainColor } 
            })}
        </div>
    );
};

export default function StatsCard({ title, value, color }) {
    
    const cardColorName = color.toLowerCase();
    const cardColorHex = colorMap[cardColorName] || colorMap.neutral;
    
    let CardIcon = TrendingUp;

    if (title.includes("Rata-rata")) {
        CardIcon = TrendingUp;
    } else if (title.includes("Izin")) {
        CardIcon = ClipboardList;
    } else if (title.includes("Sakit")) {
        CardIcon = Activity;
    } else if (title.includes("Alpha")) {
        CardIcon = AlertTriangle;
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 h-[125px] flex justify-center items-center">
            <div className="flex flex-col items-center justify-center text-center">
                <IconContainer cardColorName={cardColorName}>
                    <CardIcon className="w-5 h-5"/>
                </IconContainer>
                <span className="text-sm font-medium mt-1" style={{ color: cardColorHex }} >
                    {title}
                </span>
                <span className="text-[22px] font-semibold mt-1" style={{ color: cardColorHex }}>
                    {value}
                </span>
            </div>
        </div>
    );
}