import axios from "axios"

const API_BASE_URL = "http://127.0.0.1:8000/api/dashboard"

export const fetchCounters = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/counters`)
    return res.data.data
  } catch (err) {
    console.error("Error fetching counters:", err)
    return {}
  }
}

export const fetchActivities = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/activities`)
    const payload = res.data?.data
    return Array.isArray(payload) ? payload : []
  } catch (err) {
    console.error("Error fetching activities:", err)
    return []
  }
}

export const fetchStats = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/stats`)
    return res.data.data
  } catch (err) {
    console.error("Error fetching stats:", err)
    return {}
  }
}
