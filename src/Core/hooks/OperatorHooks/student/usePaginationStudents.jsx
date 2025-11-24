import { useState, useEffect } from "react";
import { fetchStudents } from "../../../api/student/StudentApi";

export function useStudents() {
  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchStudents(page, search);
      setStudents(res.data);
      setMeta(res.meta);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [page, search]);

  return {
    students,
    meta,
    loading,
    page,
    setPage,
    search,
    setSearch,
  };
}
