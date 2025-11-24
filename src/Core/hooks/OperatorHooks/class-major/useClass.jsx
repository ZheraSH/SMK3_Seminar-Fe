import { useState, useEffect } from "react";
import { getClass, createClass } from "../../../api/class-major/classApi";

export default function useClasses() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // pagination states
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(1);

    const fetchClass = async (pageNumber = page) => {
        try {
            setLoading(true);

            const res = await getClass(pageNumber); // ambil data per page
            setData(res);

           if (res.length < 9) {
            // tidak ada halaman selanjutnya
            setIsLastPage(pageNumber);
        } else {
            // ada kemungkinan halaman selanjutnya
            setIsLastPage(pageNumber + 1);
        }
          setPage(pageNumber);

        } catch (error) {
            console.error("Error fetching Class:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const addClass = async (formData) => {
        setLoading(true);
        try {
            const result = await createClass(formData);

            // refresh halaman pertama setelah tambah data
            await fetchClass(1); 

            return { success: true, data: result };
        } catch (error) {
            console.error("Error adding class:", error);
            setLoading(false);
            throw error;
        }
    };

    // Load page 1 on first render
    useEffect(() => {
        setPage(1);
        fetchClass(1);
    }, []);

    return { 
        classesData: data, 
        loading, 
        addClass, 
        fetchClass,   // for navigation
        page,
        setPage,
        isLastPage
    }; 
}
