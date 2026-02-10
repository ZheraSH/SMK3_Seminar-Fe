import { useState, useEffect } from "react";
import {
  fetchLessonHoursByDay,
  addLessonHour,
  UpdateLessonHour,
  deleteLessonHour,
} from "../../../api/lesson-shedule/lessonHoursApi";

export default function useLessonHours(activeDayApi) {
  const [lessonHours, setLessonHours] = useState([]);
  const [isLoadingHours, setIsLoadingHours] = useState(true);

  const loadLessonHours = async () => {
    if (!activeDayApi) {
      setLessonHours([]);
      setIsLoadingHours(false);
      return;
    }
   
    setIsLoadingHours(true);
    try {
      const data = await fetchLessonHoursByDay(activeDayApi);
      setLessonHours(data);
    } catch (error) {
      console.error("Error loading lesson hours:", error);
      setLessonHours([]);
    } finally {
      setIsLoadingHours(false);
    }
  };

  const addLesson = async (dataToSend) => {
    try {
      await addLessonHour(dataToSend);
      await loadLessonHours();
      return {
        success: true,
        message: `Jam pelajaran berhasil ditambahkan pada hari ${activeDayApi}.`,
      };
    } catch (error) {
      const errorMessage = error.message || "Gagal menambahkan data.";
      throw new Error(errorMessage);
    }
  };

  const updateLesson = async (id, dataToSend) => {
    try {
      await UpdateLessonHour(id, dataToSend);
      await loadLessonHours();
      return { success: true };
    } catch (error) {
      const errorMessage = error.message || "Gagal memperbarui data.";
      throw new Error(errorMessage);
    }
  };

  const deleteLesson = async (id, name) => {
    try {
      await deleteLessonHour(id);

      await loadLessonHours();
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    loadLessonHours();
  }, [activeDayApi]);

  return {
    lessonHours,
    isLoadingHours,
    refetch: loadLessonHours,
    addLesson,
    updateLesson,
    deleteLesson,
  };
}
