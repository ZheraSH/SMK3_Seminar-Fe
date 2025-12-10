export default function TableClass({
  attendance = [],
  pagination,
  status,
  changes,
  setChanges,
  page,
  canResubmit,
  classKey,
  isPastDate,
}) {
  const isDisabled = !canResubmit || isPastDate;
  return (
    <table className="w-[970px] border-collapse shadow-md rounded-lg">
      <thead>
        <tr className="bg-[#3B82F6] text-white h-[46px]">
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
            // Convert student ID to string untuk konsistensi
            const studentId = String(s.id);
            const finalStatus =
              changes?.[classKey]?.[page]?.[studentId] ??
              s?.existing_attendance?.status ??
              "";

            return (
              <tr key={s.id} className="h-[59px] border-b">
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
                          onChange={(e) => {
                            const newStatus = e.target.value;

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
                          }}
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
