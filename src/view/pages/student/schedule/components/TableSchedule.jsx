export default function TableSchedule({ scheduleData = [] }) {
  if (!scheduleData.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in duration-500 bg-white">
        <img src="/images/null/nullimage.png" alt="Data Kosong" className="w-48 h-auto md:w-[400px] md:h-[285px] mb-6" />
        <p className="text-gray-500 text-center text-sm md:text-md">
          Maaf yaaa.. datanya gaada, <br />
          Belum ada jadwal pelajaran untuk hari ini.
        </p>
      </div>
    );
  }

  return (
    <table className="w-full text-sm text-gray-800 text-center">
      <thead>
        <tr className="bg-[#3B82F6] text-white text-base">
          <th className="px-4 py-3 font-medium">No</th>
          <th className="px-4 py-3 font-medium">Jam</th>
          <th className="px-4 py-3 font-medium">Jam Ke</th>
          <th className="px-4 py-3 font-medium">Mata Pelajaran</th>
          <th className="px-4 py-3 font-medium">Guru</th>
        </tr>
      </thead>

      <tbody>
        {scheduleData.map((item, index) => (
          <tr
            key={item.id}
            className={`${index % 2 === 0 ? "bg-white" : "bg-blue-50"
              } border-t border-gray-300`}
          >
            <td className="px-4 py-3">{index + 1}</td>

            <td className="px-4 py-3">
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
