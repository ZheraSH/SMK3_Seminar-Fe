// core/hooks/useTeacher.js
import { useState, useEffect, useRef } from "react"
import { getEmployees, getReligions } from '@api/Employee'
import { getRoles } from '@api/Roles'

export const useTeacher = () => {
  const [data, setData] = useState([])
  const [religions, setReligions] = useState([])
  const [roles, setRoles] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [openMenuId, setOpenMenuId] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)

  const editingTeacherIdRef = useRef(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [employeesResult, religionsResult, rolesResult] = await Promise.all([
        getEmployees(), 
        getReligions(), 
        getRoles()
      ])
      
      let employeesData = []
      if (Array.isArray(employeesResult)) {
        employeesData = employeesResult
      } else if (employeesResult?.data) {
        employeesData = Array.isArray(employeesResult.data) ? employeesResult.data : [employeesResult.data]
      }


      
      console.log("Fetched employees:", employeesData)
      setData(employeesData)
      setReligions(Array.isArray(religionsResult) ? religionsResult : [])
      setRoles(Array.isArray(rolesResult) ? rolesResult : [])
      
    } catch (error) {
      console.error("Error fetching data:", error)
      setData([])
      setReligions([])
      setRoles([])
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    await fetchData()
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".menu-button") && !e.target.closest(".menu-dropdown")) {
        setOpenMenuId(null)
      }
    }

    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  useEffect(() => {
    fetchData()
  }, [])

  return {
    // Data
    data,
    setData,
    religions,
    roles,
    loading,
    refreshData,

    // UI State
    selectedTeacher,
    setSelectedTeacher,
    openMenuId,
    setOpenMenuId,
    showCreateModal,
    setShowCreateModal,
    showEditModal,
    setShowEditModal,
    showDetailModal,
    setShowDetailModal,
    editingTeacherIdRef
  }
}