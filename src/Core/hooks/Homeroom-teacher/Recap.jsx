import { useState, useEffect, useCallback } from "react";
import { fetchSummaryClass as getHeaderAPI , fetchSummaryClassdaily as getTableApi,fetchSummaryClassCard as getCardApi,getCetakRecap } from "../../api/role-homeroom/summary-class/SummaryClass";

export function UseRecap(selectedDate) {
  const [header, setHeader] = useState(null);
  const [card, setCard] = useState([]);
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloading,setDownloading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0});
  const [selectedStatus, setSelectedStatus] = useState("");

  const loadHeaderData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getHeaderAPI();
      setHeader(data); 
    } catch (error) {
      console.error("Gagal fetch summary:", error);
      setHeader(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCardData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getCardApi();
      setCard(response); 
    } catch (error) {
      console.error("Gagal fetch summary:", error);
      setCard(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadTableData = useCallback(async (page = 1,search = searchQuery , status = selectedStatus) => {
    setLoading(true);
    try {
      const res = await getTableApi(selectedDate, page, search, status);
      setTable(res?.students || []);
      if (res?.pagination) {
        setPagination({
          current_page: res.pagination.current_page,
          last_page: res.pagination.last_page,
          total: res.pagination.total,
          per_page: res.pagination.per_page
        });
      }
    } catch (error) {
      console.error("Gagal fetch summary:", error);
      setTable([]);
    } finally {
      setLoading(false);
    }
  }, [selectedDate,searchQuery,selectedStatus]);


  const downloadRecap = async () => {
    if (downloading) return;

    setDownloading(true);
    try {
      const response = await getCetakRecap(selectedDate);
      const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Recap_Absensi_${selectedDate}.xlsx`);
      document.body.appendChild(link);
      
      link.click(); 
      
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Gagal download:", error);
      alert("Terjadi kesalahan saat mengunduh file.");
    } finally {
      setDownloading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      loadTableData(1, searchQuery,selectedStatus);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery,selectedStatus]);

  useEffect(() => {
    loadHeaderData();
    loadCardData();
  }, [loadHeaderData,loadCardData]);

  return {
    header,
    card,
    table,
    loading,
    downloading,
    downloadRecap,
    pagination,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,  
    goToPage: (page) => loadTableData(page, searchQuery),
    refreshData: () => loadTableData(1, searchQuery),
    calculateNumber: (index) => {
    return ((pagination.current_page - 1) * pagination.per_page) + index + 1;
  }
  };
}