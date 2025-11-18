import React, { useState } from "react";

export default function FilterDropdown({ selected, onSelect }) {
    const [open, setOpen] = useState(false);
    const [openSection, setOpenSection] = useState(null);

    const sections = [
        {
            id: "jurusan",
            label: "Jurusan",
            items: ["PPLG", "DKV", "Kuliner", "Perhotelan", "KCS", "DPB"],
        },
        {
            id: "tingkatan",
            label: "Tingkatan",
            items: ["X", "XI", "XII"],
        },
        {
            id: "tahun",
            label: "Tahun Ajaran",
            items: ["2023/2024", "2024/2025"],
        },
    ];

    const toggleSection = (id) => {
        setOpenSection((prev) => (prev === id ? null : id));
    };

    return (
        <div className="relative">
            {/* BUTTON FILTER */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center px-4 py-2 bg-white rounded-full border border-gray-300 shadow-sm text-gray-700"
            >
                <span>{selected || "Show all"}</span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                        open ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* DROPDOWN */}
            {open && (
                <div className="absolute mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50">
                    
                    {/* TITLE */}
                    <p className="text-gray-700 font-semibold mb-3">Pilih Kategori</p>

                    {/* SHOW ALL */}
                    <button
                        onClick={() => onSelect("Show all")}
                        className="w-full text-left px-1 py-1 flex justify-between items-center hover:bg-gray-100 rounded-md"
                    >
                        <span className="text-gray-800">Show all</span>
                        {selected === "Show all" && (
                            <svg
                                className="w-4 h-4 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        )}
                    </button>

                    {/* SECTION LIST */}
                    {sections.map((sec) => (
                        <div key={sec.id} className="mt-4">
                            {/* SECTION TITLE */}
                            <button
                                onClick={() => toggleSection(sec.id)}
                                className="w-full flex justify-between items-center text-left text-gray-900 font-semibold py-1"
                            >
                                {sec.label}

                                <svg
                                    className={`w-4 h-4 transition-transform ${
                                        openSection === sec.id ? "rotate-90" : ""
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>

                            {/* SECTION ITEMS */}
                            {openSection === sec.id && (
                                <div className="mt-1 ml-3 space-y-1">
                                    {sec.items.map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => onSelect(item)}
                                            className="w-full text-left px-2 py-1 hover:bg-gray-200 rounded-md flex justify-between"
                                        >
                                            <span>{item}</span>

                                            {selected === item && (
                                                <svg
                                                    className="w-4 h-4 text-blue-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
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
