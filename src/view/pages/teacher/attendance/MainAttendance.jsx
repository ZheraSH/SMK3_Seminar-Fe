import { useState, useEffect } from "react";
import ButtonAttendance from "./components/ButtonAttendance";
import CardAttendance from "./components/CardAttendance";
import ClassAttendance from "./components/ClassAttendance";
import { getAttendanceClassroom } from "../../../../Core/api/role-teacher/attendance/AttendanceClassroom";

export default function AttendanceTeacher() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [isOpenClass, setIsOpenClass] = useState(false);

  const todayDayIndex = new Date().getDay(); // 0=Minggu, 1=Senin, ..., 6=Sabtu
  let initialDay = "monday";
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  if (todayDayIndex >= 1 && todayDayIndex <= 5) {
    initialDay = dayNames[todayDayIndex];
  } else if (todayDayIndex === 6) {
    initialDay = "friday";
  }

  const [activeDay, setActiveDay] = useState(initialDay);
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [globalChanges, setGlobalChanges] = useState({});
  const [submittedClasses, setSubmittedClasses] = useState({});

  const getDateByDay = (day) => {
    const today = new Date();
    const dayMap = { monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5 };
    const targetDay = dayMap[day];

    if (!targetDay) return today.toISOString().split("T")[0]; // Fallback ke hari ini jika hari tidak valid

    const difference = targetDay - today.getDay();
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + difference);
    return targetDate.toISOString().split("T")[0];
  };

  useEffect(() => {
    const date = getDateByDay(activeDay);
    setLoading(true);
    setError(null);

    getAttendanceClassroom(date)
      .then((data) => {
        if (!data) {
          setError("Data kelas tidak ditemukan");
          setClassrooms([]);
          return;
        }
        setClassrooms(data);
      })
      .catch((err) => {
        console.error("Error fetching class data:", err);
        setError("Gagal memuat data kelas");
        setClassrooms([]);
      })
      .finally(() => setLoading(false));
  }, [activeDay]);

  
  if (isOpenClass) {
    return (
      <ClassAttendance
        selectedClass={selectedClass}
        date={getDateByDay(activeDay)}
        setIsOpenClass={setIsOpenClass}
        globalChanges={globalChanges}
        setGlobalChanges={setGlobalChanges}
        submittedClasses={submittedClasses}
        setSubmittedClasses={setSubmittedClasses}
      />
    );
  }

 
  return (
    <div className="justify-center mx-7 mb-10 mt-5 md:mt-2">
      <div className="relative w-full h-[166px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px]">
        <div className="absolute inset-0 items-center justify-center rounded-[6px]">
          <div className="ml-5 mt-2">
            <h1 className="text-white text-[26px] md:text-[36px] font-semibold">Absensi Kelas</h1>
            <p className="text-white text-[12px] md:text-[14px] font-light">
              Pilih kelas mengajar dan absen siswa di dalamnya.
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-6 md:flex-row gap-2 flex-wrap h-[100px] md:h-[60px] border border-[#000000]/20 justify-between bg-white shadow-md p-2 rounded-lg">
        <div className="pl-[5px] md:pl-[16px] py-[8px]">
          <h1 className="text-[15px] md:text-[20px] font-semibold">Daftar kelas mengajar</h1>
        </div>
        <ButtonAttendance setActiveDay={setActiveDay} activeDay={activeDay} />
      </div>

      <div className="mt-4 w-full overflow-x-auto rounded-lg">
        <CardAttendance
          classrooms={classrooms}
          loading={loading}
          error={error}
          setIsOpenClass={setIsOpenClass}
          setSelectedClass={setSelectedClass}
        />
      </div>
    </div>
  );
}
