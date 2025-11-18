"use client";
import { useEffect, useState } from "react";
import { on } from "../../utils/eventBus";

export const Notification = () => {
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    const off = on("notify", (data) => {
      setNotif(data);
      setTimeout(() => setNotif(null), 2000);
    });

    return () => off();
  }, []);

  if (!notif) return null;

  const isModal = notif.type === "modal";

  return (
    <>
      {/* ======== MODAL CARD BESAR DI TENGAH ======== */}
      {isModal && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center
            bg-black/40 backdrop-blur-sm
            opacity-0 animate-[fadeIn_0.25s_ease-out_forwards]"
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full
              text-center opacity-0 animate-[scaleIn_0.25s_ease-out_forwards]"
          >
            <div className="text-lg font-semibold text-gray-800">
              {notif.message}
            </div>
          </div>
        </div>
      )}

      {/* ======== NOTIF KECIL (KANAN ATAS) ======== */}
      {!isModal && (
        <div className="fixed top-4 right-4 z-[9999] opacity-0 animate-[fadeIn_0.25s_ease-out_forwards]">
          <div
            className={`px-4 py-2 rounded shadow text-white
            ${notif.type === "error" ? "bg-red-600" : "bg-green-600"}`}
          >
            {notif.message}
          </div>
        </div>
      )}

      {/* ANIMASI KEYFRAMES */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
};
