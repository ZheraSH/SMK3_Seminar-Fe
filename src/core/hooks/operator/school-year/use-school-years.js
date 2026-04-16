import { useState, useEffect, useMemo } from "react";
import { getSchoolYears, createSchoolYears, activateSchoolYear, deleteSchoolYears as deleteSchoolYearsApi, getSemester } from "@api/role-operator/school-year/school-year-api";

export default function useSchoolYears() {
    const [schoolYears, setSchoolYears] = useState([]);
    const [semester, setSemester] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });

    const fetchSchoolYears = async (page = 1, search = searchQuery) => {
        try {
            setLoading(true);
            const result = await getSchoolYears(page, search);
            setSchoolYears(result.data);
            if (result.pagination || result.meta) {
                const pagin = result.pagination || result.meta;
                setPagination({
                    current_page: pagin.current_page,
                    last_page: pagin.last_page,
                    total: pagin.total
                });
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            fetchSchoolYears(1, searchQuery);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    useEffect(() => {
        fetchSchoolYears();
        getSemesterData();
    }, []);

    const refresh = () => fetchSchoolYears(pagination.current_page);

    const addSchoolYear = async (data) => {
        try {
            await createSchoolYears(data);
            await fetchSchoolYears(1);
        } catch (error) {
            const errorMessage = error.message || "Gagal menambahkan data.";
            throw new Error(errorMessage);
        }
    };


    const activateYear = async (id) => {
        try {
            setLoading(true);
            await activateSchoolYear(id);
            await refresh();
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteSchoolYears = async (id) => {
        try {
            await deleteSchoolYearsApi(id);
            await refresh();
        } catch (error) {
            throw error;
        }
    };

    const getSemesterData = async () => {
        try {
            const res = await getSemester();
            setSemester(res);
        } catch (error) {
            throw error;
        }
    }


    return {
        schoolYears,
        loading,
        error,
        addSchoolYear,
        activateYear,
        deleteSchoolYears,
        pagination,
        fetchSchoolYears,
        semester,
        searchQuery,
        setSearchQuery,
    };
}
