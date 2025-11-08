import api from "./Index"
// Pastikan semua endpoint konsisten
export async function getEmployees() {
  const res = await api.get("/employees");
  return res.data;
}

export async function createEmployee(employeeData) {
  const formData = new FormData();
  
  Object.entries(employeeData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  const res = await api.post("/employees", formData, config);
  return res.data;
}

export async function updateEmployee(id, employeeData) {
  const formData = new FormData();
  
  Object.entries(employeeData).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      formData.append(key, value);
    }
  });

  formData.append("_method", "PUT");

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
  };

  const res = await api.post(`/employees/${id}`, formData, config);
  return res.data;
}

export async function deleteEmployee(id) {
  const res = await api.delete(`/employees/${id}`);
  return res.data;
}

export async function getReligions() {
  const res = await api.get("/religions");
  return res.data?.data || []; // selalu return array
}


