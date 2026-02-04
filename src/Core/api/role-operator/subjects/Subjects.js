import axios from "axios"
import { notify } from "../../../hooks/notification/notify"
import api from "../../axiosConfig"


export const getSubjects = async (page = 1, search = "") => {

  try {
    const res = await api.get(`/subjects?page=${page}&search=${search}`, {
      headers: {
        Accept: "application/json",
      },
    })
    return res.data
  } catch (err) {
    console.error("Gagal ambil data subjects:", err)
    throw err
  }
}

export const addSubject = async (subject) => {

  try {
    const response = await api.post(`/subjects`, subject, {
      headers: {
        Accept: "application/json",
      },
    });
    notify("Data Berhasil Ditambah");
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const updateSubject = async (id, name) => {

  try {
    const response = await api.put(`/subjects/${id}`, {
      name: name,
    }, {
      headers: {
        Accept: "application/json",
      },
    })
    notify("Data Berhasil Diperbarui")
    return response.data
  } catch (err) {
    console.error(" Gagal edit mapel:", err)
    throw err
  }
}

export const deleteSubject = async (id) => {

  try {
    const response = await api.delete(`/subjects/${id}`, {
      headers: {
        Accept: "application/json",
      },
    })
    console.log(` Subject ${id} berhasil di hapus`)
    notify("Data Berhasil Dihapus")
    return response.data
  } catch (error) {
    console.error(" Gagal menghapus mapel:", error)
    throw error
  }
}