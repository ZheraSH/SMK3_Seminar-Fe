import BodyDashboardTeacher from "../teacher/home/BodyDashboardTeacher";
import BodyDashboardBK from "../BK/home/BodyDasboardBk";
import ClassRecapHomeRoom from "../homeroom-teacher/MainHomeRoomTeacher";
import { useEffect, useState } from "react";

export default function BodyDashboardMultiRole() {
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    
    const roles = Array.isArray(data?.roles)
      ? data.roles
      : data?.role
      ? [data.role]
      : [];
    
    setUserRoles(roles);
  }, []);

  const renderDashboards = () => {
    const dashboards = [];

    if (userRoles.includes("teacher")) {
      dashboards.push(
        <div key="teacher" className="w-full">
          <BodyDashboardTeacher />
        </div>
      );
    }

    if (userRoles.includes("counselor")) {
      dashboards.push(
        <div key="bk" className="w-full ">
          <BodyDashboardBK />
        </div>
      );
    }

    if (userRoles.includes("homeroom_teacher")) {
      dashboards.push(
        <div key="homeroom" className="w-full ">
          <ClassRecapHomeRoom />
        </div>
      );
    }

    return dashboards;
  };

  return (
    <div className=" bg-gray-50 min-h-screen">
      {userRoles.length > 0 ? (
        <div className="flex flex-col ">
          {renderDashboards()}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E3A8A]"></div>
          <p className="mt-4 text-gray-500">Memproses Dashboard Anda...</p>
        </div>
      )}
    </div>
  );
}