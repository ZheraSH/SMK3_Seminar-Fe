import { Link, useLocation, Outlet } from "react-router-dom"
import { menuItemBk } from "../../Core/Data/SidebarData"
import { useRef, useState, useEffect } from "react"
import MainDashboard from "../components/elements/MainDashboard"
import { ChevronDown, Menu, X } from "lucide-react"
import { Notification } from "../../Core/hooks/notification/Notification"
import LoginSuccessPopup from "../components/elements/succeslogin/LoginSuccessPopup"

export const LayouthBK = () => {
  const location = useLocation()
  const scrollRef = useRef(null)
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

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
    const handleScroll = () => {
      const el = scrollRef.current
      if (el) setShowScrollButton(el.scrollTop > 100)
    }
    const el = scrollRef.current
    el?.addEventListener("scroll", handleScroll)
    return () => el?.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      setShowLoginPopup(true);
      localStorage.removeItem("loginSuccess");
    }
  }, []);

  return (
    <>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <LoginSuccessPopup open={showLoginPopup} onClose={() => setShowLoginPopup(false)} title="Login Berhasil" subtitle="Selamat datang kembali!"/>
        <Notification />

        <aside className={`fixed top-0 left-0 h-full bg-white text-[#4B5563] shadow-xl transition-all duration-300 z-30 ${sidebarOpen ? "w-[250px] translate-x-0" : "w-[250px] -translate-x-full lg:translate-x-0 lg:w-[80px]"}`} >
          <div className="flex items-center gap-3 p-6 overflow-hidden whitespace-nowrap">
            <img className="w-10 h-10 min-w-[40px]" src="../images/SMKNLOGO1.png" alt="Logo" />
            {sidebarOpen && (
              <div className="flex flex-col text-[#1F2937] font-bold leading-tight uppercase text-sm">
                SMK Negeri 3 <br /> Pamekasan
              </div>
            )}
          </div>

          <div ref={scrollRef} className="relative overflow-y-auto h-[calc(100vh-120px)] no-scrollbar px-3">
            {menuItemBk.map((item, index) => (
              <Link key={index} to={item.path} className={`relative flex items-center gap-3 py-3 px-4 mb-1 rounded-lg font-semibold transition-all duration-200
                  ${location.pathname === item.path  ? "bg-blue-50 text-blue-600"  : "hover:bg-gray-100 text-gray-500"} ${!sidebarOpen && "justify-center px-0"}`}>
                {location.pathname === item.path && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-blue-600 rounded-r-full" />
                )}

                <span className={`${location.pathname === item.path ? "text-blue-600" : "text-gray-400"}`}>
                  {item.icon}
                </span>
                
                {sidebarOpen && <span className="text-sm truncate">{item.name}</span>}
              </Link>
            ))}

            {showScrollButton && sidebarOpen && (
              <button onClick={scrollToBottom} className="sticky bottom-4 left-1/2 -translate-x-1/2 bg-white text-blue-600 rounded-full p-2 shadow-lg border border-gray-100 transition-transform hover:scale-110">
                <ChevronDown size={18} />
              </button>
            )}
          </div>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}/>
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
    </>
  )
}