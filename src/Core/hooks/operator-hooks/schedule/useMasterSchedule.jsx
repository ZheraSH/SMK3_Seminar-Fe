import { useEffect, useState, useCallback } from "react";
import { fetchSubject, fetchTeacher, fetchLesson,} from "../../../api/lesson-shedule/lessonApi";

const BREAK_KEYWORDS = ['istirahat', 'break', 'lainnya']; 

export default function useMasterSchedule(activeDayApi) {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMasterData = useCallback(async () => {
    if (!activeDayApi) {
      if (subjects.length > 0) setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const [subjectsRes, teachersRes, lessonsRes] = await Promise.all([ fetchSubject(), fetchTeacher(), fetchLesson(activeDayApi),]);

      const processedLessons = lessonsRes.map(lesson => {
        const lessonName = (lesson.name || lesson.placement || '').toLowerCase();
        const isBreak = BREAK_KEYWORDS.some(keyword => lessonName.includes(keyword));

        return {
          ...lesson,
          is_break: isBreak,
        };
      });

      setSubjects(subjectsRes);
      setTeachers(teachersRes);
      setLessons(processedLessons);
    } catch (err) {
      console.error("Gagal mengambil data master:", err);
      setError("Gagal memuat data master. Pastikan koneksi dan API berfungsi.");
    } finally {
      setIsLoading(false);
    }
  }, [activeDayApi, subjects.length]);

  useEffect(() => {
    loadMasterData();
  }, [loadMasterData]);

  return {
    subjects,
    teachers,
    lessons,
    isLoading,
    error,
    refetch: loadMasterData,
  };
}