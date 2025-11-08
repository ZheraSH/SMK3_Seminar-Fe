import { useState, useEffect } from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { menuItems } from "@data/dashboardData";
import MainDashboard from "../components/elements/MainDashboard";
import axios from "axios";

// const endpoint = "http://127.0.0.1:8000/api/students";
//   fetch(endpoint)
//     .then((response) => response.json())
//     .then(({data}) => console.log(data))






export const DashboardLayouth = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/students')
    .then(data => setStudents(data.data));  
  },[]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <>
      {/* Navbar untuk HP */}
      <div className="md:hidden flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>

        <h1 className="text-[#1E3A8A] font-bold text-base">
          Smkn 3 Pamekasan
        </h1>

        <img
          className="w-9 h-9 rounded-full object-cover"
          src="images/team/valen.jpg"
          alt="User"
        />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={`bg-[#1E3A8A] w-[270px] h-screen fixed top-0 left-0 z-40 transform transition-transform duration-300 md:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex justify-center items-center px-6 gap-3 py-6">
            <img className="w-10 h-10" src="../images/SMKNLOGO1.png" alt="Logo" />
            <div className="text-white font-bold text-sm leading-tight">
              SMK Negeri 3<br />Pamekasan
            </div>
          </div>

          <div className="p-6 text-white">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 p-2 font-bold mb-3 cursor-pointer duration-300 hover:bg-white hover:rounded-[12px] hover:text-[#1E3A8A] ${
                  location.pathname === item.path
                    ? "bg-white text-[#1E3A8A] rounded-[12px]"
                    : ""
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Overlay HP */}
        {open && (
          <div
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
            onClick={() => setOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <div className="md:ml-[270px] flex-1 h-screen overflow-y-auto bg-gray-50">
          <MainDashboard />
          <Outlet />
        </div>
      </div>
    </>
  );
};
