import { useState, useEffect, useCallback } from "react";
import {
  fetchClassScheduleByDay,
  addSchedule as apiAddSchedule,
  updateSchedule as apiUpdateSchedule,
  deleteSchedule as apiDeleteSchedule,
} from "../../../api/lesson-shedule/lessonApi";

export default function useClassSchedule(classroomId, activeDayApi) {
  const [classSchedule, setClassSchedule] = useState(null);
  const [isLoadingSchedule, setIsLoadingSchedule] = useState(false);
  const [error, setError] = useState(null);

  const loadSchedule = useCallback(async () => {
    if (!classroomId || !activeDayApi) {
      setClassSchedule(null);
      return;
    }

    setIsLoadingSchedule(true);
    setError(null);
    try {
      const data = await fetchClassScheduleByDay(classroomId, activeDayApi);
      setClassSchedule(data);
    } catch (err) {
      console.error("Gagal memuat jadwal kelas:", err);
      setError(err);
      setClassSchedule(null);
    } finally {
      setIsLoadingSchedule(false);
    }
  }, [classroomId, activeDayApi]);

  const saveSchedule = useCallback(async (data, isEditMode) => {
    setError(null);

    try {
      let result;

      if (isEditMode) {
        if (!data.id) throw new Error("ID Jadwal diperlukan untuk mode Edit.");
        const { id, ...payload } = data;
        result = await apiUpdateSchedule(id, payload);
      } else {
        result = await apiAddSchedule(data);
      }

      console.log(
        `Jadwal Berhasil ${isEditMode ? "Diperbarui" : "Dibuat"}:`,
        result
      );
      return result;
    } catch (err) {
      console.error(
        `Gagal ${isEditMode ? "memperbarui" : "menambahkan"} jadwal:`,
        err.response?.data || err
      );
      setError(err.response?.data || err);
      throw err;
    }
  }, []);

  const removeSchedule = useCallback(
    async (scheduleId) => {
      setError(null);
      if (!scheduleId) {
        setError({
          message: "ID Jadwal diperlukan untuk penghapusan.",
          type: "client",
        });
        return { success: false, error: "ID Jadwal diperlukan." };
      }

      try {
        const result = await apiDeleteSchedule(scheduleId);
        await loadSchedule();

        return { success: true, data: result };
      } catch (err) {
        console.error("Gagal menghapus jadwal:", err.response?.data || err);
        setError(err.response?.data || err);
        throw err.response?.data || new Error("Gagal menghapus jadwal.");
      }
    },
    [loadSchedule]
  );

  useEffect(() => {
    loadSchedule();
  }, [loadSchedule]);

  const refetch = () => {
    loadSchedule();
  };

  return {
    classSchedule,
    isLoadingSchedule,
    error,
    refetch,
    saveSchedule,
    removeSchedule,
  };
}
