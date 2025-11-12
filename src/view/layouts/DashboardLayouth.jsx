import { Link, useLocation } from "react-router-dom";
import { menuItems } from "@data/dashboardData";
import { Outlet } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import MainDashboard from "../components/elements/MainDashboard";
import { ChevronDown } from "lucide-react";



export const DashboardLayouth = (props) => {
  const {children} = props;
  const location = useLocation();
  const scrollRef = useRef(null)
  const [showScrollButton, setShowScrollButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const el = scrollRef.current
      if (el) setShowScrollButton(el.scrollTop > 100)
    }
    const el = scrollRef.current
    el?.addEventListener("scroll", handleScroll)
    return () => el?.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll ke bawah
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
      <div className="flex">
      <div className="bg-[#1E3A8A] w-[250px] h-screen fixed">
      <div className="flex justify-center items-center px-10 gap-3 py-6">
        <img className="w-10 h-10" src="../images/SMKNLOGO1.png" alt="Logo" />
        <div className="flex flex-col justify-center text-white font-bold">
          SMK Negri 3 Pamekasan
        </div>
      </div>
      <div
      ref={scrollRef}
      className="relative p-6 text-white overflow-y-auto h-[calc(100vh-100px)]
                 [&::-webkit-scrollbar]:hidden 
                 [-ms-overflow-style:'none'] 
                 [scrollbar-width:'none']"
    >
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`flex items-center gap-3 p-2.5 text-[15px] font-semibold mb-3.5 cursor-pointer duration-300 
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

        <div className="ml-[250px] flex-1 h-screen overflow-y-auto bg-gray-50">
          <MainDashboard/>
          <Outlet/>
        </div>
      </div>
    </>
  );
};

