"use client"

import { useEffect, useState } from "react"
import { getSubjects } from "../../../Core/api/maple/Subjects"

export function useSubjects() {
  const [subjects, setSubjects] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  async function fetchSubjects(page = 1) {
    try {
      const { data, meta } = await getSubjects(page)

      if (page === 1) {
        setSubjects(data || [])
      } else {
        setSubjects((prev) => [...prev, ...(data || [])])
      }

      setTotalPages(meta.last_page || 1)
    } catch (error) {
      console.error("Error fetching subjects:", error)
    }
  }

  useEffect(() => {
    fetchSubjects(currentPage)
  }, [currentPage])

  useEffect(() => {
    if (subjects.length >= 12 && currentPage < totalPages) {
      const timer = setTimeout(() => {
        setCurrentPage((prev) => prev + 1)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [subjects, currentPage, totalPages])

  return {
    subjects,
    setSubjects,
    currentPage,
    setCurrentPage,
    totalPages,
    fetchSubjects,
  }
}
