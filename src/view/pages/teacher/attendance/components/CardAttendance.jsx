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
    // Sesuai Postman: item.id dan item.lesson_hour.lesson_order
    setSelectedClass({ 
      id: item.id, 
      lesson_order: item.lesson_hour?.lesson_order ?? 1,
      // Tambahkan data pendukung untuk ClassAttendance
      name: item.name,
      lesson_hour: item.lesson_hour
    });
    setIsOpenClass(true);
  };

  if (loading) return <div className="w-full text-center py-10 font-semibold">Memuat data kelas...</div>;
  if (error) return <div className="w-full text-center py-10 text-red-500 font-semibold">{error}</div>;

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {classrooms.map((item) => (
        <div key={item.id} className="bg-white border border-gray-200 rounded-xl shadow-md p-3 flex flex-col justify-between transition hover:shadow-lg"> 
          
          <div className="flex justify-between items-start mb-4"> 
            <div className="flex items-center space-x-1 text-white bg-[#3B82F6] px-3 py-1 rounded-lg">
              <GraduationCap className="w-5 h-5" />
              <h3 className="text-sm font-semibold truncate max-w-[120px]">
                {item.name} {/* FIX: Langsung item.name sesuai Postman */}
              </h3> 
            </div>
            <span className="text-sm font-semibold text-[#444444]">
              {item.school_year} {/* FIX: Langsung item.school_year */}
            </span>
          </div>

          <div className="flex justify-between items-end mb-4"> 
            <div className="text-gray-600 overflow-hidden">
              <p className="text-[12px]">Wali Kelas:</p>
              <p className="font-semibold text-sm text-[#444444] truncate">
                {item.homeroom_teacher?.name ?? "Tidak tersedia"} {/* FIX: Sesuai Postman */}
              </p> 
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-5 h-5 mr-1" />
              <span className="font-semibold"> 
                {item.students?.total_count ?? 0} {/* FIX: Sesuai Postman */}
              </span>
            </div>
          </div>
          
          <div className="text-[12px] mb-3 text-gray-500"> 
            <span className="font-medium">Waktu:</span> {item.lesson_hour?.start_time} - {item.lesson_hour?.end_time}
          </div>

          <button 
            onClick={() => handleOpenClass(item)}
            className="w-full text-sm bg-[#3B82F6] hover:bg-blue-700 text-white font-medium rounded-lg h-[35px] transition shadow-md">
            Lihat Kelas
          </button>
        </div>
      ))}
    </div>
  );
}