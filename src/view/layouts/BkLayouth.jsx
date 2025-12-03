import { Link, useLocation } from "react-router-dom"
import { menuItemBk } from "../../Core/Data/SidebarData"
import { Outlet } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import MainDashboard from "../components/elements/MainDashboard"
import { ChevronDown, Menu, X } from "lucide-react"
import { Notification } from "../../Core/hooks/notification/Notification"

export const LayouthBK = () => {
  const location = useLocation()
  const scrollRef = useRef(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <>
      <div className="flex h-screen bg-gray-50">
      <Notification />
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-[250px] bg-[#1E3A8A] text-white transform transition-transform duration-300 z-40
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            lg:translate-x-0`}
        >
          {/* Logo */}
          <div className="flex justify-center items-center px-10 gap-3 py-6 ">
            <img className="w-10 h-10" src="../images/SMKNLOGO1.png" alt="Logo" />
            <div className="flex flex-col justify-center text-white font-bold text-center">
              SMK Negeri 3 Pamekasan
            </div>
          </div>

          {/* Menu */}
          <div
            ref={scrollRef}
            className="relative p-3 mx-3 text-white overflow-y-auto h-[calc(100vh-100px)]
              [&::-webkit-scrollbar]:hidden 
              [-ms-overflow-style:'none'] 
              [scrollbar-width:'none']"
          >
            {menuItemBk.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setSidebarOpen(false)} // Tutup sidebar setelah klik (mobile)
                className={`flex items-center gap-3 p-2 text-[14px] font-semibold mb-3 cursor-pointer duration-300 
                  hover:bg-white hover:rounded-[12px] hover:text-[#1E3A8A] ${
                    location.pathname === item.path
                      ? "bg-white text-[#1E3A8A] rounded-[12px]"
                      : ""
                  }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Tombol scroll ke bawah */}
            {showScrollButton && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-4 right-4 bg-white text-[#1E3A8A] rounded-full p-2 shadow-lg hover:scale-105 transition-transform"
              >
                <ChevronDown size={22} />
              </button>
            )}
          </div>
        </div>

        {/* Overlay untuk mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-[250px] h-full overflow-y-auto">
          {/* Navbar atas (mobile only) */}
          <div className="flex items-center justify-between bg-white shadow-sm p-4 lg:hidden">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-[#1E3A8A] p-2"
            >
              {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            <h1 className="font-bold text-[#1E3A8A] text-lg">Dashboard</h1>
            <div className="w-6"></div>
          </div>

          {/* Isi Dashboard */}
          <main className="flex-1 overflow-y-auto">
            <MainDashboard />
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

