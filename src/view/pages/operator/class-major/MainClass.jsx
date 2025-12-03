import useClasses from "../../../../Core/hooks/operator-hooks/class-major/useClass";
import { X, Check, ChevronRight, ChevronDown, Search } from "lucide-react";
import ClassCard from "./components/ClassCard";
import Pagination from "./components/PaginitionClass";
import Form from "./components/FormClass";
import Header from "./Header";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const CheckIcon = () => <Check className="h-4 w-4 text-blue-600" />;
const ChevronRightIcon = () => (
    <ChevronRight className="w-4 h-4 text-gray-500" />
);
const ChevronDownIcon = () => <ChevronDown className="w-4 h-4 text-gray-500" />;

const MainClass = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialMajorFilter = decodeURIComponent(queryParams.get('major') || "");

    const { classesData, addClass, loading, page, lastPage, handlePageChange, filters, handleFilterChange, filterOptions,searchText, handleSearchChange } = useClasses({initialMajor: initialMajorFilter});

    const [isOpenForm, setIsOpenForm] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [openCategoryKey, setOpenCategoryKey] = useState(null);

    const toggleForm = () => {
        setIsOpenForm(!isOpenForm);
    };

    const schoolYearItems = filterOptions.schoolYears?.data;
    const yearItemsToRender = 
    (schoolYearItems && schoolYearItems.length > 0)
        ? schoolYearItems.map(y => y.name)
        : ["Data Tahun Ajaran Tidak Tersedia"];


    const filterMenuOptions = [
        {
            type: "item",
            label: "Semua",
            filterValue: { major: "", school_year: "", level_class: "" },
            display: "Show all"
        },
        { 
            type: "category", 
            key: "major", 
            label: "Jurusan", 
            items: filterOptions.majors.map(m => m.name) 
        },
        { 
            type: "category", 
            key: "level", 
            label: "Tingkat Kelas", 
            items: filterOptions.levelClasses.map(l => l.name) 
        },
        { 
            type: "category", 
            key: "year", 
            label: "Tahun Ajaran", 
            items: yearItemsToRender 
        }
    ];


    const getActiveFilterValue = () => {
        return filters.major || filters.school_year || filters.level_class || "Show all";
    }

    const handleFilterSelect = (value) => {
        let newFilters = { major: "", school_year: "", level_class: "" };

        if (value === "Semua Filter" || value === "Show all" || value === "Data Tahun Ajaran Tidak Tersedia") {
        newFilters = { major: "", school_year: "", level_class: "" };
        } else if (filterOptions.levelClasses.some(l => l.name === value)) {
        newFilters.level_class = value;
        } else if (filterOptions.majors.some(m => m.name === value)) {
        newFilters.major = value;
        } else if (filterOptions.schoolYears?.data?.some(y => y.name === value)) {
        newFilters.school_year = value;
        }
 
        handleFilterChange(newFilters);
        setOpenCategoryKey(null); 
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
    const toggleCategory = (key) => setOpenCategoryKey(prev => (prev === key ? null : key));

    const handleFormClose = () => {
        setIsOpenForm(false);
    };

    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const handleError = (msg) => {
        setErrorMessage(msg);
        setShowErrorModal(true);
        setIsOpenForm(false);
    };

    const displayClasses = classesData;

    return (
        <div className="p-3 sm:p-3 bg-gray-50 min-h-screen mb-32 lg:mb-4">
            <div className="relative w-full h-[166px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] mb-4">
                <div className="absolute inset-0 items-center justify-center rounded-[6px]">
                    <div className="ml-5 mt-2">
                        <h1 className="text-white text-[30px] font-semibold">Kelas & Jurusan</h1>
                        <p className="text-white text-[14px] font-light">Kelola data kelas dan jurusan di sekolah Anda</p>
                    </div>
                </div>
            </div>
            <Header />
            <header className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2 w-full md:w-auto ">
                    <div className="relative flex items-center mr-4">
                        <Search className="absolute left-3 text-gray-400" />
                        <input type="text" placeholder="Cari Kelas/Wali Kelas..." value={searchText} onChange={(e) => handleSearchChange(e.target.value)} className="p-2 pl-10 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
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
                                        const isYearCategoryEmpty = option.key === 'year' && option.items.length === 1 && option.items[0] === "Data Tahun Ajaran Tidak Tersedia";

                                        return (
                                        <div key={index} className="mt-1">
                                            <button onClick={() => toggleCategory(option.key)} className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-800 flex justify-between items-center rounded-lg hover:bg-gray-100">
                                            {option.label} {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />} 
                                        </button>
                                        {isOpen && (
                                            <div className="bg-white border-t border-gray-100">
                                            {isYearCategoryEmpty ? (
                                                <div className="w-full text-left pl-7 pr-3 py-1.5 text-sm text-red-500">
                                                {option.items[0]}
                                                </div>
                                            ) : (
                                                option.items.map((item, itemIndex) => (
                                                <button 
                                                    key={itemIndex} 
                                                    onClick={() => handleFilterSelect(item)} 
                                                    className="w-full text-left pl-7 pr-3 py-1.5 text-sm text-gray-600 hover:bg-blue-50 flex justify-between items-center"
                                                >
                                                {item} 
                                                {getActiveFilterValue() === item && ( <CheckIcon className="text-blue-500 z-100" />)}
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
                </div>
                <button onClick={toggleForm} className="w-full md:w-auto px-4 py-2 bg-[#3B82F6] text-white font-semibold rounded-lg shadow-mdtransition flex items-center justify-center space-x-1">
                    <span>+</span> <span>Tambah Kelas</span>
                </button>
            </header>
 
            {/* Modal Form */}
            {isOpenForm && (
            <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 -mt-32">
                <div className="bg-white p-6 rounded-lg shadow-2xl max-w-2xl w-full mx-4">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Tambah Kelas</h2>
                        <button onClick={() => handleFormClose()}> <X className="text-gray-400 hover:text-red-900" /></button>
                    </div>
                    <Form onClassAdded={handleFormClose} addClass={addClass} onError={handleError} />
                </div>
            </div>
            )}
            {/* modal error */}
            {showErrorModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl w-80">
                    <h2 className="text-lg font-semibold text-red-600 mb-2">Peringatan</h2>
                    <p className="text-gray-700 mb-4">{errorMessage}</p>
                    <button onClick={() => setShowErrorModal(false)} className="w-full py-2 bg-blue-600 text-white rounded-lg">Tutup</button>
                </div>
            </div>
            )}
 
            {displayClasses.length === 0 && searchText && !loading && (
            <p className="text-center text-gray-500 text-lg"> Tidak ada kelas yang cocok dengan "{searchText}".</p>
            )}
 
            {displayClasses.length === 0 && !searchText && !loading && (
            <p className="text-center text-gray-500 text-lg">Belum ada data kelas yang ditambahkan.</p>
            )}
 
            {loading ? (
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="text-lg ">Memuat data kelas...</div>
            </div>
            ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {displayClasses.map((classData) => (
                    <ClassCard key={classData.id} classData={classData} />
                ))}
            </div>
            )}
 
            <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange}/> 
        </div>
    );
};

export default MainClass;