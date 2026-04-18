"use client"

import { useState, useEffect } from "react"
import { fetchTeachersApi } from "@services/role-operator/employee/teachers-api";

export function useTeacher(searchTerm = "", role = "", gender = "", subject = "") {
  const [Teacher, setTeacher] = useState([])
  const [meta, setMeta] = useState({})
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)


  const load = async () => {
    setLoading(true)
    try {
      const res = await fetchTeachersApi(page, searchTerm, role, gender, subject)
      setTeacher(res.data)
      setMeta(res.meta)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [page, searchTerm, role, gender, subject])

  return {
    Teacher,
    meta,
    loading,
    page,
    setPage,
    reload: load,
  }
}
