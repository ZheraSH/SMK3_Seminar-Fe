import api from "@services/axios-config";

export async function getRoles() {
  try {
    const response = await api.get("/roles");
    const roles = response.data?.data || response.data || [];


    return roles;
  } catch (error) {return []; 
  }
}



