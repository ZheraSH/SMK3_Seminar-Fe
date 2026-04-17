"use client";

import { useState, useEffect } from "react";
import { fetchRfid } from "@services/role-operator/rfid/rfid-api";

export function useRfid() {
  const [rfid, setRfid] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(0);

  const load = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetchRfid(page, search);
      setRfid(res.data);
      setMeta(res.meta);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    load(search === "");
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
