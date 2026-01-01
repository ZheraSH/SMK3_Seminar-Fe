import React, { memo } from "react";

const StudentRow = memo(({ 
  student, 
  index, 
  pagination, 
  statusOptions, 
  currentStatus, 
  isDisabled, 
  onStatusChange 
}) => {
  const rowNumber = (pagination?.from || 0) + index;

  return (
    <tr className="h-[59px] border-b border-[#000000]/20 hover:bg-gray-50 transition-colors">
      <td className="text-center text-sm  text-black">{rowNumber}</td>
      <td className="text-left py-2 px-4 lg:pl-20 md:pl-0 text-sm font-medium text-black">{student.name}</td>
      <td className="text-center py-2 px-4 text-sm text-black">{student.nisn || "-"}</td>
      <td className=" text-center">
        <div className="flex gap-3 justify-center flex-wrap">
          {statusOptions.map((opt) => {
            const isSelected = currentStatus === opt.value;
            
            return (
              <label 
                key={opt.id} 
                className={`flex items-center gap-1 text-sm ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <input
                  type="radio"
                  name={`status-${student.id}`}
                  value={opt.value}
                  checked={isSelected}
                  disabled={isDisabled}
                  onChange={(e) => onStatusChange(String(student.id), e.target.value)}
                  className={`w-4 h-4 ${
                    isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                />
                <span className="text-black">
                  {opt.label}
                </span>
              </label>
            );
          })}
        </div>
      </td>
    </tr>
  );
});

export default function TableClass({
  attendance = [],
  pagination,
  status: statusOptions = [],
  changes,
  setChanges,
  page,
  isTimeValid,
  classKey,
}) {
  const isDisabled = !isTimeValid;

  const handleStatusChange = (studentId, newStatus) => {
    if (typeof setChanges !== "function") {
      console.error("Critical: setChanges is not a function. Check AttendanceLayout in TeacherRoutes!");
      return;
    }

    setChanges((prev) => {
      const currentClass = prev[classKey] || {};
      const currentPage = currentClass[page] || {};
      
      return {
        ...prev,
        [classKey]: {
          ...currentClass,
          [page]: {
            ...currentPage,
            [studentId]: newStatus,
          },
        },
      };
    });
  };

  return (
      <table className="md:w-full w-[800px] border-collapse border border-[#000000]/20 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-[#3B82F6] text-white h-[46px]">
            <th className="py-2 px-4 text-center font-semibold">No</th>
            <th className="py-2 px-4 lg:pl-20 md:pl-0 text-left font-semibold">Nama</th>
            <th className="py-2 px-4 text-center font-semibold">NISN</th>
            <th className="py-2 px-4 text-center font-semibold">Status</th>
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
            attendance.map((s, index) => {
              
              const studentIdStr = String(s.id);
              const currentStatus = changes?.[classKey]?.[page]?.[studentIdStr] ?? s?.existing_attendance?.status ?? "";

              return (
                <StudentRow
                  key={s.id}
                  student={s}
                  index={index}
                  pagination={pagination}
                  statusOptions={statusOptions}
                  currentStatus={currentStatus}
                  isDisabled={isDisabled}
                  onStatusChange={handleStatusChange}
                />
              );
            })
          )}
        </tbody>
      </table>
  );
}