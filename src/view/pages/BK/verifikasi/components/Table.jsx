import { Check, X, Eye } from 'lucide-react';
import Pagination from './Pagination';

export default function Table({  data, loading,  error,  currentPage,  lastPage,  totalItems,  perPage,  onPageChange, onAction}) {

    const StatusBadge = ({ status }) => {
        const color =
            status === "Sakit" ? "bg-[#F59E0B]" :
            status === "Dispensasi" ? "bg-[#22C55E]" :
            "bg-[#0EA5E9] ";

        return (
            <span className={`px-3 py-1 text-[12px] text-white w-[105px] font-medium rounded-full inline-block ${color}`}>
                {status}
            </span>
        );
    };

    const VerificationBadge = ({ statusLabel, statusValue }) => {
        const color =
            statusValue === "approved" ? "bg-[#22C55E]" :
            statusValue === "rejected" ? "bg-[#EF4444]" :
            "bg-[#FBBF24] ";    
        return (
            <span className={`px-3 py-1 text-[12px] text-white w-[105px] font-medium rounded-full inline-block ${color}`}>
                {statusLabel}
            </span>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        
        const date = new Date(dateString);
        
        if (isNaN(date.getTime())) return "-";

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };

    return (
        <>
            <div className="overflow-x-auto rounded-lg drop-shadow-md border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                    <thead className="bg-[#3B82F6] text-white">
                        <tr>
                            {["No","Nama","Kelas","Tipe Izin","Status","Tanggal","Aksi"].map((header) => (
                                <th key={header} className={`px-4 py-3 text-sm font-medium  ${header === 'Aksi' ? 'w-[150px] sm:w-auto' : ''}`}>
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan={6} className="py-4 text-blue-600">Memuat data...</td></tr>
                        ) : error ? (
                            <tr><td colSpan={6} className="py-4 text-red-600">{error}</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={6} className="py-4 text-gray-600">Tidak ada data izin yang menunggu verifikasi.</td></tr>
                        ) : (
                            data.map((s, index) => (
                                <tr key={s.id} className="hover:bg-gray-50 transition duration-100">
                                    <td className="px-4 py-3 whitespace-nowrap text-md font-medium text-gray-900 w-12">{(currentPage - 1) * perPage + index + 1}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-md text-gray-700">{s.student?.name}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-[12px] text-white font-medium">
                                        <span className={`inline-block rounded-full text-center w-[105px] py-1 px-2 ${s.classroom?.name ? 'bg-[#8B5CF6]' : ''}`}>
                                            {s.classroom?.name || "-"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={s.type.label} /></td>
                                    <td className="px-4 py-3 whitespace-nowrap text-md text-gray-700"><VerificationBadge  statusLabel={s.status.label}  statusValue={s.status.value}/></td>
                                    <td className="px-4 py-3 whitespace-nowrap text-md text-gray-700">{formatDate(s.date.start || "-")}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium w-[150px] sm:w-auto text-center">
                                        <button onClick={() => onAction("view", s)} className="bg-[#3B82F6] text-[12px] rounded-md h-[30px] py-[7px] px-3 text-white font-medium hover:bg-[#2563EB] transition-200 cursor-pointer">Lihat Detail</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4">
                {totalItems > 0 && (
                    <Pagination currentPage={currentPage} lastPage={lastPage} totalItems={totalItems} perPage={perPage} onPageChange={onPageChange} isLoading={loading}/>
                )}
            </div>
        </>
    );
}