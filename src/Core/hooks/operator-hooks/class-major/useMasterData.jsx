import { useState, useEffect } from "react";
import { getMajors, getSchoolYears, getLevelClass, getTeachers } from "../../../api/role-operator/class-major/classApi"; 

const masterDataCache = {}; 

const fetchAndCache = async (apiFunc, key) => {
    try {
        const res = await apiFunc();
        let dataToCache = res?.data || res || []; 

        if (key === 'teachers') {
            dataToCache = dataToCache.filter((teacher) => {
                const roleValues = teacher.roles.map(r => r.value);
                const isPriorityTeacher = roleValues.includes('teacher') || roleValues.includes('homeroom_teacher');
                if (isPriorityTeacher) return true;

                const restrictedRoles = ['staff_tu', 'waka_kurikulum', 'bk'];
                const hasRestrictedRole = roleValues.some(role => restrictedRoles.includes(role));
                
                return !hasRestrictedRole;
            });
        }

        masterDataCache[key] = dataToCache;
        return dataToCache;
    } catch (error) {
        console.error(`Error fetching ${key}:`, error);
        return [];
    }
};

export default function useMasterData() {
    const [majors, setMajors] = useState(masterDataCache.majors || []);
    const [schoolYears, setSchoolYears] = useState(masterDataCache.schoolYears || []); 
    const [levelClass, setLevelClass] = useState(masterDataCache.levelClass || []);
    const [teachers, setTeachers] = useState(masterDataCache.teachers || []);
    
    const hasCachedData = majors.length || schoolYears.length || levelClass.length || teachers.length;
    const [loading, setLoading] = useState(!hasCachedData);
    const [error, setError] = useState(null);

    const fetchMasterData = async () => {
        if (hasCachedData) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        const promises = [];
        if (!masterDataCache.majors) promises.push(fetchAndCache(getMajors, 'majors'));
        if (!masterDataCache.levelClass) promises.push(fetchAndCache(getLevelClass, 'levelClass'));
        if (!masterDataCache.teachers) promises.push(fetchAndCache(getTeachers, 'teachers'));
        
        let schoolYearsPromise = !masterDataCache.schoolYears ? getSchoolYears() : null;

        try {
            await Promise.all(promises);
            setMajors(masterDataCache.majors || []);
            setTeachers(masterDataCache.teachers || []);
            setLevelClass(masterDataCache.levelClass || []);

            if (schoolYearsPromise) {
                const yearsResponse = await schoolYearsPromise;
                const yearsArrayData = yearsResponse?.data || []; 
                const activeSchoolYears = yearsArrayData.filter((year) => year.active === true);
                masterDataCache.schoolYears = activeSchoolYears;
                setSchoolYears(activeSchoolYears);
            }
            
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