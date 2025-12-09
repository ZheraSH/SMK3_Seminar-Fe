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
      lesson_order: item.lesson_hour?.lesson_order ?? 1 // aman kalau null
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
    <div className=" flex justify-center lg:justify-start ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 md:gap-x-20 lg:gap-x-3 mt-5 mb-10 z-10">
      {classrooms.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl w-[310px] min-h-[207px] shadow-md p-4 bg-white flex flex-col hover:shadow-xl transition border border-gray-200"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center bg-blue-500 text-white px-2 py-0 rounded-md text-[18px] font-semibold">
              <GraduationCap className="w-[20px] h-[20px] mr-2" />
              {item.name}
            </div>
            <span className="text-[14px] font-semibold text-gray-700">{item.school_year}</span>
          </div>

          <div className="mt-12 flex justify-between items-center">
            <div>
              <p className="text-[12px]">Wali Kelas :</p>
              <p className="font-semibold text-[14px]">
                {item.homeroom_teacher?.name ?? "Tidak tersedia"}
              </p>
            </div>
            <div className="flex items-center text-gray-700">
              <Users className="w-[24px] h-[24px] mr-1" />
              <span className="font-medium mt-2 text-[14px]">
                {item.students?.total_count ?? 0}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm"> {item.lesson_hour?.start_time}- {item.lesson_hour?.end_time}</p>
          </div>
            

          <button
            onClick={() => handleOpenClass(item)}
            className="w-full h-[37px] mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-medium text-[14px]"
          >
            Lihat Kelas
          </button>
        </div>
      ))}
      </div>
    </div>
  );
}
