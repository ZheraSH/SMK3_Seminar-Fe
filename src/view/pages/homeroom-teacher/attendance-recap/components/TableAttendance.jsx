export default function TableRecap ({ table = [] ,calculateNumber,}) { 
    return(
        <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-[14px]">
              <thead className="bg-[#3B82F6]">
                <tr>
                  <th className="px-6 py-4 font-semibold text-white text-center">No</th>
                  <th className="px-6 py-4 font-semibold text-white text-center">Foto</th>
                  <th className="px-6 py-4 font-semibold text-white text-center">Nisn</th>
                  <th className="px-6 py-4 font-semibold text-white text-center">Nama</th>
                  <th className="px-6 py-4 font-semibold text-white text-center">Status</th>
                  <th className="px-6 py-4 font-semibold text-white text-center">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {table && table.length > 0 ? (
              table.map((item, index) => (
                <tr key={index} className={`${index % 2 === 1 ? 'bg-indigo-50/30' : 'bg-white'} hover:bg-blue-50/50 transition-colors`}>
                  <td className="px-6 py-4 text-center text-gray-500">
                    {calculateNumber ? calculateNumber(index) : index + 1}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mx-auto overflow-hidden border border-gray-100">
                      <img src={item.student_image} alt="" className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">{item.nisn ?? "-"}</td>
                  <td className="px-6 py-4 text-center font-medium text-gray-700 whitespace-nowrap">{item.student_name ?? "Nama Tidak Ada"}</td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className={`inline-flex px-4 py-1 rounded-full text-[12px] font-medium text-white
                      ${item.status === "present" || item.status === "hadir" ? "bg-[#22C55E]" : 
                        item.status === "sick" || item.status === "sakit" ? "bg-[#F59E0B]" : 
                        item.status === "permission" || item.status === "izin" ? "bg-[#0EA5E9]" :
                        item.status === "permission" || item.status === "alpha" ? "bg-[#EF4444]" : "bg-gray-200"}`}
                    >
                      {item.status ?? "—"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500 whitespace-nowrap">{item.date ?? "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-400 italic">
                  Data tidak ditemukan.
                </td>
              </tr>
            )}
              </tbody>
            </table>
          </div>
        </div>
    )
}