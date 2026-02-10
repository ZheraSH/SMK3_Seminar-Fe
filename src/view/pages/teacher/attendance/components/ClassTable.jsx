export default function TableClass({ attendance = [], pagination, status, changes, setChanges, page, canResubmit, classKey, isPastDate, isFutureDate, date}) {
 const isDisabled = isFutureDate || (isPastDate && !canResubmit) || (!isPastDate && !isFutureDate && !canResubmit);
  const perPage = pagination?.per_page || 20;
  
  return (
    <table className="w-full border-collapse shadow-md rounded-lg">
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
            const rowNumber = ((page - 1) * perPage) + (index + 1);
            const studentId = String(s.id);
           const finalStatus = changes?.[classKey]?.[date]?.[page]?.[studentId] || "";

            return (
              <tr key={s.id} className={`${index % 2 === 1 ? 'bg-[#EFF6FF]' : 'bg-white'} h-[56px]`}>
                <td className="text-center whitespace-nowrap">{rowNumber}</td>
                <td className="text-center whitespace-nowrap">{s.name}</td>
                <td className="text-center whitespace-nowrap">{s.nisn}</td>
                <td className="py-2 px-4 text-center whitespace-nowrap">
                  <div className="flex gap-3 justify-center ">
                    {status.map((radio) => (
                      <label key={radio.id} className="flex items-center gap-1">
                        <input 
                        type="radio" 
                        name={`status-${s.id}`} 
                        value={radio.value} 
                        checked={!isFutureDate && finalStatus === radio.value}
                        disabled={isDisabled}
                        onChange={(e) => {
                          if (isDisabled) return;
                          const newStatus = e.target.value;
                          setChanges((prev) => {
                            const classData = prev[classKey] || {};
                            const dateData = classData[date] || {};
                            const pageData = dateData[page] || {};
                            
                            return {
                              ...prev,
                              [classKey]: {
                                ...classData,
                                [date]: {
                                  ...dateData,
                                  [page]: { ...pageData, [studentId]: newStatus }
                                }
                              }
                            };
                          });
                        }}
                        className={`w-4 h-4 ${isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
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