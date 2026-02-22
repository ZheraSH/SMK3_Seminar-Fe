import { useEffect, useState, useCallback } from "react";
import { fetchSubject, fetchTeacher, fetchLesson, } from "../../../api/lesson-shedule/lessonApi";

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
      const [subjectsRes, teachersRes, lessonsRes] = await Promise.all([
        fetchSubject(),
        fetchTeacher(),
        fetchLesson(activeDayApi),
      ]);

      const rawTeachers = Array.isArray(teachersRes) ? teachersRes : (teachersRes?.data || []);
      const allowedRoles = ["teacher", "homeroom_teacher"];
      const filteredTeachers = rawTeachers.filter((guru) => {
        return guru.roles?.some((role) => allowedRoles.includes(role.value));
      });

      const processedLessons = (lessonsRes || []).map((lesson) => {
        const lessonName = (lesson.name || lesson.placement || "").toLowerCase();
        const isBreak = BREAK_KEYWORDS.some((keyword) => lessonName.includes(keyword));

        return {
          ...lesson,
          is_break: isBreak,
        };
      });

      setSubjects(subjectsRes || []);
      setTeachers(filteredTeachers);
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