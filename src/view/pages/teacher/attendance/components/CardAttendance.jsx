import { GraduationCap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CardAttendance({ 
  classrooms, 
  loading, 
  error,
  selectedDate 
}) {
  const navigate = useNavigate();

  const handleOpenClass = (item) => {
  const order = item.lesson_hour?.lesson_order ?? 1;
  const dateParam = selectedDate || new Date().toISOString().split("T")[0];

  // Navigasi ke path /detail dengan membawa data tersembunyi (state)
  navigate(`/teacher-home/attendance-teacher/detail`, { 
    state: { 
      classroomId: item.id,
      date: dateParam,
      lesson_order: order
    } 
  });
};

  if (loading) {
    return (
      <div className="w-full text-center py-10 font-semibold text-gray-500">
        Memuat data kelas...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-10 text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pb-4">
      {classrooms.map((item) => (
        <div 
          key={`${item.id}-${item.lesson_hour?.lesson_order || 'idx'}`} 
          className="bg-white  rounded-xl shadow-md p-3 flex flex-col justify-between border border-gray-200"
        >
          
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center gap-2 text-white bg-blue-500 px-3 py-1 rounded-lg">
              <GraduationCap className="w-6 h-6" />
              <h3 className="text-[15px] font-semibold truncate max-w-[120px]">
                {item.name}
              </h3>
            </div>
            <span className="text-sm font-semibold text-gray-700">{item.school_year}</span>
          </div>

          <div className="flex justify-between items-end ">
            <div className="overflow-hidden">
              <p className="text-[12px] text-gray-500">Wali Kelas</p>
              <p className="font-semibold text-sm text-gray-800 truncate">
                {item.homeroom_teacher?.name ?? "-"}
              </p>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-5 h-5 mr-1" />
              <span className="font-semibold">{item.students?.total_count ?? 0}</span>
            </div>
            
          </div>
          <div className="text-gray-500 text-[12px] mb-1">
            <span className="font-medium">Waktu:</span>{" "}
            {item.lesson_hour?.start_time} - {item.lesson_hour?.end_time}
          </div>

          <button
            type="button"
            onClick={() => handleOpenClass(item)}
            className="w-full h-[35px] bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors active:scale-95"
          >
            Lihat Kelas
          </button>
        </div>
      ))}
    </div>
  );
}