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
          className="rounded-2xl w-[343px] min-h-[207px] shadow-md p-4 bg-white flex flex-col justify-between hover:shadow-xl transition border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-md">
              <GraduationCap className="w-[25px] h-[25px] mr-2" />
              {item.className}
            </div>
            <span className="text-sm font-semibold">{item.year}</span>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div>
              <p className="text-sm">Wali Kelas :</p>
              <p className="font-semibold">{item.teacher}</p>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="w-7 h-7 mr-1" />
              <span className="font-medium mt-2">{item.studentCount}</span>
            </div>
          </div>

          <button
            onClick={() => handleOpenClass(item)}
            className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Lihat Kelas
          </button>
        </div>
      ))}
    </div>
  );
}
