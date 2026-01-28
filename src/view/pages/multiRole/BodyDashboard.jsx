import {Main} from "../BK/home/BodyDasboardBk";
import HomeRoomHome from "../homeroom-teacher/home/MainHomeroomHome";
import { useEffect, useState } from "react";
import { MainTeacher } from "../teacher/home/BodyDashboardTeacher";

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
          <MainTeacher classrooms={[]} schedule={[]} />
        </div>
      );
    }

    if (userRoles.includes("counselor")) {
      dashboards.push(
        <div key="bk" className="w-full ">
          <Main />
        </div>
      );
    }

    if (userRoles.includes("homeroom_teacher")) {
      dashboards.push(
        <div key="homeroom" className="w-full ">
          <HomeRoomHome />
        </div>
      );
    }

    return dashboards;
  };

  const [user, setUser] = useState({ name: "", email: "" })

  useEffect(() => {
    const storedUser = localStorage.getItem("userData")
    if (storedUser) setUser(JSON.parse(storedUser))
  }, [])

  return (
    <div className=" bg-gray-50 min-h-screen mt-8">
      <h1 className="font-semibold text-xl md:text-2xl mb-6 text-gray-700">Selamat datang, {user.name}</h1>
      {userRoles.length > 0 ? (
        <div className="flex flex-col gap-10 ">
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