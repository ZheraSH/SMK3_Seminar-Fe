import { useEffect,useState } from "react";
import { presence,schedule,status,history } from "../../../../Core/Data/SiswaData";
import ProfileHeader from "./components/ProfileHeader";
import Card from "./components/AttendanceCards";
import TableSchedule from "./components/TableSchedule";
import TableHistory from "./components/TableHistory";


export default function BodyDashboard () {
    const [user, setUser] = useState({ name: "", email: "" });

    useEffect(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) setUser(JSON.parse(storedUser));
      }, []);
      
    return (
        <div className="justify-center mx-5 mb-10 mt-5">
           <ProfileHeader  user= {user}/>
            <Card presence= {presence}/>
            <div className=" flex gap-5">
                <div className="flex flex-col gap-5 w-[675px] h-[383px] rounded-xl shadow-lg border border-gray-300 p-5">
                    <h1 className=" text-[24px] font-semibold "> Jadwal Peajaran Hari Ini </h1>
                    <TableSchedule schedule={schedule} />
                </div>
                <div className=" w-[434px] h-[357px] gap-5  rounded-xl shadow-lg border border-gray-300 p-5 flex flex-col">
                    <h1 className=" text-[24px] font-semibold"> Riwayat Izin Terbaru</h1>
                    <TableHistory 
                        status={status}
                        history = {history}
                    />

                </div>
            </div>
        </div>
    );
}