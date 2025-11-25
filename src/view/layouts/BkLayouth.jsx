import { Link, useLocation } from "react-router-dom"
import { menuItemBk } from "../../Core/Data/SidebarData"
import { Outlet } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import MainDashboard from "../components/elements/MainDashboard"
import { ChevronDown, Menu, X } from "lucide-react"

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
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-[250px] bg-[#1E3A8A] text-white transform transition-transform duration-300 z-40
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            md:translate-x-0`}
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
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:ml-[250px] h-full overflow-y-auto">
          {/* Navbar atas (mobile only) */}
          <div className="flex items-center justify-between bg-white shadow-sm p-4 md:hidden">
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



// import { Link, useLocation } from "react-router-dom"
// import { menuItemBk } from "../../Core/Data/SidebarData"
// import { Outlet } from "react-router-dom"
// import { useRef, useState, useEffect } from "react"
// import MainDashboard from "../components/elements/MainDashboard"
// import { ChevronDown,LogOut } from "lucide-react"

// export const LayouthBK = () => {
//   const location = useLocation()
//   const scrollRef = useRef(null)
//   const [showScrollButton, setShowScrollButton] = useState(false)
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       const el = scrollRef.current
//       if (el) setShowScrollButton(el.scrollTop > 100)
//     }
//     const el = scrollRef.current
//     el?.addEventListener("scroll", handleScroll)
//     return () => el?.removeEventListener("scroll", handleScroll)
//   }, [])

//   const scrollToBottom = () => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({
//         top: scrollRef.current.scrollHeight,
//         behavior: "smooth",
//       })
//     }
//   }

//   return (
//     <>
//       <div className="flex h-screen bg-gray-50 ">
//         {/* Sidebar */}
//         <div
//           className={`fixed top-0 left-0 h-full bg-white text-[#4B5563] shadow-lg
//             transition-all duration-300 z-40
//             transform ${sidebarOpen ? "translate-x-0 w-[280px]" : "md:translate-x-0 md:w-[80px] -translate-x-full w-[280px]"
//             }`}
//         >
//           {/* Logo */}
//           <div  className={`flex items-center gap-3 transition-all duration-300 ${sidebarOpen ? "px-6 py-6" : "px-0 py-6 justify-center ml-2"}`}>
//             <img className={`transition-all duration-300 ${sidebarOpen ? "w-[37px] h-[40px]" : "w-[29px] h-[32px]"}`} 
//               src="../images/SMKNLOGO1.png" alt="Logo" />
//             <div className={`flex flex-col justify-center font-bold text-[#1F2937] transition-all duration-300 overflow-hidden
//                 ${sidebarOpen ? "opacity-100 max-w-[180px]" : "opacity-0 max-w-0"}
//                 `}>
//               SMK Negeri 3 Pamekasan
//             </div>
//           </div>

//           {/* Menu */}
//           <div  className={`
//             flex flex-col justify-between h-[calc(100vh-100px)] ${sidebarOpen ? "p-0 mx-0" : "p-3 mx-3 -mt-8"}
//           `}>
//             <div
//             ref={scrollRef}
//             className="overflow-y-auto flex-1 
//             [&::-webkit-scrollbar]:hidden 
//             [-ms-overflow-style:'none'] 
//             [scrollbar-width:'none']"
//           >
//             {menuItemBk.map((item, index) => (
//               <Link
//                 key={index}
//                 to={item.path}
//                 onClick={() => {
//                     if (window.innerWidth < 768) setSidebarOpen(false) // Tutup hanya di mobile
//                 }}
//                 className={`flex items-center gap-3 
//                 ${sidebarOpen ? "p-2 w-[280px] h-[40px] pl-6 " : " border-none rounded-lg px-1 w-[36px] h-[36px] "} 
//                  font-semibold mb-3 cursor-pointer duration-300  
//                 hover:bg-[#3B82F6]/12 hover:text-[#3B82F6] hover:border-l-4
//                 ${
//                   location.pathname === item.path
//                     ? "bg-[#3B82F6]/12 text-[#3B82F6] border-l-4" // ACTIVE — ditempatkan terakhir
//                     : "bg-white text-[#1F2937] border-none"
//                 }`}
//               >
//                 <div className="min-w-[36px] w-[20px] h-[20px] ">
//                   {item.icon}
//                 </div>
//                 <span className={` ${sidebarOpen ? "inline" : "hidden"} text-[13px]`}>{item.name}</span>
//               </Link>
//             ))}
//                 {/* Tombol scroll ke bawah */}
//                 {showScrollButton && (
//                   <button
//                     onClick={scrollToBottom}
//                     className="absolute bottom-4 right-4 bg-white text-[#1E3A8A] rounded-full p-2 shadow-lg hover:scale-105 transition-transform"
//                   >
//                     <ChevronDown size={22} />
//                   </button>
//                 )}
                
//               </div>
//               <div className={`p-4 ${sidebarOpen ? "pl-6 border-t border-[#D1D5DB]" : "justify-center flex"}`}>
//                   <button className="flex items-center gap-2 text-red-500 hover:text-red-700 font-semibold">
//                     <LogOut />
//                     <span className={`${sidebarOpen ? "inline" : "hidden"}`}>Log Out</span>
//                   </button>
//                 </div>
//             </div>
//           </div>

//         {/* Overlay untuk mobile */}
//         {sidebarOpen && (
//           <div
//             className="fixed inset-0 bg-black/50 z-30 md:hidden"
//             onClick={() => setSidebarOpen(false)}
//           ></div>
//         )}

//         {/* Main Content */}
//         <div className={`
//         flex-1 flex flex-col h-full overflow-y-auto transition-all duration-300
//         ${sidebarOpen ? "md:ml-[280px]" : "md:ml-[80px]"}
//         `}>
//           <main className="flex-1 overflow-y-auto">
//             <MainDashboard sidebarOpen= {sidebarOpen} setSidebarOpen={setSidebarOpen}/>
//             <Outlet />
//           </main>
//         </div>
//       </div>
//     </>
//   )
// }
