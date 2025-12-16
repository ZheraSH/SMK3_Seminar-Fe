import { Users, GraduationCap, Search, ChevronDown, X } from "lucide-react";
import {Link,useNavigate} from "react-router-dom";
const ClassCard = ({ classData }) => {
  const navigate = useNavigate();
  const handleViewDetail = () => {
    navigate(`/home/classStudents/detail`, { 
    state: { 
      classroomId: classData.id
    } 
    });
  };
  const teacherName = classData.teacher?.name || classData.teacher || 'Wali Kelas belum diatur';
  const schoolYear = classData.school_year?.name || classData.school_year || '-';
  const studentCount = classData.studentCount || '-'; 
  return (
    <div className="bg-white h-[169px] border border-gray-200 rounded-xl shadow-md p-4 flex flex-col justify-between transition duration-300 hover:shadow-lg" >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center lg:space-x-2  text-white bg-[#3B82F6] h-[31px] px-3 rounded-lg">
          <div className="p-2">
            <GraduationCap className="w-5 h-5 " />
          </div>
          <h3 className="lg:text-sm md:text-[14px]  font-semibold">{classData.name}</h3>
        </div>
        <span className="lg:text-sm md:text-[14px] font-semibold text-gray-500 mt-2">{schoolYear}</span>
        
      </div>

      <div className="space-y-2 mb-1 flex justify-between items-center">
        <div className="text-gray-600">
          <p className="text-[12px]">Wali Kelas:</p>
          <p className="font-semibold text-[14px] text-[#444444]">{ classData.homeroom_teacher }</p>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-1 text-lg"><Users className="w-5 h-5 mr-1" /></span>
          <span className="font-semibold text-[14px] text-gray-700">{classData.total_students}</span>
        </div>
      </div>
      {/* <Link to={`/home/classStudents/${classData.id}`}> */}
        <button onClick={handleViewDetail} className="w-full text-[14px]  px-4 bg-[#3B82F6] text-white font-medium rounded-lg transition h-[37px] duration-150 shadow-md cursor-pointer">
        Lihat Detail
      </button>
      {/* </Link> */}
    </div>
  );
};

export default ClassCard