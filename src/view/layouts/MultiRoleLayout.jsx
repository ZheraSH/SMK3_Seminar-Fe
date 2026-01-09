import { Link, useLocation, Outlet } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import {
  ChevronDown,
  Menu,
  X,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  multiRoleCommon,
  multiRoleTeacher,
  multiRoleHomeroom,
  multiRoleCounselor,
} from "../../Core/Data/SidebarData";
import MainDashboard from "../components/elements/MainDashboard";
import { Notification } from "../../Core/hooks/notification/Notification";
import LoginSuccessPopup from "../components/elements/succeslogin/LoginSuccessPopup";

export const MainLayoutMultiRole = () => {
  const location = useLocation();
  const scrollRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // State untuk menyimpan menu hasil gabungan
  const [mergedMenu, setMergedMenu] = useState([]);

  /* ======================
      LOGIKA FILTER MENU
  ====================== */
  useEffect(() => {
    // 1. Cek Pop up Login
    if (localStorage.getItem("loginSuccess") === "true") {
      setShowLoginPopup(true);
      localStorage.removeItem("loginSuccess");
    }

    // 2. Ambil Data User
    const data = JSON.parse(localStorage.getItem("userData"));
    
    // Pastikan userRoles selalu berupa array
    const userRoles = Array.isArray(data?.roles) 
      ? data.roles 
      : data?.role ? [data.role] : [];

    console.log("Roles terdeteksi:", userRoles); 

    let combined = [...multiRoleCommon];

    if (userRoles.includes("teacher")) {
      combined = [...combined, ...multiRoleTeacher];
    }
    
    if (userRoles.includes("homeroom_teacher")) {
      combined = [...combined, ...multiRoleHomeroom];
    }
    
    if (userRoles.includes("counselor")) {
      combined = [...combined, ...multiRoleCounselor];
    }

    const final = combined.filter((v, i, a) => a.findIndex(t => t.path === v.path) === i);
    
    setMergedMenu(final);
  }, []);


  /* ======================
      SCROLL HANDLER
  ====================== */
  useEffect(() => {
    const handleScroll = () => {
      const el = scrollRef.current;
      if (el) setShowScrollButton(el.scrollTop > 100);
    };

    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);

    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const sidebarWidth = isCollapsed ? "w-[80px]" : "w-[260px]";
  const mainContentMargin = isCollapsed ? "lg:ml-[80px]" : "lg:ml-[260px]";

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <LoginSuccessPopup
          open={showLoginPopup}
          onClose={() => setShowLoginPopup(false)}
          title="Login Berhasil"
          subtitle="Selamat datang kembali!"
        />

        <Notification />

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full ${sidebarWidth} bg-[#1E3A8A] text-white transform transition-all duration-300 z-40
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0 shadow-lg`}
        >
          {/* Logo & Toggle Section */}
          <div className={`flex items-center px-3 py-6 ${isCollapsed ? "justify-center" : "justify-between"}`}>
            <div className={`flex items-center gap-3 ${isCollapsed ? "hidden" : "flex"}`}>
              <img className="w-10 h-10" src="../images/SMKNLOGO1.png" alt="Logo" />
              <div className="flex flex-col font-bold leading-tight text-white">
                SMK Negeri 3<br />Pamekasan
              </div>
            </div>

            {isCollapsed && (
              <img className="w-10 h-10" src="../images/SMKNLOGO1.png" alt="Logo" />
            )}

            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`hidden lg:block p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors ${
                isCollapsed
                  ? "absolute right-[-15px] top-8 bg-[#1E3A8A] border border-white/20 shadow-md"
                  : ""
              }`}
            >
              {isCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
            </button>
          </div>

          {/* Menu Items */}
          <div
            ref={scrollRef}
            className="relative p-3 text-white overflow-y-auto h-[calc(100vh-100px)] scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {mergedMenu.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-2 text-[14px] font-semibold mb-3 cursor-pointer duration-300
                  hover:bg-white hover:rounded-[12px] hover:text-[#1E3A8A]
                  ${location.pathname === item.path ? "bg-white text-[#1E3A8A] rounded-[12px]" : ""}
                  ${isCollapsed ? "justify-center" : ""}`}
              >
                <div className="flex-shrink-0">{item.icon}</div>
                {!isCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
              </Link>
            ))}

            {/* Scroll Button */}
            {showScrollButton && !isCollapsed && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-4 right-4 bg-white text-[#1E3A8A] rounded-full p-2 shadow-lg hover:scale-105 transition-transform"
              >
                <ChevronDown size={22} />
              </button>
            )}
          </div>
        </div>

        {/* Overlay Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className={`flex-1 flex flex-col ${mainContentMargin} h-full overflow-y-auto transition-all duration-300`}>
          {/* Top Navbar Mobile */}
          <div className="flex items-center justify-between bg-white shadow-sm p-4 lg:hidden sticky top-0 z-20">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#1E3A8A] p-2"
            >
              {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            <h1 className="font-bold text-[#1E3A8A] text-lg uppercase">Dashboard Guru</h1>
            <div className="w-6"></div>
          </div>

          <main className="flex-1 w-full bg-gray-50">
            <MainDashboard />
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};