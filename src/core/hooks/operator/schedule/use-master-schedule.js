import { useEffect, useState, useCallback } from "react";
<<<<<<< HEAD:src/Core/hooks/operator-hooks/schedule/useMasterSchedule.jsx
import { fetchSubject, fetchTeacher, fetchLesson, } from "../../../api/lesson-shedule/lessonApi";
=======
import { fetchSubject, fetchTeacher, fetchLesson, } from "@services/role-operator/schedule/lesson-api";
>>>>>>> dev2:src/core/hooks/operator/schedule/use-master-schedule.js

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
<<<<<<< HEAD:src/Core/hooks/operator-hooks/schedule/useMasterSchedule.jsx
      const [subjectsRes, teachersRes, lessonsRes] = await Promise.all([
        fetchSubject(),
        fetchTeacher(),
        fetchLesson(activeDayApi),
      ]);
=======
      const [subjectsRes, teachersRes, lessonsRes] = await Promise.all([fetchSubject(), fetchTeacher(), fetchLesson(activeDayApi),]);

      const allowedRoles = ["teacher", "homeroom_teacher"];
      const filteredTeachers = (teachersRes?.data || teachersRes || []).filter((guru) => {
        return guru.roles?.some((role) => allowedRoles.includes(role.value));
      });
>>>>>>> dev2:src/core/hooks/operator/schedule/use-master-schedule.js

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

<<<<<<< HEAD:src/Core/hooks/operator-hooks/schedule/useMasterSchedule.jsx
      setSubjects(subjectsRes || []);
=======
      setSubjects(subjectsRes);
>>>>>>> dev2:src/core/hooks/operator/schedule/use-master-schedule.js
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
