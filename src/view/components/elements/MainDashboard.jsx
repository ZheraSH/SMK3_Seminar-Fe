"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { LogOut, X, Search, Menu } from "lucide-react";
import { useAttendanceTeacher } from "../../../Core/hooks/role-teacher/attendance/useAttendance";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export default function MainDashboard({ toggleSidebar, sidebarOpen }) {
  const [user, setUser] = useState({ name: "", email: "", image: "" });
  const [showLogout, setShowLogout] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);

  const { clearAttendanceState } = useAttendanceTeacher() || {};

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoadingUser(false);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await api.post(
          "/logout",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      if (typeof clearAttendanceState === "function") {
        clearAttendanceState();
      }
    } catch (err) {
      console.error("Logout gagal:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.href = "/";
    }
  };

  if (loadingUser) return null;

  return (
    <>
      {/* TOP BAR */}
      <div className="w-full min-h-16 flex flex-wrap items-center justify-between bg-white border-b border-gray-200 shadow-sm px-3 sm:px-5">
        <div className="flex items-center ml-5 gap-3">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800"
          >
            {sidebarOpen ? (
              <Menu className="w-6 h-6" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative hidden md:block lg:mr-40 xl:mr-50">
            <input
              type="text"
              placeholder="Cari siswa, guru, kelas, izin..."
              className="w-full md:w-72 xl:w-[450px] lg:w-[380px] pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          <div className="flex items-center mr-5 gap-3">
            <div className="text-right">
              <h1 className="font-semibold text-gray-800 text-sm">
                {user.name}
              </h1>
              <p className="inline-block px-2 py-0.5 text-xs font-medium text-white bg-blue-500 rounded-full mt-0.5">
                Operator
              </p>
            </div>

            <img
              src={user.image || "/images/team/valen.jpg"}
              className="w-10 h-10 rounded-full ring-2 ring-blue-500 cursor-pointer"
              onClick={() => setShowLogout(true)}
              alt="Profile"
            />
          </div>
        </div>
      </div>

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[330px] p-6 rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setShowLogout(false)}
              className="absolute top-3 right-3 text-gray-400"
            >
              <X size={20} />
            </button>

            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <LogOut className="text-white w-7 h-7" />
            </div>

            <h2 className="mt-4 text-xl font-semibold text-center">
              Keluar Akun?
            </h2>

            <p className="text-center text-sm text-gray-600 mt-1">
              Anda harus login kembali setelah keluar
            </p>

            <p className="text-center text-xs text-gray-500 mt-1">
              {user.email}
            </p>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleLogout}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Logout
              </button>
              <button
                onClick={() => setShowLogout(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg"
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
