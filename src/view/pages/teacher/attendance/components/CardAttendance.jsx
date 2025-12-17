// CardAttendance.jsx
import { GraduationCap, Users } from "lucide-react";

export default function CardAttendance({ 
  classrooms, 
  loading, 
  error, 
  setSelectedClass, 
  setIsOpenClass 
}) {

  const handleOpenClass = (item) => {
    setSelectedClass({ 
      id: item.id, 
      lesson_order: item.lesson_hour?.lesson_order ?? 1
    });
    setIsOpenClass(true);
  };

  if (loading) {
    return (
      <div className="w-full text-center py-10 text-gray-600 text-lg font-semibold">
        Memuat data kelas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-10 text-red-500 text-lg font-semibold">
        {error}
      </div>
    );
  }

  if (!classrooms || classrooms.length === 0) {
    return (
      <div className="w-full text-center py-10 text-gray-600 text-lg font-semibold">
        Tidak ada kelas mengajar
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {classrooms.map((item) => (
      <div
        key={item.id}
        className="bg-white h-full border border-gray-200 rounded-xl shadow-md p-3 flex flex-col justify-between transition duration-300 hover:shadow-lg "> 
        
        <div className="flex justify-between items-start mb-12"> 
          <div className="flex items-center space-x-1 text-white bg-[#3B82F6] h-[31px] px-3 rounded-lg flex-shrink-0">
            <GraduationCap className="w-5 h-5 flex-shrink-0" />
            <h3 className="text-sm font-semibold truncate max-w-[100px] md:max-w-[120px]">{item.name}</h3> 
          </div>
          <span className="text-sm font-semibold text-gray-500 mt-1 flex-shrink-0">{item.school_year}</span>
        </div>

        <div className="flex justify-between items-end flex-grow"> 
          <div className="text-gray-600 overflow-hidden">
            <p className="text-[12px]">Wali Kelas:</p>
            <p className="font-semibold text-sm text-[#444444] truncate">{item.homeroom_teacher?.name ?? "Tidak tersedia"}</p> 
          </div>
          <div className="flex items-center text-sm text-gray-600 flex-shrink-0">
            <Users className="w-5 h-5 mr-1" />
            <span className="font-semibold text-sm text-gray-700"> {item.students?.total_count ?? 0} </span>
          </div>
        </div>
        
        <p className="text-[12px] mb-1 text-gray-500"> 
          <span className="font-medium">Waktu:</span> {item.lesson_hour?.start_time}- {item.lesson_hour?.end_time}
        </p>

        <button 
          onClick={() => handleOpenClass(item)}
          className="w-full text-sm px-4 bg-[#3B82F6] hover:bg-blue-700 text-white font-medium rounded-lg transition h-[35px] duration-150 shadow-md">
          Lihat Kelas
        </button>
      </div>
      ))}
    </div>
  );
}