"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOut, X, Search, Menu } from "lucide-react";
import { useAttendanceTeacher } from "../../../Core/hooks/role-teacher/attendance/useAttendance";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export default function MainDashboard({ toggleSidebar, sidebarOpen }) {
  const [user, setUser] = useState({ name: "", email: "", image: "", roles: [] });
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const { clearAttendanceState } = useAttendanceTeacher() || {};

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsedData = JSON.parse(stored);
      // Memastikan roles selalu dalam bentuk array agar .length bekerja
      setUser({
        ...parsedData,
        roles: Array.isArray(parsedData.roles) ? parsedData.roles : [parsedData.role || parsedData.roles]
      });
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

  const handleProfile = () => {
    const userRoles = user.roles;

    // 1. Logika Jika Multi-Role (Lebih dari 1 role)
    if (userRoles.length > 1) {
      navigate("/dashboard/profile");
      return;
    }

    // 2. Logika Jika Single Role (Hanya 1 role)
    const SINGLE_ROLE_ROUTES = {
      student: "/student-home/student-profile",
      counselor: "/bk-home/profile",
      teacher: "/teacher-home/profile",
      homeroom_teacher: "/homeroom-home/profile",
      school_operator: "/home/profile",
    };

    const activeRole = userRoles[0];
    const path = SINGLE_ROLE_ROUTES[activeRole];

    if (path) {
      navigate(path);
    } else {
      // Fallback jika role tidak terdaftar di objek di atas
      navigate("/dashboard/profile");
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
              <div className="flex flex-wrap justify-end gap-1 mt-0.5">
                {user.roles.map((role, idx) => (
                  <span 
                    key={idx}
                    className="px-2 py-0.5 text-[10px] font-medium text-white bg-blue-500 rounded-full capitalize"
                  >
                    {role.replace('_', ' ')}
                  </span>
                ))}
              </div>
            </div>

            <img
              src={user.image || "/images/team/valen.jpg"}
              className="w-10 h-10 rounded-full ring-2 ring-blue-500 cursor-pointer object-cover"
              onClick={handleProfile}
              alt="Profile"
            />
          </div>
        </div>
      </div>
    </>
  );
}