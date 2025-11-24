import { useState, useEffect } from 'react';
import { fetchClass} from '../../../api/lesson-shedule/lessonApi'; 

export default function useSchedule () {
    const [activeTab, setActiveTab] = useState('kelas');
    const [selectedFilter, setSelectedFilter] = useState("Show all");
    const [schedule, setSchedule] = useState ([]); 
      const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(1);
    
    const [selectedClassroomData, setSelectedClassroomData] = useState(null); 


    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchClass(page);
                setSchedule(data);
                if (data.length < 9) {
                    setIsLastPage(page);
                } else {
                    setIsLastPage(page + 1);
                }
          setPage(page);
            } catch (error) {
                console.error("Gagal mengambil data kelas:", error);
            }
        };
     
        loadData(1);
    }, [page]);

   const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= isLastPage) {
            setPage(newPage); 
        }
    };

    const handleViewSchedule = (classroomData) => {
        setSelectedClassroomData(classroomData); 
        setActiveTab('jadwal-kelas'); 
    };

    const handleBackToClasses = () => {
        setSelectedClassroomData(null); 
        setActiveTab('kelas'); 
    };


    return {
        activeTab,
        setActiveTab,
        schedule,
        selectedFilter,
        setSelectedFilter,
        handleViewSchedule,
         handleBackToClasses,
        selectedClassroomData,
        page,
        setPage: handlePageChange,
        isLastPage,
    }
}