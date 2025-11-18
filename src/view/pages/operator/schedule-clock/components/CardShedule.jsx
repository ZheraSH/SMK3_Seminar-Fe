import { User, GraduationCap } from 'lucide-react';

const CardList = ({ schedule}) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {schedule.map((data, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 cursor-pointer">
                <div className="flex items-center space-x-2 mb-2 justify-between">
                   <div className='flex flex-row gap-2 items-center bg-[#3B82F6] px-2 p-1 rounded-lg text-white'> 
                      <GraduationCap  size={24} />
                      <h3 className="text-md font-semibold">{data.classroom.name}</h3>
                   </div>          
                    <span className='text-sm '>{data.classroom.school_year}</span>
                </div>
                <div className='space-y-2 mb-4 flex justify-between items-center'>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium">Wali Kelas:</p>
                    <p className="font-semibold text-gray-700">{data.classroom.homeroom_teacher}</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <span className='mr-1 text-lg'><User size={20} /></span>
                    <span className='font-semibold text-[#444444]'> {data.classroom.total_students}</span>
                </div>
                </div>
                {/* Tombol yang akan mengarahkan ke tab 'jadwal' jika ini adalah implementasi penuh */}
                <button className="w-full bg-[#3B82F6] text-white py-2 rounded-lg font-semibold transition duration-200">
                    Lihat Jadwal
                </button>
            </div>
        ))}
    </div>
);

export default CardList;