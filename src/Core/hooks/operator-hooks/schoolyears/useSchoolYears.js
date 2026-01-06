import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  fetchSchoolYearsAPI,
  createSchoolYearAPI,
  deleteSchoolYearAPI,
  activateSchoolYearAPI,
} from "../../../api/role-operator/schoolyears/SchoolYears";
import { notify } from "../../notification/notify";

export const useSchoolYears = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSchoolYears = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetchSchoolYearsAPI(page);
      const payload = res?.data?.data;

      setData(payload?.data || []);
      setCurrentPage(payload?.current_page || 1);
      setTotalPages(payload?.last_page || 1);
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengambil data tahun ajaran");
    } finally {
      setLoading(false);
    }
  };

 const addSchoolYear = async () => {
  setLoading(true);
  try {
    await createSchoolYearAPI();
    notify("Tahun ajaran berhasil ditambahkan!");
    fetchSchoolYears(currentPage);
    return true; 
  } catch {
    toast.error("Gagal menambah tahun ajaran");
    return false; 
  } finally {
    setLoading(false);
  }
};


  const deleteSchoolYear = async (id) => {
    try {
      await deleteSchoolYearAPI(id);
      setData((prev) => prev.filter((item) => item.id !== id));
      notify("Berhasil hapus tahun ajaran!");
    } catch {
      toast.error("Gagal menghapus tahun ajaran");
    }
  };

  const activateSchoolYear = async (id) => {
    try {
      await activateSchoolYearAPI(id);
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          active: item.id === id,
        }))
      );
      notify("Tahun ajaran berhasil diaktifkan!");
    } catch {
      toast.error("Gagal mengaktifkan tahun ajaran");
    }
  };

  useEffect(() => {
    fetchSchoolYears(1);
  }, []);

  return {
    data,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
    fetchSchoolYears,
    addSchoolYear,
    deleteSchoolYear,
    activateSchoolYear,
  };
};
