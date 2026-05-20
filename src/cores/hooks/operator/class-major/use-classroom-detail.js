import { useEffect, useState, useCallback } from "react";
import { getClassroomDetail, getClassroomStudents, getAvailableStudents, addStudentsToClassroom, removeStudentFromClass, getStudentDetail, importStudentsToClassroom , promoteStudents} from "@services/role-operator/class-major/class-students-api";
import { getTeachers } from "@services/role-operator/class-major/class-api";

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
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentsLoading, setStudentsLoading] = useState(false);
    const [teachersLoading, setTeachersLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchDetail = useCallback(async () => {
        if (!classroomId) return;
        try {
            setLoading(true);
            const detail = await getClassroomDetail(classroomId);
            setClassroom(detail);
        } catch (err) {} finally {
            setLoading(false);
        }
    }, [classroomId]);

    const fetchStudents = useCallback(async (page = 1, search = "", showLoading = true) => {
        if (!classroomId) return;
        try {
            if (showLoading) setStudentsLoading(true);

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

        } catch (err) {} finally {
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
        } catch (err) {setSelectedStudentDetail(null);
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
        } catch (err) {}
    }, [classroomId]);

    const fetchTeachers = useCallback(async () => {
        try {
            setTeachersLoading(true);
            const allTeachers = await getTeachers();
            setTeachers(allTeachers || []);
        } catch (err) {} finally {
            setTeachersLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDetail();
        fetchAvailableStudents();
        fetchStudents(1, "");
        fetchTeachers();
    }, [fetchDetail, fetchAvailableStudents, fetchStudents, fetchTeachers]);

    const addStudents = async (studentIds) => {
        try {
            setActionLoading(true);
            const res = await addStudentsToClassroom(classroomId, studentIds);
            await fetchAvailableStudents();
            await fetchStudents(1);
            return { success: true, data: res };
        } catch (err) {throw err;
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
        } catch (err) {throw err;
        } finally {
            setActionLoading(false);
        }
    };

    const importStudents = async (file) => {
        try {
            setActionLoading(true);
            const res = await importStudentsToClassroom(classroomId, file);
            fetchStudents(1); 
            return { success: true, data: res };
        } catch (err) {throw err;
        } finally {
            setActionLoading(false);
        }
    };

    const promoteClass = async (homeroomTeacherId) => {
        try {
            setActionLoading(true);
            const res = await promoteStudents(classroomId, homeroomTeacherId);
            fetchDetail();
            fetchStudents(1);
            return { success: true, data: res };
        } catch (err) {throw err;
        } finally {
            setActionLoading(false);
        }
    }

    return {
        classroom,
        students,
        paginationMeta,
        studentsLoading,
        availableStudents,
        teachers,
        teachersLoading,
        loading,
        actionLoading,
        selectedStudentDetail,
        detailLoading,
        fetchStudentDetail,
        fetchStudents,
        fetchAvailableStudents,
        addStudents,
        removeStudent,
        importStudents,
        promoteClass,
    };
}

