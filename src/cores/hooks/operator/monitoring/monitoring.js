import { useState, useEffect, useCallback } from "react";
import { fetchRfidHistory } from "@/cores/services/role-operator/monitoring/monitoring";

export const useMonitoring = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ current_page: 1, last_page: 1, total: 0, per_page: 10});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [params, setParams] = useState({ page: 1, search: "", status: ""});

  const getMonitoringData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchRfidHistory(params.status, params.search, params.page);
      if (response.status) {
        setData(response.data);
        setMeta(response.meta);
      }
    } catch (error) {
      console.error("Error fetching monitoring data:", error);
    } finally {
      setLoading(false);
    }
  }, [params]);

  useEffect(() => {
    getMonitoringData();
  }, [getMonitoringData]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setParams((prev) => ({ ...prev, search: searchTerm, page: 1 }));
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
  };

  const handleStatusFilter = (statusValue) => {
    setParams((prev) => ({ ...prev, status: statusValue, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const refreshData = () => {
    getMonitoringData();
  };

  return {
    data,
    meta,
    loading,
    params,
    searchTerm,
    handleSearch,
    handleStatusFilter,
    handlePageChange,
    refreshData
  };
};
