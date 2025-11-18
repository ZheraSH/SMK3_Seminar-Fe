import React, { useState } from 'react';
import { Trash2 ,Plus} from 'lucide-react';
const ScheduleLayout = ({ mode, selectedClassName, setSelectedTab }) => {
    
    const isClassMode = mode === 'jadwal-kelas';
    
    const classDetail = {
        className: selectedClassName,
        homeroom: 'Deddy Setiawan',
        students: 36,
        year: '2024/2025'
    };
    
    // Data dummy untuk tabel jam/jadwal
    const timeSlots = [
        { no: 1, time: '07.00 - 07.45', designation: 'Jam Ke 1', subject: 'Matematika', teacher: 'Deddy Irawan' },
        { no: 2, time: '07.45 - 08.30', designation: 'Jam Ke 2', subject: 'Bhs. Indonesia', teacher: 'Deddy Irawan' },
        { no: 3, time: '08.30 - 09.15', designation: 'Jam Ke 3', subject: 'Bhs. Inggris', teacher: 'Deddy Irawan' },
        { no: 4, time: '09.15 - 10.00', designation: 'Istirahat', isBreak: true, subject: '-', teacher: '-' },
        { no: 5, time: '10.00 - 10.45', designation: 'Jam Ke 4', subject: 'Matematika', teacher: 'Deddy Irawan' },
        { no: 6, time: '10.45 - 11.30', designation: 'Jam Ke 5', subject: 'Matematika', teacher: 'Deddy Irawan' },
        { no: 7, time: '11.30 - 12.15', designation: 'Jam Ke 6', subject: 'Matematika', teacher: 'Deddy Irawan' },
    ];
    
    const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum\'at'];
    const [activeDay, setActiveDay] = useState('Senin');

    return (
        <div className="flex flex-col gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-xl">
                
          

                {/* --- KOTAK INFORMASI (Hanya tampil di Mode Jam Pelajaran) --- */}
                {mode === 'jam' && (
                    <div className="bg-[#FFF5E3] p-4 rounded-md mb-3">
                        <p className="text-base font-semibold text-[#FFAA05] mb-2">Informasi</p>
                        <ul className="list-disc  text-sm  space-y-1 ml-4">
                            <li>Pada Pengaturan Awal, Jam Pelajaran Dimulai pada Jam 07:00.</li>
                            <li>Saat Anda Menambah Jam Pelajaran, Hanya Perlu Menambah Menit, Jam Akan Otomatis Bertambah Sesuai Menit dan Jam Pelajaran Terakhir</li>
                            <li>Saat Menghapus Data, Maka Yang Terakhir Dalam Jam Pelajaran Akan Terhapus</li>
                        </ul>
                    </div>
                )}

                {/* Navigasi Hari */}
                <div className="flex space-x-1 p-1 bg-gray-100 rounded-lg shadow-inner w-fit mb-6">
                    {days.map(day => (
                        <button 
                            key={day} 
                            onClick={() => setActiveDay(day)}
                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${
                                activeDay === day 
                                ? 'bg-[#3B82F6] text-white shadow-md' 
                                : 'bg-transparent text-gray-700 hover:bg-white'
                            }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>
                
                {/* --- TABEL JADWAL/JAM --- */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#3B82F6] text-white">
                            <tr>
                                {['No', 'Waktu', 'Penempatan', isClassMode ? 'Mata Pelajaran' : '', isClassMode ? 'Guru' : '', 'Aksi']
                                    .filter(h => h !== '') 
                                    .map(header => (
                                    <th key={header} className="px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-center">
                            {timeSlots.map((slot, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{slot.no}</td>
                                    
                                    <td className={`px-6 py-3 whitespace-nowrap text-sm font-semibold ${slot.isBreak ? 'text-[#FACC15] font-bold' : 'text-[#3B82F6]'}`}>{slot.time}</td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">{slot.designation}</td>
                                    {isClassMode && (
                                        <>
                                            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{slot.subject}</td>
                                            <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-700">{slot.teacher}</td>
                                        </>
                                    )}
                                    
                                    <td className="px-6 py-3 whitespace-nowrap text-center text-sm font-medium">
                                        {isClassMode ? (
                                            !slot.isBreak && (
                                                <div className="flex justify-end items-center">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                                                    <svg className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5v14"></path></svg>
                                                </div>
                                            )
                                        ) : (
                                            <button className="text-red-500 hover:text-red-700 ml-2">
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Tombol Tambah */}
                   <div className='flex justify-center items-center'>
                      <button className="mt-6 gap-2 px-4 py-2 text-sm text-center flex flex-row bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition duration-200 shadow-md">
                          <Plus size={20}/> Tambah Jam Pelajaran
                      </button>
                   </div>
            </div>
        </div>
    );
};

export default ScheduleLayout;