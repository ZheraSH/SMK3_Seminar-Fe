"use client";

import { useState, useEffect } from "react";
import { fetchRfid } from "../../../api/role-operator/rfid/RfidApi";

export function useRfid() {
  const [rfid, setRfid] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);

  const load = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const res = await fetchRfid(page, search);
      setRfid(res.data);
      setMeta(res.meta);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [page, search, refresh]);

  return {
    rfid,
    meta,
    loading,
    page,
    setPage,
    search,
    setSearch,
    refresh,
    setRefresh,
  };
}
