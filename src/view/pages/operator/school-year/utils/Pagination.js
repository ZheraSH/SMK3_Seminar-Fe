export const isValidPage = (page, totalPages) => {
  return page >= 1 && page <= totalPages;
};
