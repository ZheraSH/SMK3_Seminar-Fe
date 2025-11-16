export default function TableClass({ students, attendance, setAttendance, status, startIndex }) {
  return (
    <table className="w-[1129px] border-collapse overflow-hidden shadow-sm">
      <thead>
        <tr className="bg-[#3B82F6] text-white h-[46px]">
          <th className="py-2 px-4 text-center  rounded-tl-lg">No</th>
          <th className="py-2 px-4 text-center ">Nama</th>
          <th className="py-2 px-4 text-center ">NISN</th>
          <th className="py-2 px-4 text-center  rounded-tr-lg">Status</th>
        </tr>
      </thead>

      <tbody>
        {students.map((s, index) => {
          const realIndex = startIndex + index;

          return (
            <tr key={realIndex} className="h-[59px]">
              <td className="py-2 px-4 border-l border-b border-[#000000]/20 text-center ">
                {realIndex + 1}.
              </td>
              <td className="py-2 px-4 border-b border-[#000000]/20 text-center">
                {s.nameStudent}
              </td>
              <td className="py-2 px-4 border-b border-[#000000]/20 text-center">
                {s.NISN}
              </td>

              <td className="py-2 px-4 border-b border-r border-[#000000]/20">
                <div className="flex gap-5 items-center justify-center">
                  {status.map((radio) => (
                    <label key={radio.id} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={`status-${realIndex}`}
                        value={radio.value}
                        checked={attendance[realIndex] === radio.value}
                        onChange={(e) => {
                          const update = [...attendance];
                          update[realIndex] = e.target.value;
                          setAttendance(update);
                        }}
                        className="accent-blue-500 w-4 h-4"
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
