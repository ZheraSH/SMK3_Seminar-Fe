// import api from "./Index"

// /**
//  * Helper
//  */
// const extractData = (res) => res?.data?.data

// /**
//  * Get All School Years
//  */
// export const getSchoolYears = async () => {
//   try {
//     const res = await api.get("/school-years")
//     return extractData(res)
//   } catch (error) {
//     console.error("❌ ERROR fetching school years:", error.response?.data || error.message)
//     throw error
//   }
// }

// /**
//  * Get Detail School Year
//  */
// export const getSchoolYear = async (id) => {
//   try {
//     const res = await api.get(`/school-years/${id}`)
//     return extractData(res)
//   } catch (error) {
//     console.error(`❌ ERROR fetching school year with ID ${id}:`, error.response?.data || error.message)
//     throw error
//   }
// }
