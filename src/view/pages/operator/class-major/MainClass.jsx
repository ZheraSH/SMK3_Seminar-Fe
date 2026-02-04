import useClasses from "../../../../Core/hooks/operator-hooks/class-major/useClass";
import { X, Check, ChevronRight, ChevronDown, Search,Plus } from "lucide-react";
import ClassCard from "./components/ClassCard";
import Pagination from "./components/PaginitionClass";
import Form from "./components/FormClass";
import Header from "./Header";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import FilterDropdown from "./components/FilterDropdown";
import LoadingData from "../../../components/Loading/Data";


const MainClass = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialMajorFilter = decodeURIComponent(queryParams.get('major') || "");
    const { classesData, addClass, loading, page, lastPage, handlePageChange, filters, handleFilterChange, filterOptions,searchText, handleSearchChange } = useClasses({initialMajor: initialMajorFilter});
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);

    const toggleForm = () => setIsOpenForm(!isOpenForm);
    const handleFormClose = () => setIsOpenForm(false);

    const handleError = (msg) => {
        setErrorMessage(msg);
        setShowErrorModal(true);
        setIsOpenForm(false);
    };

    if (loading) {
        return <LoadingData loading={loading} />;
    }
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
                        <FilterDropdown  filters={filters}  filterOptions={filterOptions}  handleFilterChange={handleFilterChange} />
                    </div>
                </div>
                <button onClick={toggleForm} className="w-full md:w-auto px-4 py-2 bg-[#3B82F6] text-white font-medium text-[16px] rounded-lg shadow-md transition flex items-center justify-center space-x-1">
                     <span className="flex flex-row items-center gap-2"> <Plus size={18}/> Tambah Kelas</span>
                </button>
            </header>
 
            {/* Modal Form */}
            {isOpenForm && (
            <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 -mt-10">
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
 
            {classesData.length === 0 && searchText && !loading && (
            <p className="text-center text-gray-500 text-lg"> Tidak ada kelas yang cocok dengan "{searchText}".</p>
            )}
 
            {classesData.length === 0 && !searchText && !loading && (
            <p className="text-center text-gray-500 text-lg">Belum ada data kelas yang ditambahkan.</p>
            )}
 
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {classesData.map((classData) => (
                    <ClassCard key={classData.id} classData={classData} />
                ))}
            </div> 
            <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange}/> 
        </div>
    );
};

export default MainClass;