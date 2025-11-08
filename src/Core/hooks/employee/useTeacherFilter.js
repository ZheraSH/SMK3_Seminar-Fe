// core/hooks/useTeacherFilter.js
import { useState, useMemo } from "react"

export const useTeacherFilter = (data) => {
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("Pilih Kategori")
  const [page, setPage] = useState(1)
  const [openCategory, setOpenCategory] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState("")

  const perPage = 7

  // Filter data
  const filteredData = useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return []
    }

    return data.filter((d) => {
      // Handle null/undefined values
      const name = d.name || ""
      const NIP = d.NIP || ""
      const mapel = d.mapel || ""
      const role = d.role || ""
      const gender = d.gender || ""
      const email = d.email || ""

      // Query search across multiple fields
      const searchableText = `${name} ${NIP} ${mapel} ${role} ${gender} ${email}`.toLowerCase()
      const matchesQuery = searchableText.includes(query.toLowerCase())

      if (!matchesQuery) return false

      // Category filter
      if (category === "Semua Kategori" || category === "Pilih Kategori") {
        return true
      }

      const [filterKey, filterValue] = category.split(":").map(s => s.trim())
      
      if (!filterValue) return true

      const lowerCaseValue = filterValue.toLowerCase()

      switch (filterKey) {
        case "Role":
          return (d.role || "").toLowerCase() === lowerCaseValue
        case "Gender":
          // Handle different gender formats
          const currentGender = (d.gender || "").toLowerCase()
          if (lowerCaseValue === "laki - laki") {
            return currentGender === "laki-laki" || currentGender === "laki - laki"
          }
          return currentGender === lowerCaseValue
        case "Mapel":
          return (d.mapel || "").toLowerCase() === lowerCaseValue
        default:
          return true
      }
    })
  }, [data, query, category])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredData.length / perPage))
  const start = (page - 1) * perPage
  const pageData = filteredData.slice(start, start + perPage)

  const goPage = (n) => {
    setPage(Math.min(Math.max(1, n), totalPages))
  }

  return {
    // Filter State
    query,
    setQuery,
    category,
    setCategory,
    page,
    setPage,
    openCategory,
    setOpenCategory,
    openSubMenu,
    setOpenSubMenu,

    // Filtered Data & Pagination
    filteredData,
    pageData,
    totalPages,
    goPage
  }
}