import React, { useState, useMemo } from "react";
import { X,Check,ChevronRight, ChevronDown , Search} from "lucide-react";

export default function FilterDropdown({ selected, onSelect, schedule }) {
    const [open, setOpen] = useState(false);
    const [openSection, setOpenSection] = useState(null);

    const jurusanList = useMemo(() => {
        return [...new Set(schedule.map(item => item.classroom.major))];
    }, [schedule]);

    const tingkatanList = useMemo(() => {
        return [...new Set(schedule.map(item => item.classroom.level_class))];
    }, [schedule]);

    const tahunList = useMemo(() => {
        return [...new Set(schedule.map(item => item.classroom.school_year))];
    }, [schedule]);

    const sections = [
        {
            id: "jurusan",
            label: "Jurusan",
            items: jurusanList
        },
        {
            id: "tingkatan",
            label: "Tingkatan",
            items: tingkatanList
        },
        {
            id: "tahun",
            label: "Tahun Ajaran",
            items: tahunList
        },
    ];

    const toggleSection = (id) => {
        setOpenSection((prev) => (prev === id ? null : id));
    };

    return (
        <div className="relative">
            <button onClick={() => setOpen(!open)} className="flex items-center px-4 py-2 bg-white rounded-full border border-gray-300 shadow-sm text-gray-700">
                <span>{selected || "Show all"}</span>
                <ChevronRight className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                        open ? "rotate-90" : ""
                    }`} />
            </button>

            {open && (
                <div className="absolute mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50">
                    <p className="text-gray-700 font-semibold mb-3">Pilih Kategori</p>
                    <button onClick={() => {
                            onSelect("Show all");
                            setOpen(false);
                            setOpenSection(null);
                    }}className="w-full text-left px-1 py-1 flex justify-between items-center hover:bg-gray-100 rounded-md">
                        <span className="text-gray-800">Show all</span>
                        {selected === "Show all" && (
                           <Check size={16} className="text-blue-400"/>
                        )}
                    </button>

                    {sections.map((sec) => (
                        <div key={sec.id} className="mt-4">
                            <button onClick={() => toggleSection(sec.id)} className="w-full flex justify-between items-center text-left text-gray-800 font-semibold py-1">
                                <span className="text-sm">{sec.label}</span>
                                <ChevronRight className={`w-4 h-4 transition-transform ${
                                        openSection === sec.id ? "rotate-90" : ""
                                    }`}/>
                            </button>

                            {openSection === sec.id && (
                                <div className="mt-1 ml-3 space-y-1">
                                    {sec.items.map((item) => (
                                        <button key={item} onClick={() => {
                                            onSelect(item);
                                            setOpen(false);      
                                            setOpenSection(null);    
                                        }}className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded-md flex justify-between">
                                            <span className="text-sm">{item}</span>

                                            {selected === item && (
                                                <Check size={16} className="text-blue-400"/>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
