
import { Outlet } from "react-router-dom";
import SidebarSection from "../components/Elements/SideBar/SidebarSection";


export const DashboardLayouth = (props) => {
  const {children} = props;
  return (
    <>
      <div className="flex">
        <SidebarSection />

        <div className="ml-[250px] flex-1 h-screen overflow-y-auto bg-gray-50">
          <Outlet/>
        </div>
      </div>
    </>
  );
};

