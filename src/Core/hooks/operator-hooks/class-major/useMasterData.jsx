import { useState, useEffect } from "react";
import { getMajors, getSchoolYears, getLevelClass, getTeachers } from "../../../api/role-operator/class-major/classApi"; 

const masterDataCache = {}; 
const fetchAndCache = async (apiFunc, key) => {
    try {
        const res = await apiFunc();
        const dataToCache = res?.data || res || []; 
        masterDataCache[key] = dataToCache;
        return dataToCache;
    } catch (error) {
        console.error(`Error fetching ${key}:`, error);
        return []
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
        if (!loading && hasCachedData) {
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(null);
        const promises = [];
        const keys = [];

        if (!masterDataCache.majors) { promises.push(fetchAndCache(getMajors, 'majors')); keys.push('majors'); }
        if (!masterDataCache.levelClass) { promises.push(fetchAndCache(getLevelClass, 'levelClass')); keys.push('levelClass'); }
        if (!masterDataCache.teachers) { promises.push(fetchAndCache(getTeachers, 'teachers')); keys.push('teachers'); }
        
        let schoolYearsPromise = null;
        if (!masterDataCache.rawSchoolYears) { 
             schoolYearsPromise = getSchoolYears();
        }

        try {
            const otherResults = await Promise.all(promises);
            let finalYears = masterDataCache.schoolYears || [];

            if (schoolYearsPromise) {
                const yearsResponse = await schoolYearsPromise;
                const yearsArrayData = yearsResponse?.data || []; 
                const activeSchoolYears = yearsArrayData.filter((year) => year.active === true);
                masterDataCache.schoolYears = activeSchoolYears;
                finalYears = activeSchoolYears;
            }

            setMajors(masterDataCache.majors || []);
            setSchoolYears(finalYears);
            setLevelClass(masterDataCache.levelClass || []);
            setTeachers(masterDataCache.teachers || []);
            
        } catch (err) {
            setError(err.message || "Gagal memuat data master.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMasterData();
    }, []);

    return {
        majors,
        schoolYears,
        levelClass,
        teachers,
        loading,
        error,
        fetchMasterData,
    };
}