export default function TableSchedule({ scheduleData = []}) {

  if (!scheduleData.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        Tidak ada jadwal hari ini
      </div>
    );
  }

  return (
    <table className="w-full text-sm text-gray-800">
      <thead>
        <tr className="bg-[#3B82F6] text-white text-base">
          <th className="px-4 py-3">No</th>
          <th className="px-4 py-3 text-center">Jam</th>
          <th className="px-4 py-3">Jam Ke</th>
          <th className="px-4 py-3">Mata Pelajaran</th>
          <th className="px-4 py-3">Guru</th>
        </tr>
      </thead>
      <tbody>
        {scheduleData.map((item, index) => (
          <tr
            key={item.id}
            className={`${
              index % 2 === 0 ? "bg-white" : "bg-blue-50"
            } border-t border-gray-300`}
          >
            <td className="px-4 py-3">{index + 1}</td>
            <td className="px-4 py-3 text-center">
              <span className="inline-flex w-[140px] h-[28px] items-center justify-center rounded-full bg-green-500 text-white text-sm">
                {item.lesson_hour?.time}
              </span>
            </td>
            <td className="px-4 py-3">{item.lesson_hour?.name}</td>
            <td className="px-4 py-3">{item.subject}</td>
            <td className="px-4 py-3">{item.teacher}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
