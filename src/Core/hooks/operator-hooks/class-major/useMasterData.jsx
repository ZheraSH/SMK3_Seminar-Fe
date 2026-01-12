import { useState, useEffect } from "react";
import { getMajors, getSchoolYears, getLevelClass, getTeachers } from "../../../api/role-operator/class-major/classApi"; 

const masterDataCache = {}; 

export default function useMasterData() {
    const [majors, setMajors] = useState(masterDataCache.majors || []);
    const [schoolYears, setSchoolYears] = useState(masterDataCache.schoolYears || []); 
    const [levelClass, setLevelClass] = useState(masterDataCache.levelClass || []);
    const [teachers, setTeachers] = useState(masterDataCache.teachers || []);
    
    const hasCachedData = majors.length || schoolYears.length || levelClass.length || teachers.length;
    const [loading, setLoading] = useState(!hasCachedData);
    const [error, setError] = useState(null);

    const fetchMasterData = async () => {
        if (!loading && hasCachedData) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const [resMajors, resLevel, resTeachers, resYears] = await Promise.all([
                !masterDataCache.majors ? getMajors() : Promise.resolve(masterDataCache.majors),
                !masterDataCache.levelClass ? getLevelClass() : Promise.resolve(masterDataCache.levelClass),
                !masterDataCache.teachers ? getTeachers() : Promise.resolve(null),
                !masterDataCache.schoolYears ? getSchoolYears() : Promise.resolve(masterDataCache.schoolYears)
            ]);

            if (!masterDataCache.majors) masterDataCache.majors = resMajors?.data || resMajors || [];

            if (!masterDataCache.levelClass) masterDataCache.levelClass = resLevel?.data || resLevel || [];

            if (!masterDataCache.teachers && resTeachers) {
                const rawTeachers = resTeachers?.data || resTeachers || [];
                
                const allowedRoles = ["teacher", "homeroom_teacher"];

                const filteredTeachers = rawTeachers.filter((guru) => {
                    return guru.roles.some((role) => allowedRoles.includes(role.value));
                });

                masterDataCache.teachers = filteredTeachers;
            }

            if (resYears && !masterDataCache.schoolYears) {
                const yearsArray = resYears?.data || resYears || [];
                masterDataCache.schoolYears = yearsArray;
            }

            setMajors(masterDataCache.majors);
            setLevelClass(masterDataCache.levelClass);
            setTeachers(masterDataCache.teachers);
            setSchoolYears(masterDataCache.schoolYears);
            
        } catch (err) {
            setError(err.message || "Gagal memuat data master.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMasterData();
    }, []);

    return { majors, schoolYears, levelClass, teachers, loading, error, fetchMasterData };
}