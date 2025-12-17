"use client";
import { useEffect, useState } from "react";
import { on } from "../../utils/eventBus";
import { CircleCheckBig, CircleX } from "lucide-react";

export const Notification = () => {
  const [notif, setNotif] = useState(null);
  const [closing, setClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const off = on("notify", (data) => {
      setNotif(data);
      setClosing(false);
      setProgress(100);

      const interval = setInterval(() => {
        setProgress((p) => (p <= 0 ? 0 : p - 1.7));
      }, 30);

      setTimeout(() => setClosing(true), 1250);

      setTimeout(() => {
        setNotif(null);
        clearInterval(interval);
      }, 2000);
    });

    return () => off();
  }, []);

  if (!notif) return null;

  const isError = notif.type === "error";

  return (
    <div
      className={`
        fixed top-6 right-6 z-[9999]
        ${closing ? "animate-slideOutRight" : "animate-slideInRight"}
      `}
    >
      <div className="bg-white rounded-xl shadow-md border border-gray-200 px-4 py-3 flex items-center gap-3 w-[260px] relative overflow-hidden">
        
        {/* ICON */}
        <div
          className={`flex items-center justify-center min-w-10 h-10 rounded-xl ${
            isError ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {isError ? (
            <CircleX size={22} strokeWidth={2.4} className="text-white" />
          ) : (
            <CircleCheckBig size={22} strokeWidth={2.4} className="text-white" />
          )}
        </div>

        {/* TEXT */}
        <span className="font-semibold text-gray-800 text-[14px]">
          {notif.message}
        </span>

        {/* PROGRESS BAR */}
        <div
          className={`absolute left-0 bottom-0 h-[3px] transition-all ${
            isError ? "bg-red-500" : "bg-green-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideOutRight {
          from {
            opacity: 1;
            transform: translateX(0);
          }
          to {
            opacity: 0;
            transform: translateX(40px);
          }
        }

        .animate-slideInRight {
          animation: slideInRight 0.25s ease-out forwards;
        }

        .animate-slideOutRight {
          animation: slideOutRight 0.35s ease-in forwards;
        }
      `}</style>
    </div>
  );
};
