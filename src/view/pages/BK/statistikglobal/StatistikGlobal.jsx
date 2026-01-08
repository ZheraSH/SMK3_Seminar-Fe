import React, { useState, useCallback } from "react";
import Header from "../../../components/elements/header/Header.Page";
import { ChevronRight, Calendar, Loader2, X } from "lucide-react";
import useAttendanceStatistics from "../../../../Core/hooks/bk-hooks/statistikglobal/useStatistikGlobal"; 
import StatsCard from "./components/StatsCard";
import { LineChartPlaceholder, PieChartPlaceholder } from "./components/Charts";
import LoadingData from "../../../components/Loading/Data";

const CustomDropdown = ({ title, options, onClose, onSelect, activeValue }) => {
    return (
        <div className="absolute z-10 top-full mt-2 left-0 right-4 w-64 md:w-48 bg-white rounded-xl shadow-2xl border border-gray-200 p-3 transform transition-opacity duration-200 animate-in fade-in-0 slide-in-from-top-1">
            <div className="flex justify-between items-center pb-2 border-b mb-2">
                <h3 className="font-semibold text-sm text-gray-800">{title}</h3>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition p-1 rounded-full">
                    <X className="w-5 h-5" />
                </button>
            </div>
            <ul className="space-y-1 max-h-60 overflow-y-auto">
                {options.map((option) => (
                    <li key={option.value}  onClick={() => onSelect(option)} className={`px-3 py-2 text-sm text-gray-700 rounded-lg cursor-pointer transition ${option.value === activeValue ? 'bg-blue-100 text-blue-800 font-semibold' : 'hover:bg-blue-50 hover:text-blue-600'}`}>
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function MainStatistikGlobal() {
    const [activeFilter, setActiveFilter] = useState(null);
    
    const [selectedPeriod, setSelectedPeriod] = useState({ label: "Bulan Ini", value: "month" });
    const [selectedClass, setSelectedClass] = useState({ label: "Semua Kelas", value: "all_classes" });
    const [selectedMajor, setSelectedMajor] = useState({ label: "Semua Jurusan", value: "all_majors" });
    const [selectedDateRange, setSelectedDateRange] = useState({ label: "5 Sep, 2025", value: "20250905" }); 

    const { statistics, loading, errorStatistics, refreshStatistics} = useAttendanceStatistics();
    const summary = statistics?.summary || {};
    const proportion = statistics?.proportion || {};
    const monthly_trend = statistics?.monthly_trend || {};

    const filterOptions = {
        Periode: [
            { label: "Bulan Ini", value: "month" },
            { label: "Minggu Ini", value: "week" },
            { label: "Hari Ini", value: "day" },
            { label: "Tahun Ajaran 2024/2025", value: "year_24_25" },
        ],
        Kelas: [
            { label: "Semua Kelas", value: "all_classes" },
            { label: "Kelas X", value: "X" },
            { label: "Kelas XI", value: "XI" },
            { label: "Kelas XII", value: "XII" },
        ],
        Jurusan: [
            { label: "Semua Jurusan", value: "all_majors" },
            { label: "IPA", value: "IPA" },
            { label: "IPS", value: "IPS" },
            { label: "Bahasa", value: "Bahasa" },
        ],
        Tanggal: [
            { label: "Hari Ini", value: "today" },
            { label: "7 Hari Terakhir", value: "last_7_days" },
            { label: "30 Hari Terakhir", value: "last_30_days" },
            { label: "Pilih Tanggal Kustom...", value: "custom" },
        ],
    };

    const toggleDropdown = useCallback((filterName) => {
        setActiveFilter(activeFilter === filterName ? null : filterName);
    }, [activeFilter]);

    const handleSelectOption = (filterName, option) => {
        if (filterName === 'Periode') {
            setSelectedPeriod(option);
        } else if (filterName === 'Kelas') {
            setSelectedClass(option);
        } else if (filterName === 'Jurusan') {
            setSelectedMajor(option);
        } else if (filterName === 'Tanggal') {
            if(option.value === 'custom') {
                alert('Fungsi Date Picker Kustom Belum Diimplementasikan');
            } else {
                setSelectedDateRange(option);
            }
        }

        setActiveFilter(null);
        console.log(`Filter ${filterName} dipilih: ${option.label} (${option.value})`);
    };

    if (loading) {
        return (
            <LoadingData loading={loading} />
        );
    }

    if (errorStatistics) {
        return (
            <div className="p-4 bg-gray-50 min-h-screen">
                <div className="p-6 text-center bg-red-100 border border-red-400 text-red-700 rounded-xl">
                    <p className="font-bold mb-2">⚠️ Gagal Memuat Data Statistik</p>
                    <p>{errorStatistics}. Coba muat ulang halaman atau klik tombol di bawah.</p>
                    <button  onClick={refreshStatistics} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-150">
                        Muat Ulang Data
                    </button>
                </div>
            </div>
        );
    }
    
    if (!statistics) {
        return <div className="p-4">Tidak ada data untuk ditampilkan.</div>; 
    }

    const filters = [
        { name: "Periode", selected: selectedPeriod, options: filterOptions.Periode },
        { name: "Kelas", selected: selectedClass, options: filterOptions.Kelas },
        { name: "Jurusan", selected: selectedMajor, options: filterOptions.Jurusan },
    ];


    return (
        <div className="p-4 bg-gray-50 min-h-screen lg:mb-4 mb-20 ">
            <Header h1="Statistik Absensi Global" p="Analisis tingkat kehadiran siswa di seluruh sekolah berdasarkan periode dan kategori." />

            {/* <div className="flex flex-wrap gap-3 justify-between items-center mb-6 bg-white px-6 h-[70px] rounded-xl shadow-md ">
                <h2 className="text-lg font-semibold text-gray-800">Filter Data</h2>
                <div className="flex flex-wrap gap-3">
                    
                    {filters.map((filter) => (
                        <div key={filter.name} className="relative">
                            <button onClick={() => toggleDropdown(filter.name)} className={`flex items-center border rounded-lg px-4 py-2 text-sm transition duration-150 ${activeFilter === filter.name ? 'border-blue-500 bg-blue-50' : 'border-gray-400 hover:bg-gray-50'}`}>
                                {filter.selected.label} <ChevronRight className={`w-4 h-4 ml-2 text-gray-500 transition-transform duration-200 ${activeFilter === filter.name ? 'rotate-90' : 'rotate-0'}`} />
                            </button>
                            {activeFilter === filter.name && (
                                <CustomDropdown title={`Pilih ${filter.name}`} options={filter.options} onClose={() => setActiveFilter(null)} onSelect={(option) => handleSelectOption(filter.name, option)}activeValue={filter.selected.value}/>
                            )}
                        </div>
                    ))}

                    <div className="relative">
                        <button onClick={() => toggleDropdown('Tanggal')} className={`flex items-center border rounded-lg px-4 py-2 text-sm transition duration-150 ${activeFilter === 'Tanggal' ? 'border-blue-500 bg-blue-50' : 'border-gray-400 hover:bg-gray-50'}`}>
                            <Calendar className="w-4 h-4 mr-2" /> 
                            {selectedDateRange.label} 
                            <ChevronRight className={`w-4 h-4 ml-2 text-gray-500 transition-transform duration-200 ${activeFilter === 'Tanggal' ? 'rotate-90' : 'rotate-0'}`} />
                        </button>
                        {activeFilter === 'Tanggal' && (
                            <CustomDropdown  title="Pilih Tanggal" options={filterOptions.Tanggal} onClose={() => setActiveFilter(null)} onSelect={(option) => handleSelectOption('Tanggal', option)} activeValue={selectedDateRange.value}/>
                        )}
                    </div>

                </div>
            </div> */}

            <h2 className="lg:text-[24px] md:text-[18px] sm:text-[14px] font-bold text-gray-800 mb-4 sm:mb-6">Ringkasan Statistik Bulan Ini</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatsCard title="Rata-rata Kehadiran" value={`${summary.avg ?? 0}%`} iconType="up" color="green"/>
                <StatsCard title="Total Izin" value={proportion.leave ?? 0} iconType="neutral"color="yellow"/>
                <StatsCard title="Total Sakit" value={proportion.sick ?? 0} iconType="neutral" color="blue"/>
                <StatsCard title="Total Alpha" value={proportion.alpha ?? 0}iconType="down"color="red"/>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-2 lg:gap-6 max-w-7xl mx-auto">
                <div className="lg:col-span-4 min-h-[400px]">
                    <LineChartPlaceholder monthlyTrendData={monthly_trend} />
                </div>
                <div className="lg:col-span-3 min-h-[450px] lg:-mt-0 md:-mt-10">
                    <PieChartPlaceholder proportionData={proportion} totalStudents={summary.total}/>
                </div>
            </div>
        </div>
    );
}