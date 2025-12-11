import { User, GraduationCap } from 'lucide-react';

const CardList = ({ schedule, handleViewSchedule}) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {schedule.map((data, index) => (
            <div key={index} className="bg-white h-[169px] rounded-lg p-4 drop-shadow-md hover:shadow-xl transition duration-300 border border-gray-100 cursor-pointer">
                <div className="flex items-center space-x-2 mb-2 justify-between">
                   <div className='flex flex-row gap-2 items-center bg-[#3B82F6] mb-3 h-[31px] px-2 p-1 rounded-lg text-white'> 
                        <GraduationCap size={24} />
                        <h3 className="text-md font-semibold">{data.name}</h3>
                   </div> 
                   <span className='text-sm font-semibold text-[#444444]'>{data.school_year}</span>
                </div>
                <div className='space-y-2 mb-1 flex justify-between items-center'>
                  <div className="text-gray-600">
                    <p className="text-[12px]">Wali Kelas:</p>
                    <p className="font-semibold text-[14px] text-gray-700">{data.homeroom_teacher}</p>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className='mr-1 text-lg'><User size={20} /></span>
                    <span className='font-semibold text-[#444444] text-[14px]'> {data.total_students}</span>
                  </div>
                </div>
                <button onClick={() => handleViewSchedule(data)}className="w-full bg-[#3B82F6] text-white h-[37px] text-[14px] rounded-lg font-medium transition duration-200">
                    Lihat Jadwal
                </button>
            </div>
        ))}
    </div>
);

export default CardList;