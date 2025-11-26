import { useState,useEffect } from "react";
import { Check, X, Eye } from 'lucide-react';

export default function Table({ getVerifyPermissionBk }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    getVerifyPermissionBk()
      .then((data) => {
        if (!data) {
          setError("Data Izin Tidak Ditemukan");
          return;
        }
        setStudents(data || []);
      })
      .catch(() => {
        setError("Gagal memuat data Izin");
        setStudents([]);
      })
      .finally(() => setLoading(false));
  }, []);



  const StatusBadge = ({ status }) => {
    const color =
      status === "sakit" ? "bg-yellow-100 text-yellow-700" :
      status === "dispensasi" ? "bg-blue-100 text-blue-700" :
      "bg-yellow-100 text-yellow-700";

    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-md ${color}`}>
        {status}
      </span>
    );
  };
 

  const ActionButton = ({ icon: Icon, color, onClick }) => {
    const isEyeIcon = Icon === Eye;
    const iconBackgroundClass = isEyeIcon ? "" : "bg-white rounded-full";
    
    let iconColorClass;
    if (isEyeIcon) {
      iconColorClass = "text-white";
    } else if (Icon === Check) {
      iconColorClass = "text-green-600";
    } else if (Icon === X) {
      iconColorClass = "text-red-500";
    } else {
      iconColorClass = "text-blue-600";
    }

    return (
      <button
        onClick={onClick}
        className={`w-8 h-8 p-2 rounded-lg text-white shadow-md transition-all duration-200 flex items-center justify-center ${color} hover:shadow-lg hover:brightness-105`}
      >
        <div
          className={`flex items-center justify-center p-[1px] ${iconBackgroundClass}`}
        >
          <Icon
            size={isEyeIcon ? 20 : 16}
            strokeWidth={isEyeIcon ? 2.5 : 4}
            className={iconColorClass}
          />
        </div>
      </button>
    );
  };

  const handleAction = (type, data) => {
    console.log(type, data);
  };

  return (
    <div className="overflow-x-auto rounded-lg drop-shadow-md border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200 text-center">
        <thead className="bg-blue-600 text-white">
          <tr>
            {["No","Nama","Kelas","Tanggal","Keterangan","Aksi"].map((header) => (
              <th
                key={header}
                className={`px-4 py-3 text-sm font-medium uppercase tracking-wider ${header === 'Aksi' ? 'w-[150px] sm:w-auto' : ''}`}
              >
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
          ) : students.length === 0 ? (
            <tr><td colSpan={6} className="py-4 text-gray-600">Tidak ada data</td></tr>
          ) : (
            students.map((s, index) => (
              <tr key={s.id} className="hover:bg-gray-50 transition duration-100">
                <td className="px-4 py-3 whitespace-nowrap text-md font-medium text-gray-900 w-12">{index + 1}</td>
                <td className="px-4 py-3 whitespace-nowrap text-md text-gray-700">{s.student?.name}</td>
                <td className="px-4 py-3 whitespace-nowrap text-md text-gray-700">{s.class || "-"}</td>
                <td className="px-4 py-3 whitespace-nowrap text-md text-gray-700">{s.start_date}</td>
                <td className="px-4 py-3 whitespace-nowrap"><StatusBadge status={s.type_label} /></td>

                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium w-[150px] sm:w-auto text-center">
                  <div className="flex items-center justify-center space-x-2 text-center">
                    <ActionButton
                      icon={Check}
                      color="bg-[#30D158]"
                      onClick={() => handleAction("Setuju", s)}
                    />
                    <ActionButton
                      icon={X}
                      color="bg-[#FF5E53]"
                      onClick={() => handleAction("Tolak", s)}
                    />
                    <ActionButton
                        icon={Eye}
                        color="bg-blue-500 hover:bg-blue-600"
                        onClick={() => handleAction("Lihat Detail", s)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
