export default function TableClass({
  attendance,
  pagination,
  status, 
  changes,
  setChanges,
  page,
  isSubmitted
}) {
 

  return (
    <table className="w-full border-collapse overflow-hidden shadow-md rounded-lg">
      <thead>
        <tr className="bg-[#3B82F6] text-white h-[46px]">
          <th className="py-2 px-4 text-center font-semibold text-[16px] rounded-tl-lg">No</th>
          <th className="py-2 px-4 text-center font-semibold text-[16px]">Nama</th>
          <th className="py-2 px-4 text-center font-semibold text-[16px]">NISN</th>
          <th className="py-2 px-4 text-center font-semibold text-[16px] rounded-tr-lg">Status</th>
        </tr>
      </thead>

      <tbody>
        {attendance.map((s, index) => {
          const finalStatus =
            changes[page]?.[s.id] ?? s.existing_attendance?.status ?? "";

          return (
            <tr
              key={s.id}
              className={`h-[59px] border-b border-[#000000]/20 transition `}
            >
              <td className="py-2 px-4 border-l border-[#000000]/20 text-center text-[16px] font-medium">
                {pagination?.from + index}
              </td>
              <td className="py-2 px-4 text-center text-[16px] font-medium">{s.name}</td>
              <td className="py-2 px-4 text-center text-[16px] font-medium">{s.nisn}</td>
              <td className={`py-2 px-4 text-[12px] font-medium border-r border-[#000000]/20`}>
                <div className="flex gap-5 items-center justify-center ">
                  {status.map((radio) => (
                    <label key={radio.id} className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="radio"
                        name={`status-${s.id}`}
                        value={radio.value}
                        disabled={isSubmitted}
                        checked={finalStatus === radio.value}
                        onChange={(e) => {
                          const newStatus = e.target.value;
                          setChanges((prev) => ({
                            ...prev,
                            [page]: {
                              ...(prev[page] || {}),
                              [s.id]: newStatus,
                            },
                          }));
                        }}
                        className="accent-blue-500 w-4 h-4 "
                      />
                      {radio.label}
                    </label>
                  ))}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
