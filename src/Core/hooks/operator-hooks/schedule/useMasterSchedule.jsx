import { useEffect, useState, useCallback } from "react";
import {
  fetchSubject,
  fetchTeacher,
  fetchLesson,
} from "../../../api/lesson-shedule/lessonApi";

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
      const [subjectsRes, teachersRes, lessonsRes] = await Promise.all([
        fetchSubject(),
        fetchTeacher(),
        fetchLesson(activeDayApi),
      ]);

      setSubjects(subjectsRes);
      setTeachers(teachersRes);
      setLessons(lessonsRes);
    } catch (err) {
      console.error("Gagal mengambil data master:", err);
      setError("Gagal memuat data Mata Pelajaran, Guru, atau Jam Pelajaran.");
    } finally {
      setIsLoading(false);
    }
  }, [activeDayApi]);

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
