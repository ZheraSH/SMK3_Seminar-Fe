import { useEffect, useState, useCallback } from "react";
import { getClassroomDetail, getClassroomStudents, getAvailableStudents, addStudentsToClassroom, removeStudentFromClass, getStudentDetail} from "../../../api/role-operator/class-major/classStudentsApi";

const ITEMS_PER_PAGE = 8; 

export default function useClassroomDetail(classroomId) {
    const [classroom, setClassroom] = useState(null);
    const [students, setStudents] = useState([]); 
    
    const [selectedStudentDetail, setSelectedStudentDetail] = useState(null); 
    const [detailLoading, setDetailLoading] = useState(false);
    
    const [paginationMeta, setPaginationMeta] = useState({
        current_page: 1,
        last_page: 1, 
        total_records: 0,
        per_page: ITEMS_PER_PAGE,
    });
    
    const [availableStudents, setAvailableStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentsLoading, setStudentsLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchDetail = useCallback(async () => {
        if (!classroomId) return;
        try {
            setLoading(true);
            const detail = await getClassroomDetail(classroomId);
            setClassroom(detail);
        } catch (err) {
            console.error("Error fetching classroom detail:", err.response?.data || err);
        } finally {
            setLoading(false);
        }
    }, [classroomId]);

    const fetchStudents = useCallback(async (page = 1, search = "") => { 
        if (!classroomId) return;
        try {
            setStudentsLoading(true);
            
            const res = await getClassroomStudents(classroomId, page, ITEMS_PER_PAGE, search); 
            const fetchedStudents = res.data || [];
            const meta = res.meta; 

            setStudents(fetchedStudents);
            
            if (meta) {
                setPaginationMeta({
                    current_page: meta.current_page,
                    last_page: meta.last_page, 
                    total_records: meta.total,
                    per_page: meta.per_page, 
                });
            } else {
                 setPaginationMeta(prev => ({
                    ...prev,
                    current_page: 1,
                    last_page: 1, 
                    total_records: fetchedStudents.length,
                }));
            }

        } catch (err) {
            console.error("Error fetching students:", err.response?.data || err);
        } finally {
            setStudentsLoading(false);
        }
    }, [classroomId]);

    const fetchStudentDetail = useCallback(async (studentId) => {
        if (!studentId) return;
        try {
            setDetailLoading(true);
            setSelectedStudentDetail(null); 
            
            const detail = await getStudentDetail(studentId); 
            
            setSelectedStudentDetail(detail);
            return { success: true, data: detail };
        } catch (err) {
            console.error(`Gagal memuat detail siswa ID: ${studentId}`, err.response?.data || err);
            setSelectedStudentDetail(null); 
            throw err;
        } finally {
            setDetailLoading(false);
        }
    }, []);

    const fetchAvailableStudents = useCallback(async () => {
        if (!classroomId) return;
        try {
            const available = await getAvailableStudents(classroomId);
            setAvailableStudents(available || []);
        } catch (err) {
            console.error("Error fetching available students:", err.response?.data || err);
        }
    }, [classroomId]);

    useEffect(() => {
        fetchDetail();
        fetchAvailableStudents();
        fetchStudents(1, ""); 
    }, [fetchDetail, fetchAvailableStudents, fetchStudents]);

    const addStudents = async (studentIds) => {
        try {
            setActionLoading(true);
            const res = await addStudentsToClassroom(classroomId, studentIds);
            await fetchAvailableStudents();
            await fetchStudents(1); 
            return { success: true, data: res };
        } catch (err) {
            console.error("Gagal menambahkan siswa:", err.response?.data || err);
            throw err;
        } finally {
            setActionLoading(false);
        }
    };

    const removeStudent = async (studentId) => {
        try {
            setActionLoading(true);
            const res = await removeStudentFromClass(classroomId, studentId);
            await fetchStudents(paginationMeta.current_page); 
            return { success: true, data: res };
        } catch (err) {
            console.error("Gagal menghapus siswa:", err.response?.data || err);
            throw err;
        } finally {
            setActionLoading(false);
        }
    };

    return {
        classroom,
        students, 
        paginationMeta,
        studentsLoading, 
        availableStudents,
        loading, 
        actionLoading,
        selectedStudentDetail, 
        detailLoading, 
        fetchStudentDetail, 
        fetchStudents,
        fetchAvailableStudents, 
        addStudents,
        removeStudent,
    };
}