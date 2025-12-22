import React, { memo,Send } from "react";

// Komponen Baris dipisah agar tidak semua baris re-render saat satu diklik
const StudentRow = memo(({ 
  student, 
  index, 
  pagination, 
  statusOptions, 
  currentStatus, 
  isDisabled, 
  onStatusChange 
}) => {
  return (
    <tr className="h-[59px] border-b border-gray-200 hover:bg-gray-50 transition-colors">
      <td className="text-center text-sm">{pagination?.from + index}</td>
      <td className="px-4 text-sm font-medium text-gray-700">{student.name}</td>
      <td className="text-center text-sm text-gray-500">{student.nisn}</td>
      <td className="py-2 px-4">
        <div className="flex gap-4 justify-center flex-wrap">
          {statusOptions.map((opt) => (
            <label 
              key={opt.id} 
              className={`flex items-center gap-2 text-sm cursor-pointer ${
                isDisabled ? "opacity-50 cursor-not-allowed" : "hover:text-blue-600"
              }`}
            >
              <input
                type="radio"
                name={`status-${student.id}`}
                value={opt.value}
                checked={currentStatus === opt.value}
                disabled={isDisabled}
                onChange={(e) => onStatusChange(student.id, e.target.value)}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
              />
              <span className={currentStatus === opt.value ? "font-bold text-blue-700" : ""}>
                {opt.label}
              </span>
            </label>
          ))}
        </div>
      </td>
    </tr>
  );
});

export default function TableClass({
  attendance = [],
  pagination,
  status: statusOptions,
  changes,
  setChanges,
  page,
  isTimeValid,
  classKey,
}) {
  const isDisabled = !isTimeValid;

  const handleStatusChange = (studentId, newStatus) => {
    setChanges((prev) => {
      const currentClass = prev[classKey] || {};
      return {
        ...prev,
        [classKey]: {
          ...currentClass,
          [page]: {
            ...(currentClass[page] || {}),
            [studentId]: newStatus,
          },
        },
      };
    });
  };

  return (
    <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-[1000px] w-full border-collapse bg-white">
        <thead>
          <tr className="bg-[#3B82F6] text-white h-[48px]">
            <th className="w-[60px] py-2 px-4 text-center font-semibold rounded-tl-lg">No</th>
            <th className="py-2 px-4 text-left font-semibold">Nama Siswa</th>
            <th className="w-[150px] py-2 px-4 text-center font-semibold">NISN</th>
            <th className="w-[450px] py-2 px-4 text-center font-semibold rounded-tr-lg">Status Kehadiran</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-10 text-gray-500 italic">
                Tidak ada data siswa untuk ditampilkan.
              </td>
            </tr>
          ) : (
            attendance.map((s, index) => (
              <StudentRow
                key={s.id}
                student={s}
                index={index}
                pagination={pagination}
                statusOptions={statusOptions}
                currentStatus={changes?.[classKey]?.[page]?.[s.id] ?? s?.existing_attendance?.status ?? ""}
                isDisabled={isDisabled}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}