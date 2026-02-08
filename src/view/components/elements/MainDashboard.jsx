"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { LogOut, X, Search, Menu } from "lucide-react";
import { useAttendanceTeacher } from "../../../Core/hooks/role-teacher/attendance/useAttendance";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
});

export default function MainDashboard({ toggleSidebar, sidebarOpen }) {
  const [user, setUser] = useState({ name: "", email: "", image: "", roles: [] });
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true);
  const navigate = useNavigate();
  const { clearAttendanceState } = useAttendanceTeacher() || {};

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      const parsedData = JSON.parse(stored);
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
      window.location.href = "/login";
    }
  };

  const handleProfile = () => {
    const userRoles = user.roles;

    if (userRoles.length > 1) {
      navigate("/dashboard/profile");
      return;
    }

    const SINGLE_ROLE_ROUTES = {
      student: "/student-home/profile",
      counselor: "/bk-home/profile",
      teacher: "/teacher-home/profile",
      homeroom_teacher: "/homeroom-home/profile",
      school_operator: "/home/ProfileOperator",
    };

    const activeRole = userRoles[0];
    const path = SINGLE_ROLE_ROUTES[activeRole];

    if (path) {
      navigate(path);
    } else {
      navigate("/dashboard/profile");
    }
  };

  if (loadingUser) return null;

  const getPageTitle = () => {
    const path = location.pathname;

    const titles = [
      { pattern: "/home/classStudents/detail", title: "Detail Siswa" },
      { pattern: "/home/class", title: "Daftar Kelas" },
      { pattern: "/home/major", title: "Daftar Jurusan" },
      { pattern: "/home/Shedule", title: "Jadwal Pelajaran" },
      { pattern: "/home/siswa", title: "Siswa" },
      { pattern: "/home/maple", title: "Mapel" },
      { pattern: "/home/absen-rfid", title: "Pengaturan Jam RFID" },
      { pattern: "/home/rfid", title: "RFID" },
      { pattern: "/home/guru", title: "Guru" },
      { pattern: "/home", title: "Dashboard" },
    ];

    const match = titles.find(t => path.startsWith(t.pattern));

    return match ? match.title : "Dashboard";
  };

  return (
    <>
      <div className=" w-full min-h-16 flex flex-wrap items-center justify-between bg-white border-b border-gray-200 shadow-sm px-2 sm:px-5">
        <div className="flex items-center ml-5 gap-3">
          <button onClick={toggleSidebar} className="text-gray-600 hover:text-gray-800">
            {sidebarOpen ? (
              <Menu className="w-6 h-6" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <h1 className="text-sm sm:text-xl font-semibold text-gray-800">{getPageTitle()}</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center mr-5 gap-3">
            <div className=" hidden sm:inline text-right">
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

      {/* LOGOUT MODAL */}
      {showLogout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[330px] p-6 rounded-2xl shadow-2xl relative">
            <button onClick={() => setShowLogout(false)} className="absolute top-3 right-3 text-gray-400">
              <X size={20} />
            </button>
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <LogOut className="text-white w-7 h-7" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-center"> Keluar Akun? </h2>
            <p className="text-center text-sm text-gray-600 mt-1"> Anda harus login kembali setelah keluar </p>
            <p className="text-center text-xs text-gray-500 mt-1"> {user.email} </p>

            <div className="flex gap-3 mt-6">
              <button onClick={handleLogout} className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg">
                Logout
              </button>
              <button onClick={() => setShowLogout(false)} className="flex-1 bg-gray-200 hover:bg-gray-300 py-2 rounded-lg">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}