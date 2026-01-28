import { Link, useLocation, Outlet } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, ChevronsLeft, ChevronsRight, } from "lucide-react";
import { multiRoleCommon, multiRoleTeacher, multiRoleHomeroom, multiRoleCounselor,} from "../../Core/Data/SidebarData";
import MainDashboard from "../components/elements/MainDashboard";
import { Notification } from "../../Core/hooks/notification/Notification";
import LoginSuccessPopup from "../components/elements/succeslogin/LoginSuccessPopup";

export const MainLayoutMultiRole = () => {
  const location = useLocation();
  const scrollRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [mergedMenu, setMergedMenu] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("loginSuccess") === "true") {
      setShowLoginPopup(true);
      localStorage.removeItem("loginSuccess");
    }

    const data = JSON.parse(localStorage.getItem("userData"));
    
    // Pastikan userRoles selalu berupa array
    const userRoles = Array.isArray(data?.roles) 
      ? data.roles 
      : data?.role ? [data.role] : [];


    let combined = [...multiRoleCommon];
    if (userRoles.includes("teacher")) combined = [...combined, ...multiRoleTeacher];
    if (userRoles.includes("homeroom_teacher")) combined = [...combined, ...multiRoleHomeroom];
    if (userRoles.includes("counselor")) combined = [...combined, ...multiRoleCounselor];

    const final = combined.filter((v, i, a) => a.findIndex(t => t.path === v.path) === i);
    setMergedMenu(final);
  }, []);

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
    const el = scrollRef.current;
    const handleScroll = () => {
      if (el) setShowScrollButton(el.scrollTop > 100);
    };
    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <>
      <LoginSuccessPopup open={showLoginPopup} onClose={() => setShowLoginPopup(false)} title="Login Berhasil" subtitle="Selamat datang kembali!"/>
      <Notification />

      <div className="flex h-screen bg-gray-50">
        <div  className={`fixed top-0 left-0 h-full z-40 transform transition-all duration-300  ${sidebarOpen ? "w-[250px] translate-x-0" : "w-[80px] -translate-x-full lg:translate-x-0"}`}>
          <div className={`h-full bg-white shadow-md ${sidebarOpen ? "" : "overflow-hidden"}`}>
            <div className={`flex justify-center items-center gap-3 py-6 ${sidebarOpen ? "px-10" : ""}`}>
              <img src="../images/SMKNLOGO1.png" className="w-10 h-10" alt="Logo" />
              {sidebarOpen && (
                <h1 className="text-[16px] font-semibold leading-tight text-gray-800">
                  SMK NEGERI 3 Pamekasan
                </h1>
              )}
            </div>

            <div  ref={scrollRef}  className={`overflow-y-auto scrollbar-hide ${sidebarOpen ? "h-[calc(100vh-100px)]" : "h-[calc(100vh-80px)]"}`} style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              <div className="flex flex-col">
                {mergedMenu.map((item, index) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link key={index} to={item.path} onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                      className={`relative flex items-center mb-1.5 transition-all duration-200 hover:bg-[#E5F0FF] group
                        ${sidebarOpen ? "gap-3 p-2 pl-5" : "justify-center p-3"}  ${active ? "bg-[#3B82F61F] text-[#3B82F6]" : "text-gray-600"}`} title={!sidebarOpen ? item.name : ""}>
                      {active && sidebarOpen && (
                        <div className="absolute left-0 top-0 h-full w-[4px] bg-[#3B82F6] rounded-r-lg" />
                      )}

                      <div className={`${active && !sidebarOpen ? "text-[#3B82F6]" : "group-hover:text-[#3B82F6]"}`}>
                        {item.icon}
                      </div>

                      {sidebarOpen && (
                        <span className="text-[14px] font-semibold whitespace-nowrap">
                          {item.name}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>

              {showScrollButton && sidebarOpen && (
                <button onClick={scrollToBottom} className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-lg border border-gray-100 hover:bg-gray-50">
                  <ChevronDown size={22} className="text-[#3B82F6]" />
                </button>
              )}
            </div>
          </div>
        </div>

        {sidebarOpen && (
          <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 lg:hidden"/>
        )}

        <div  className={`flex-1 flex flex-col transition-all duration-300 w-full  ${sidebarOpen ? "lg:ml-[250px]" : "lg:ml-[80px]"}`}>
          <MainDashboard  toggleSidebar={() => setSidebarOpen(!sidebarOpen)}  sidebarOpen={sidebarOpen} />
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-4">
            <div className="max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};