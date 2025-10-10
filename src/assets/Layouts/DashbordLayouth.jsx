import BodyDashboard from "../components/Fragments/Dashbord/Home/BodyDashbord";
import MainDashboard from "../components/Fragments/Dashbord/Home/MainDashbord";
import SidebarSection from "../components/Elements/SideBar/SidebarSection";

const DashbordLayouth = () => {
  return (
    <>
      <div className="flex">
        <SidebarSection />

        <div className="ml-[250px] flex-1 h-screen overflow-y-auto bg-gray-50">
          <MainDashboard />
          <BodyDashboard />
        </div>
      </div>
    </>
  );
};

export default DashbordLayouth;
