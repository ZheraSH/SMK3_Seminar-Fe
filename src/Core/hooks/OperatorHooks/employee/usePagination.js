"use client"

import { useState, useEffect } from "react"
import { fetchTeachersApi } from "../../../api/employee/TeachersApi"

export function useTeacher() {
  const [Teacher, setTeacher] = useState([])
  const [meta, setMeta] = useState({})
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)


  const load = async () => {
    setLoading(true)
    try {
      const res = await fetchTeachersApi(page)
      setTeacher(res.data)
      setMeta(res.meta)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [page])

  return {
    Teacher,
    meta,
    loading,
    page,
    setPage,
    reload: load,
  }
}
