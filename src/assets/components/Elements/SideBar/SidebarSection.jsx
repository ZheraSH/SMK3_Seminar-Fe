import { Link, useLocation } from "react-router-dom";
import { menuItems } from "@data/DashboardData";

const SidebarSection = () => {
  const location = useLocation();

  return (
    <div className="bg-[#1E3A8A] w-[250px] h-screen fixed">
      <div className="flex justify-center items-center px-10 gap-3 py-6">
        <img className="w-10 h-10" src="../Images/SMKNLOGO1.png" alt="Logo" />
        <div className="flex flex-col justify-center text-white font-bold">
          SMK Negri 3 Pamekasan
        </div>
      </div>
      <div className="p-6 text-white">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-3 p-2 font-bold mb-3 cursor-pointer duration-300 hover:bg-white hover:rounded-full hover:text-[#1E3A8A] ${
              location.pathname === item.path
                ? "bg-white text-[#1E3A8A] rounded-full"
                : ""
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SidebarSection;
