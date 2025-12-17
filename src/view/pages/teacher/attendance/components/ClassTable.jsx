export default function TableClass({
  attendance = [],
  pagination,
  status,
  changes,
  setChanges,
  page,
  isTimeValid, 
  classKey,
}) {
  
  const isDisabled = !isTimeValid;

  const handleStatusChange = (studentId, newStatus) => {
    setChanges((prev) => ({
      ...prev,
      [classKey]: {
        ...(prev?.[classKey] || {}),
        [page]: {
          ...(prev?.[classKey]?.[page] || {}),
          [studentId]: newStatus,
        },
      },
    }));
  };

  return (
    <table className="xl:w-full w-[1129px] border-collapse border border-[#000000]/20 rounded-lg ">
      <thead>
        <tr className="bg-[#3B82F6] text-white h-[46px] ">
          <th className="py-2 px-4 text-center font-semibold">No</th>
          <th className="py-2 px-4 text-center font-semibold">Nama</th>
          <th className="py-2 px-4 text-center font-semibold">NISN</th>
          <th className="py-2 px-4 text-center font-semibold">Status</th>
        </tr>
      </thead>


      <tbody>
        {attendance.length === 0 ? (
          <tr>
            <td colSpan={4} className="text-center py-4 text-gray-500">
              Tidak ada data siswa
            </td>
          </tr>
        ) : (
          attendance.map((s, index) => {
            const studentId = String(s.id);
            const finalStatus =
              changes?.[classKey]?.[page]?.[studentId] ??
              s?.existing_attendance?.status ??
              ""; // Nilai default kosong

            return (
              <tr key={s.id} className="h-[59px] border-b border-[#000000]/20">
                <td className="text-center">{pagination?.from + index}</td>
                <td className="text-center">{s.name}</td>
                <td className="text-center">{s.nisn}</td>

                <td className="py-2 px-4 text-center">
                  <div className="flex gap-3 justify-center flex-wrap">
                    {status.map((radio) => (
                      <label key={radio.id} className="flex items-center gap-1">
                        <input
                          type="radio"
                          name={`status-${s.id}`}
                          value={radio.value}
                          checked={finalStatus === radio.value}
                          disabled={isDisabled} 
                          onChange={(e) => handleStatusChange(studentId, e.target.value)}
                          className={`w-4 h-4 ${
                            isDisabled
                              ? "cursor-not-allowed opacity-50"
                              : "cursor-pointer"
                          }`}
                        />
                        {radio.label}
                      </label>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}