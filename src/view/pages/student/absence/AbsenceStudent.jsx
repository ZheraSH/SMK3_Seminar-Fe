'use client';

import React, { useEffect, useState } from 'react';
import { fetchAttendanceHistory } from '../../../../Core/api/role-student/absence-student/AbsenceStudent';
import Header from '../../../components/elements/header/Header-new';
import LoadingData from '../../../components/elements/loadingData/loading';
import { PaginationAbsenceStudent } from './components/PaginationAbsenceStudent';

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
        <div className="w-full bg-gray-50 p-6">
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
                <div className="px-6 py-4">
                    <h2 className="text-black font-semibold text-lg">
                        Daftar Riwayat Absensi
                    </h2>
                </div>

                {loading ? (
                    <LoadingData loading={loading} type="tableSiswaKaryawan" count={10} />
                ) : attendanceData.length === 0 ? (
                    <div className="flex flex-col justify-center items-center py-10 space-y-4">
                        <img
                            src="/images/particle/particle7.png"
                            alt="Tidak ada data"
                            className="w-300 h-100 object-contain"
                        />
                        <p className="text-gray-500 text-lg font-medium">
                            Belum ada data daftar riwayat absensi
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-blue-600 text-white">
                                        <th className="px-4 py-3 text-center font-semibold text-sm rounded-tl-sm">No</th>
                                        <th className="px-4 py-3 text-center font-semibold text-sm">Hari</th>
                                        <th className="px-4 py-3 text-center font-semibold text-sm">Tanggal</th>
                                        <th className="px-4 py-3 text-center font-semibold text-sm">Status</th>
                                        <th className="px-4 py-3 text-center font-semibold text-sm">Jam Masuk</th>
                                        <th className="px-4 py-3 text-center font-semibold text-sm rounded-tr-sm">Jam Pulang</th>
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
                                            <td className="px-4 py-3 text-sm text-gray-800 text-center">
                                                {record.day?.label || '-'}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-800 text-center">
                                                {record.date}
                                            </td>
                                            <td className="px-4 py-3 text-center align-middle">
                                                <span
                                                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                        record.status
                                                    )}`}
                                                >
                                                    {record.status?.label || '-'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-800 text-center">
                                                {record.check_in}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-800 text-center">
                                                {record.check_out}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <PaginationAbsenceStudent
                            currentPage={currentPage}
                            totalPages={pagination.last_page || 1} // fallback 1 agar tetap muncul
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
