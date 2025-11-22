import { useState, useEffect } from 'react';
import { fetchClass} from '../../api/lesson-shedule/lessonApi'; 

export default function useSchedule () {
    const [activeTab, setActiveTab] = useState('kelas');
    const [selectedFilter, setSelectedFilter] = useState("Show all");
    const [schedule, setSchedule] = useState ([]); 
    
    const [selectedClassroomData, setSelectedClassroomData] = useState(null); 


    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchClass();
                setSchedule(data);
            } catch (error) {
                console.error("Gagal mengambil data kelas:", error);
            }
        };

        loadData();
    }, []);

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
    }
}