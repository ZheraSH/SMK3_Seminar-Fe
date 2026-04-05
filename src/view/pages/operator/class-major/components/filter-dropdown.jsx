import React, { useState } from "react";
import { Check, ChevronRight, ChevronDown } from "lucide-react";

const CheckIcon = () => <Check className="h-4 w-4 text-blue-600" />;
const ChevronRightIcon = () => <ChevronRight className="w-4 h-4 text-gray-500" />;
const ChevronDownIcon = () => <ChevronDown className="w-4 h-4 text-gray-500" />;

const FilterDropdown = ({ filters, filterOptions, onFilterChange }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [openCategoryKey, setOpenCategoryKey] = useState(null);

    const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
    const toggleCategory = (key) => setOpenCategoryKey((prev) => (prev === key ? null : key));

    const getItemLabel = (item) => (typeof item === "string" ? item : item.label);
    const getItemValue = (item) => (typeof item === "string" ? item : item.value);

    const getActiveFilterValue = () => {
        if (filters.major) return filters.major;
        if (filters.level_class) return filters.level_class;
        if (filters.school_year) return filters.school_year;
        return "Show all";
    };

    const handleFilterSelect = (value) => {
        let newFilters = { major: "", school_year: "", level_class: "" };

        if (value === "Semua Filter" || value === "Show all" || value === "Data Tahun Ajaran Tidak Tersedia") {
            newFilters = { major: "", school_year: "", level_class: "" };
        } else if (filterOptions.levelClasses.some((l) => l.name === value)) {
            newFilters.level_class = value;
        } else if (value && typeof value === "object" && value.value) {
            newFilters.major = value.value;
        } else if (filterOptions.schoolYears.some((y) => y.name === value)) {
            newFilters.school_year = value;
        }

        onFilterChange(newFilters);
        setOpenCategoryKey(null);
        setIsDropdownOpen(false);
    };

    const schoolYearItems = filterOptions.schoolYears;
    const yearItemsToRender = schoolYearItems?.length > 0 ? schoolYearItems.map((y) => y.name) : ["Data Tahun Ajaran Tidak Tersedia"];

    const filterMenuOptions = [
        {
            type: "item",
            label: "Semua",
            display: "Show all",
        },
        {
            type: "category",
            key: "major",
            label: "Jurusan",
            items: filterOptions.majors.map((m) => ({ label: m.code, value: m.code })),
        },
        {
            type: "category",
            key: "level",
            label: "Tingkat Kelas",
            items: filterOptions.levelClasses.map((l) => l.name),
        },
        {
            type: "category",
            key: "year",
            label: "Tahun Ajaran",
            items: yearItemsToRender,
        },
    ];

    return (
        <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center space-x-1 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
                <span className="text-sm">{getActiveFilterValue()}</span>
                <span className={`transform transition-transform duration-200 ${isDropdownOpen ? "rotate-90" : "rotate-0"}`}>
                    &gt;
                </span>
            </button>

            {isDropdownOpen && (
                <div className="absolute z-20 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl right-0 md:left-0 p-1">
                    <div className="px-3 py-2 text-sm font-semibold text-gray-800">Pilih Kategori</div>
                    {filterMenuOptions.map((option, index) => {
                        if (option.type === "item") {
                            return (
                                <button key={index} onClick={() => handleFilterSelect(option.display)} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center rounded-lg">
                                    {option.display} {getActiveFilterValue() === option.display && <CheckIcon />}
                                </button>
                            );
                        }
                        if (option.type === "category") {
                            const isOpen = openCategoryKey === option.key;
                            const isYearEmpty = option.key === "year" && option.items[0] === "Data Tahun Ajaran Tidak Tersedia";

                            return (
                                <div key={index} className="mt-1">
                                    <button onClick={() => toggleCategory(option.key)} className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-800 flex justify-between items-center rounded-lg hover:bg-gray-100">
                                        {option.label} {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                                    </button>
                                    {isOpen && (
                                        <div className="bg-white border-t border-gray-100">
                                            {isYearEmpty ? (
                                                <div className="w-full text-left pl-7 pr-3 py-1.5 text-sm text-red-500">{option.items[0]}</div>
                                            ) : (
                                                option.items.map((item, itemIndex) => (
                                                    <button key={itemIndex} onClick={() => handleFilterSelect(item)} className="w-full text-left pl-7 pr-3 py-1.5 text-sm text-gray-600 hover:bg-blue-50 flex justify-between items-center">
                                                        {getItemLabel(item)}
                                                        {option.key === "major" && filters.major === getItemValue(item) && <CheckIcon />}
                                                        {option.key === "level" && filters.level_class === getItemValue(item) && <CheckIcon />}
                                                        {option.key === "year" && filters.school_year === getItemValue(item) && <CheckIcon />}
                                                    </button>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;