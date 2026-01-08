import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoadingData from '../../../components/Loading/Data';

const getStatusClasses = (status, isTime) => {
    if (status === 'Telat') {
        return isTime
            ? "bg-[#FF5E5333] text-[#FF5E53] rounded-lg py-1 px-2 font-medium"
            : "text-black font-medium";
    } else {
        return isTime
            ? "bg-[#10B98133] text-[#10B981] rounded-lg py-1 px-2 font-medium"
            : "text-black font-medium";
    }
};

const isLate = (jam) => {
    if (!jam) return false;

    const normalized = jam.replace(".", ":");
    const [hour] = normalized.split(":").map(Number);

    return hour >= 7;
};


const AbsentStudentMain = () => {
    const [daftarAbsensi, setDaftarAbsensi] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await new Promise(resolve => setTimeout(resolve, 500));
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    "http://127.0.0.1:8000/api/student/attendance-history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            Accept: "application/json"
                        }
                    }
                );

                console.log("RESPON API:", res.data);

                // Detect data
                const dataFix = Array.isArray(res.data.data)
                    ? res.data.data
                    : [];

                setDaftarAbsensi(dataFix);

            } catch (error) {
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Pagination
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(daftarAbsensi.length / itemsPerPage) || 1;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = daftarAbsensi.slice(indexOfFirstItem, indexOfLastItem);

    const goToPage = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    if (loading) {
        return <LoadingData loading={loading} />;
    }

    return (
        <div className="p-4 ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 max-w-10xl mx-auto">
                Daftar Riwayat Absensi
            </h2>

            <div className="overflow-x-auto scrollbar-hide max-w-10xl mx-auto">
                <table className="min-w-full divide-y divide-gray-200 border-collapse">
                    <thead>
                        <tr>
                            {['Hari', 'Tanggal', 'Status', 'Jam Masuk', 'Jam Pulang'].map((header, index) => (
                                <th
                                    key={index}
                                    className={`
                    px-10 py-3 text-left text-xs font-medium text-white tracking-wider bg-[#3B82F6]
                    ${index === 0 ? 'rounded-tl-md' : ''}
                    ${index === 4 ? 'rounded-tr-md' : ''}
                  `}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200 border border-gray-300">
                        {currentItems.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-2 text-gray-500">
                                    Tidak ada data absensi.
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((data, rowIndex) => (
                                <tr key={data.id || rowIndex}>
                                    <td className="px-9 py-4 whitespace-nowrap text-sm text-gray-900">{data.hari}</td>
                                    <td className="px-7 py-4 whitespace-nowrap text-sm text-gray-900">{data.tanggal}</td>

                                    <td className="px-10 py-4 whitespace-nowrap text-sm">
                                        <span className={`font-normal ${getStatusClasses(data.status, false)}`}>
                                            {data.status}
                                        </span>
                                    </td>

                                   <td  className="px-13 py-4 whitespace-nowrap text-sm">
                                    <div className={`inline-flex rounded-lg py-1 px-2 font-medium ${isLate(data.jam_masuk)
                                                ? "bg-[#FF5E5333] text-[#FF5E53]"
                                                : "bg-[#10B98133] text-[#10B981]"
                                            }`}
                                    >
                                        {data.jam_masuk}
                                    </div>
                                  </td>

                                    <td className="px-13 py-4 whitespace-nowrap text-sm">
                                        <div className="inline-flex bg-[#10B98133] text-[#10B981] rounded-lg py-1 px-2 font-medium">
                                            {data.jam_pulang}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center items-center mt-8 mb-6">
                <nav className="inline-flex ">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-2  ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-white hover:bg-gray-50"}`}
                    >
                        {"<"}
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-4 border-t border-b rounded-[8px] ${page === currentPage
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-white text-blue-600 hover:bg-blue-50 border-gray-300"
                                }`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
                    >
                        {">"}
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default AbsentStudentMain;
