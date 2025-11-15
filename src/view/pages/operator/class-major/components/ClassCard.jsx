import { Users, GraduationCap, Search, ChevronDown, X } from "lucide-react";
const ClassCard = ({ classData }) => {
  const teacherName = classData.teacher?.name || classData.teacher || 'Wali Kelas belum diatur';
  const schoolYear = classData.school_year?.name || classData.school_year || '-';
  const studentCount = classData.studentCount || '-'; 
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col justify-between transition duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2 text-white bg-[#3B82F6] px-3 rounded-lg">
          <div className="p-2 ">
            <GraduationCap className="w-5 h-5 " />
          </div>
          <h3 className="text-sm font-semibold">{classData.name}</h3>
        </div>
        <span className="text-sm font-medium text-gray-500 mt-2">{schoolYear}</span>
        
      </div>

      <div className="space-y-2 mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          <p className="font-medium">Wali Kelas:</p>
          <p className="font-semibold text-gray-700">{teacherName}</p>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-1 text-lg"><Users className="w-5 h-5 mr-1" /></span>
          <span className="font-semibold text-gray-700">{studentCount}</span>
        </div>
      </div>
      <button className="w-full py-2 px-4 bg-[#3B82F6] text-white font-semibold rounded-lg transition duration-150 shadow-md cursor-pointer">
        Lihat Detail
      </button>
    </div>
  );
};

export default ClassCard