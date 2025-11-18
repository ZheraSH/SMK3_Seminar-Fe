import { useState,useEffect } from 'react';
import { fetchClass } from '../../api/lesson-shedule/lessonApi';

export default function useSchedule () {
    const [activeTab, setActiveTab] = useState('kelas');
    
    // STATE FILTER
    const [selectedFilter, setSelectedFilter] = useState("Show all");
    
    const [schedule,setSchedule] = useState ([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await fetchClass();
            setSchedule(data);
        };

        loadData();
    }, []);

    // HANDLER MELIHAT JADWAL
    const handleViewSchedule = (className, mode) => {
        setSchedule(className);
        setActiveTab(mode);
    };

    return {
        activeTab,
        setActiveTab,
        schedule,
        setSchedule,
        selectedFilter,
        setSelectedFilter,
        handleViewSchedule,
    }
}