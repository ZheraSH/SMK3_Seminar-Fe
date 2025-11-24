import { GraduationCap, Users } from "lucide-react";
import { attendanceData } from "../../../../../Core/Data/TeacherData";


export default function CardAttendance({ activeDay, setSelectedClass, setIsOpenClass }) {

  const handleOpenClass = (item) => {
    setSelectedClass(item);
    setIsOpenClass(true);
  };
  const filteredClasses = attendanceData.filter((item) => item.day === activeDay);

  return (
    <div className="flex flex-wrap gap-8 mt-5 mb-10 z-10">
      {filteredClasses.length === 0 && (
        <div className="w-full text-center py-10 text-gray-600 text-lg font-semibold">
          Tidak ada kelas di hari ini
        </div>
      )}
      
      {filteredClasses.map((item, index) => (
        <div
          key={index}
          className="rounded-2xl w-[343px] min-h-[207px] shadow-md p-4 bg-white flex flex-col  hover:shadow-xl transition border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-md text-[20px] font-semibold">
              <GraduationCap className="w-[25px] h-[25px] mr-2" />
              {item.className } 
            </div>
            <span className="text-[16px] font-semibold text-[#444444]">{item.year}</span>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div>
              <p className="text-[12px]">Wali Kelas :</p>
              <p className="font-semibold text-[14px]">{item.teacher}</p>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="w-[24px] h-[24px] mr-1" />
              <span className="font-medium mt-2 text-[14px]">{item.studentCount}</span>
            </div>
          </div>

          <button
            onClick={() => handleOpenClass(item)}
            className=" w-full h-[37px] mt-7 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-medium text-[14px]"
          >
            Lihat Kelas
          </button>
        </div>
      ))}
    </div>
  );
}
