// core/data/usePagination.js
import { useMemo } from 'react';

export const usePagination = (data, currentPage, itemsPerPage) => {
  const pagination = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return {
        currentPageData: [],
        totalPages: 1,
        totalItems: 0,
        startIndex: 0,
        endIndex: 0
      };
    }

    const totalItems = data.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentPageData = data.slice(startIndex, endIndex);

    return {
      currentPageData,
      totalPages,
      totalItems,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalItems)
    };
  }, [data, currentPage, itemsPerPage]);

  return pagination;
};