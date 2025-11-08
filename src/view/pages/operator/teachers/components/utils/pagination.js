export const range = (from, to, step = 1) => {
    let i = from
    const range = []
    while (i <= to) {
      range.push(i)
      i += step
    }
    return range
  }
  
  export const getPaginationGroup = (totalPages, currentPage) => {
    const totalPagesToShow = 5
  
    if (totalPages <= totalPagesToShow) {
      return range(1, totalPages)
    }
  
    let startPage
    if (currentPage <= 3) {
      startPage = 1
    } else if (currentPage + 2 >= totalPages) {
      startPage = totalPages - 4
    } else {
      startPage = currentPage - 2
    }
  
    const pages = range(startPage, Math.min(startPage + 4, totalPages))
  
    if (pages[0] > 1) {
      if (pages[0] > 2) {
        pages.unshift("...")
      }
      pages.unshift(1)
    }
  
    if (pages[pages.length - 1] < totalPages) {
      if (pages[pages.length - 1] < totalPages - 1) {
        pages.push("...")
      }
      pages.push(totalPages)
    }
  
    return pages.filter(
      (value, index, self) => self.indexOf(value) === index && (value !== "..." || self[index - 1] !== "..."),
    )
  }
  