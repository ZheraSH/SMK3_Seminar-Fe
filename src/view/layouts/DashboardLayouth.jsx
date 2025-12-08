import { Link, useLocation } from "react-router-dom";
import { menuItemsOperator } from "@data/SidebarData";
import { Outlet } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import MainDashboard from "../components/elements/MainDashboard";
import { ChevronDown, Menu, X } from "lucide-react";
import { Notification } from "../../Core/hooks/notification/Notification";

export const DashboardLayouth = () => {
  const location = useLocation();
  const scrollRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <>
      <div className="flex h-screen bg-gray-50">
        <Notification />
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-[250px] bg-white text-[#4B5563]  transform transition-transform duration-300 z-40
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
            lg:translate-x-0`}
        >
          {/* Logo */}
          <div className="flex justify-center items-center px-10 gap-3 py-6 ">
            <img
              className="w-10 h-10"
              src="../images/SMKNLOGO1.png"
              alt="Logo"
            />
            <div className="flex flex-col justify-center text-[#1F2937] font-semibold  text-center">
              SMK Negeri 3 Pamekasan
            </div>
          </div>
          

          {/* Menu */}
          <div
            ref={scrollRef}
            className="relative overflow-y-auto h-[calc(100vh-100px)]
              [&::-webkit-scrollbar]:hidden 
              [-ms-overflow-style:'none'] 
              [scrollbar-width:'none']"
          >
           {menuItemsOperator.map((item, index) => {
              
              let finalIsActive = location.pathname === item.path;

              // Logika Khusus untuk 'Kelas & Jurusan' (asumsi path-nya /home/major)
              if (item.path === "/home/major") {
                // Aktif jika path adalah /home/major, /home/class, ATAU dimulai dengan /home/classStudents
                finalIsActive = ["/home/major", "/home/class"].includes(location.pathname) || 
                                location.pathname.startsWith("/home/classStudents");
              } 
              
              // Untuk item 'Siswa' dan lainnya, gunakan logika default
              // (Pastikan Anda MENGHAPUS logika khusus untuk /home/siswa yang mungkin Anda tambahkan sebelumnya)

              return (
                <Link
                  key={index}
                  to={item.path}
                  className={`relative flex items-center gap-3 p-2  mb-3 p-2 pl-5 text-[14px] font-semibold cursor-pointer duration-300 block w-full 
                       hover:bg-[#E5F0FF]  hover:text-[#3B82F6]   ${
                        finalIsActive ? "bg-[#3B82F61F]  text-[#3B82F6] " : ""
                      }`}
                >
       
                      {finalIsActive && (
                    <div className="absolute left-0 top-0 h-full w-[4px] bg-[#3B82F6] rounded-r-lg"></div>
                    // Penjelasan:
                    // - absolute & relative: Posisi bilah di dalam Link.
                    // - left-0, top-0, h-full: Menempel penuh di sisi kiri.
                    // - w-[4px], bg-[#3B82F6]: Ukuran dan warna bilah biru.
                    // - rounded-r-lg: Membuat sudut kanan (yang terlihat) melengkung.
                )}
  
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}

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
  );
};
