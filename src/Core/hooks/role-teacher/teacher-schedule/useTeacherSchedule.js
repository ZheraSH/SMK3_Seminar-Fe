import { useState, useEffect,useRef} from "react";
import { fetchDailyScheduleApi } from "../../../api/role-teacher/teacher-schedule/teacherScheduleApi";

export function useTeacherSchedule(selectedDate) {
  const [schedule, setSchedule] = useState([]);
  const [activeDay, setActiveDay] = useState("");
  const [loading,setLoading] = useState (true);

  const dayMap = {
    monday: "Senin",
    tuesday: "Selasa",
    wednesday: "Rabu",
    thursday: "Kamis",
    friday: "Jumat",
  };

  function getDayNameFromDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    const dayNames = [
      null,        
      "monday",    
      "tuesday",   
      "wednesday", 
      "thursday",  
      "friday",    
      null,        
    ];
    return dayNames[dayIndex];
  }

  async function fetchDaily() {
    const dayName = getDayNameFromDate(selectedDate);
    
    if (!dayName) {
      setSchedule([]);
      setActiveDay("");
      return;
    }
    setLoading(true);

    try {
      const rawData = await fetchDailyScheduleApi(dayName);

      const normalized = rawData.map((item) => ({
        id: item.id ?? Math.random(),
        dayValue: item.day?.value ?? "",
        dayLabel: item.day?.label ?? "",
        time: item.time ?? "-",
        lesson: item.lesson_hour?.name ?? "-",
        classroom: item.classroom ?? { name: "-" },
        subject: item.subject ?? { name: "-" },
        has_cross_checked: item.has_cross_checked ?? false,
        can_cross_check: item.can_cross_check ?? false,
      }));

      setSchedule(normalized);
      setActiveDay(dayMap[dayName]);
      
    } catch (error) {
      setSchedule([]);
      setActiveDay("");
    }finally{
      setLoading(false);
    }
  };

    useEffect(() => {
      fetchDaily();
    }, [selectedDate]); 

  return {
    schedule,
    activeDay,
    loading
  };
}
