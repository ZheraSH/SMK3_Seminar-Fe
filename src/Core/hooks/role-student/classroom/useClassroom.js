import { useState, useEffect } from "react";
import { getClassroom } from "../../../../Core/api/role-student/classroom/classroom";

export function useClassStudent() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [classroom, setClassroom] = useState({});
    const [students, setStudents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [onError, setOnError] = useState (null);

    const fetchStudents = async (page) => {
        setLoading(true);
        setError(null);

        const data = await getClassroom({ page });
        await new Promise(resolve => setTimeout(resolve, 500));
        if (!data?.data) {
            setError("Gagal memuat data kelas.");
            setStudents([]);
            setClassroom({});
            setTotalPages(1);
            setLoading(false);
            return;
        }

        const classmates = data.data.classmates;

        setClassroom(data.data.classroom);
        setStudents(classmates?.Students || []);
        setTotalPages(classmates?.pagination?.last_page || 1);
        setLoading(false);
    };

    useEffect(() => {
        fetchStudents(currentPage);
    }, [currentPage]);

    return {
        loading,
        error,
        classroom,
        students,
        currentPage,
        totalPages,
        setCurrentPage,
        onError,
        setOnError,
    };
}
