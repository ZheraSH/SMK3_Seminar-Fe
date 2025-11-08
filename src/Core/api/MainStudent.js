import api from "@api/index";

export async function getStudents() {
    const res = await api.get("/students");
}