"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { LogOut, X } from "lucide-react";


const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export default function MainDashboard() {
  const [user, setUser] = useState({ name: "", email: "" });
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("token");
      window.location.href = "/";
    } catch (error) {
      console.error("Logout gagal:", error);
    }
  };

  return (
    <>
      {/* NAV USER */}
      <div className="hidden sm:block flex-1 bg-gray-50 pt-5 pb-2 px-4 sm:px-6">
        <div className="flex items-center gap-3 px-5 sm:w-auto justify-between sm:justify-end">
          <div className="text-left sm:text-right">
            <h1 className="font-semibold text-gray-800 text-sm sm:text-base">
              {user.name || "Pengguna"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              {user.email || "email@domain.com"}
            </p>
          </div>

          <img
            className="w-10 h-10 rounded-full object-cover cursor-pointer ring-2 ring-blue-500"
            src="/images/team/valen.jpg"
            onClick={() => setShowLogout(true)}
          />
        </div>
      </div>

      {/* LOGOUT POPUP */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="bg-white w-[330px] p-6 rounded-2xl shadow-2xl relative animate-fadeIn">

            {/* Close Button */}
            <button
              onClick={() => setShowLogout(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full shadow flex items-center justify-center">
              <LogOut className="text-white w-7 h-7" />
            </div>

            <h2 className="mt-4 font-semibold text-xl text-gray-800 tracking-wide text-center">
              Keluar Akun?
            </h2>

            <p className="text-center text-gray-600 text-sm mt-1">
              Anda akan perlu login kembali setelah keluar.
            </p>

            <p className="text-center text-gray-500 text-xs mt-1">{user.email}</p>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Logout
              </button>

              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
