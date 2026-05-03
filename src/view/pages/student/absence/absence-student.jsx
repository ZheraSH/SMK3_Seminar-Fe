'use client';

import React, { useEffect, useState } from 'react';
import { fetchAttendanceHistory } from '@services/role-student/absence-student/absence-student';
import Header from '@elements/header/header-new-1';
import LoadingData from '@elements/loading-data/loading';
import { PaginationAbsenceStudent } from './components/pagination-absence-student';

import { LogIn, LogOut } from 'lucide-react';

const getStatusColor = (status) => {
    const statusValue = status?.value || status;
    switch (statusValue) {
        case 'hadir':
            return 'bg-green-500 text-white';
        case 'sakit':
            return 'bg-yellow-500 text-white';
        case 'alpha':
        case 'alpa':
            return 'bg-red-500 text-white';
        case 'terlambat':
            return 'bg-orange-500 text-white';
        case 'izin':
            return 'bg-blue-500 text-white';
        default:
            return 'bg-gray-500 text-white';
    }
};

export default function AbsentStudentMain() {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        per_page: 10
    });

    const loadData = async (page) => {
        setLoading(true);
        try {
            const response = await fetchAttendanceHistory(page);
            if (response.data.status) {
                setAttendanceData(response.data.data);
                if (response.data.meta) {
                    setPagination(response.data.meta);
                }
            }
        } catch (error) {
            console.error("Error fetching attendance:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="w-full bg-gray-50 mb-10">
            {loading ? (
                <LoadingData loading={true} type="header1" />
            ) : (
                <Header
                    src='/images/particle/particle4.png'
                    span='Absensi'
                    p='Kehadiran secara lengkap sebagai pemantauan disiplin dan tanggung jawab.'
                />
            )}

            <div className="">
                <div className="ml-2 py-4">
                    <h2 className="text-black font-semibold text-xl">
                        Daftar Riwayat Absensi
                    </h2>
                </div>

                {loading ? (
                    <>
                        <div className="hidden md:block">
                            <LoadingData loading={loading} type="tableSiswaKaryawan" count={10} />
                        </div>
                        <div className="md:hidden">
                            <LoadingData loading={loading} type="absenceCard" count={5} />
                        </div>
                    </>
                ) : attendanceData.length === 0 ? (
                    <div className="flex flex-col justify-center items-center py-10 space-y-4">
                        <img
                            src="/images/particle/particle7.png"
                            alt="Tidak ada data"
                            className="w-300 h-100 object-contain"
                        />
                        <p className="text-gray-500 text-lg text-center font-medium">
                            Belum ada data daftar riwayat absensi
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-600 text-white">
                                        <th className="px-4 py-3 text-center font-semibold text-[14px] rounded-tl-sm">No</th>
                                        <th className="px-4 py-3 text-center font-semibold text-[14px]">Hari</th>
                                        <th className="px-4 py-3 text-center font-semibold text-[14px]">Tanggal</th>
                                        <th className="px-4 py-3 text-center font-semibold text-[14px]">Status</th>
                                        <th className="px-4 py-3 text-center font-semibold text-[14px]">Jam Masuk</th>
                                        <th className="px-4 py-3 text-center font-semibold text-[14px] rounded-tr-sm">Jam Pulang</th>
                                    </tr>
                                </thead>

                                <tbody className='border border-gray-300'>
                                    {attendanceData.map((record, index) => (
                                        <tr
                                            key={index}
                                            className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-50'
                                                } hover:bg-gray-100 transition-colors`}
                                        >
                                            <td className="px-4 py-3 text-sm text-gray-800 text-center">
                                                {index + 1 + (currentPage - 1) * pagination.per_page}
                                            </td>
                                            <td className="px-4 py-3 text-[14px] text-gray-800 text-center">
                                                {record.day?.label || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-[14px] text-gray-800 text-center">
                                                {record.date || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-center align-middle">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-[12px] ${getStatusColor(
                                                        record.status
                                                    )}`}
                                                >
                                                    {record.status?.label || '-'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-[14px] font-semibold text-gray-800 text-center">
                                                {record.check_in || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-[14px] font-semibold text-gray-800 text-center">
                                                {record.check_out || '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="md:hidden space-y-4 px-2">
                            {attendanceData.map((record, index) => (
                                <div key={index} className="bg-white rounded-2xl p-5 shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-50 relative overflow-hidden active:scale-[0.99] transition-transform">
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${getStatusColor(record.status)} opacity-60`} />

                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center text-[10px] font-black">
                                                {index + 1 + (currentPage - 1) * pagination.per_page}
                                            </span>
                                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Riwayat Absensi</span>
                                        </div>
                                        <div className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm ${getStatusColor(record.status)}`}>
                                            {record.status?.label}
                                        </div>
                                    </div>

                                    <div className="mb-5">
                                        <h3 className="text-gray-800 font-bold text-[15px] leading-tight flex items-baseline gap-1.5">
                                            {record.day?.label}
                                            <span className="text-gray-400 font-medium text-[13px]">• {record.date}</span>
                                        </h3>
                                    </div>

                                    <div className="flex items-center gap-4 border-t border-gray-50 pt-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <LogIn size={14} className="text-blue-500" />
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Masuk</span>
                                            </div>
                                            <p className="text-[14px]  text-gray-700 font-semibold tracking-tight">
                                                {record.check_in || '--:--'}
                                            </p>
                                        </div>

                                        <div className="w-[1px] h-8 bg-gray-100" />

                                        <div className="flex-1">
                                            <div className="flex items-center gap-1.5 mb-1">
                                                <LogOut size={14} className="text-orange-500" />
                                                <span className="text-[9px] font-black text-gray-400 uppercase tracking-tighter">Pulang</span>
                                            </div>
                                            <p className="text-[14px]  text-gray-700 font-semibold tracking-tight">
                                                {record.check_out || '--:--'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <PaginationAbsenceStudent currentPage={currentPage} totalPages={pagination.last_page || 1} onPageChange={handlePageChange}/>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

