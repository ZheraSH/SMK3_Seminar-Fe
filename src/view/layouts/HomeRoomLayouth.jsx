import { Link, useLocation } from "react-router-dom"
import { menuItemHomeRoom } from "../../Core/Data/SidebarData" 
import { Outlet } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import MainDashboard from "../components/elements/MainDashboard"
import { ChevronDown, Menu, X } from "lucide-react"
import { Notification } from "../../Core/hooks/notification/Notification"
import LoginSuccessPopup from "../components/elements/succeslogin/LoginSuccessPopup"

export const LayouthHomeRoom = () => {
  const location = useLocation();
  const scrollRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

    useEffect(() => {
      if (localStorage.getItem("loginSuccess") === "true") {
        setShowLoginPopup(true);
        localStorage.removeItem("loginSuccess");
      }

  }, []);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <LoginSuccessPopup  open={showLoginPopup} onClose={() => setShowLoginPopup(false)} title="Login Berhasil" subtitle="Selamat datang kembali!" />
      <Notification />

      <aside className={`fixed top-0 left-0 h-full bg-white text-[#4B5563] shadow-xl transition-all duration-300 z-50 ${sidebarOpen ? "w-[250px] translate-x-0" : "w-[250px] -translate-x-full lg:translate-x-0 lg:w-[80px]"}`}>
        <div className="flex items-center gap-3 p-6 overflow-hidden whitespace-nowrap">
          <img className="w-10 h-10 min-w-[40px]" src="../images/SMKNLOGO1.png" alt="Logo" />
          {sidebarOpen && (
            <span className="font-semibold text-[#1F2937] leading-tight">
              SMK Negeri 3 <br /> Pamekasan
            </span>
          )}
        </div>

        <nav className="mt-4 overflow-y-auto h-[calc(100vh-120px)] no-scrollbar">
          {menuItemHomeRoom.map((item, index) => (
            <Link key={index} to={item.path} className={`relative flex items-center gap-3 py-3 px-6 transition-colors ${location.pathname === item.path ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"} ${!sidebarOpen && "justify-center px-0"}`}>
              {location.pathname === item.path && (
                <div className="absolute left-0 top-0 h-full w-1 bg-blue-600" />
              )}
              <span className={`${location.pathname === item.path ? "text-blue-600" : "text-gray-500"}`}>
                {item.icon}
              </span>
              {sidebarOpen && <span className="font-medium text-sm">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className={`flex-1 flex flex-col transition-all duration-300 w-full ${sidebarOpen ? "lg:ml-[250px]" : "lg:ml-[80px]"}`}>
        <MainDashboard toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen}/>
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-4">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};