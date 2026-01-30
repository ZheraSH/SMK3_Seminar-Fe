import useClasses from "../../../../Core/hooks/operator-hooks/class-major/useClass";
import { X, Search, Plus } from "lucide-react";
import ClassCard from "./components/ClassCard";
import Pagination from "./components/PaginitionClass";
import Form from "./components/FormClass";
import HeaderNew from "../../../components/elements/header/Header-new";
import FilterDropdown from "./components/FilterDropdown";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingData from "../../../components/elements/loadingData/loading";

const MainClass = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialMajorFilter = decodeURIComponent(queryParams.get('major') || "");

    const { classesData, addClass, loading, page, lastPage, handlePageChange, filters, handleFilterChange, filterOptions, searchText, handleSearchChange, total } = useClasses({ initialMajor: initialMajorFilter });

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

    return (
        <div className=" bg-gray-50 min-h-screen mb-32 lg:mb-4">
            {loading ? (<LoadingData loading={loading} type="header1" />)
                : (
                    <HeaderNew span={`Daftar Kelas ${filters.major ? `- ${filters.major}` : ""}`} p={`Tolal kelas : ${total}`} src="/images/particle/particle3.png" />
                )}
            {loading ? (<LoadingData loading={loading} type="create" />)
                : (
                    <header className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-2 w-full md:w-auto ">
                            <div className="relative flex items-center mr-4">
                                <Search className="absolute left-3 text-gray-400" />
                                <input type="text" placeholder="Cari Kelas/Wali Kelas..." value={searchText} onChange={(e) => handleSearchChange(e.target.value)} className="p-2 pl-10 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <FilterDropdown filters={filters} filterOptions={filterOptions} onFilterChange={handleFilterChange} />
                        </div>
                        <button onClick={toggleForm} className="w-full md:w-auto px-4 py-2 bg-[#3B82F6] text-white font-medium text-[16px] rounded-lg shadow-md transition flex items-center justify-center space-x-1">
                            <span className="flex flex-row items-center gap-2"> <Plus size={18} /> Tambah Kelas</span>
                        </button>
                    </header>
                )}

            {isOpenForm && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center z-50 -mt-10">
                    <div className="bg-white p-6 rounded-lg shadow-2xl max-w-2xl w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">Tambah Kelas</h2>
                            <button onClick={handleFormClose}> <X className="text-gray-400 hover:text-red-900" /></button>
                        </div>
                        <Form onClassAdded={handleFormClose} addClass={addClass} onError={handleError} initialMajorCode={filters.major} />
                    </div>
                </div>
            )}

            {showErrorModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-80">
                        <h2 className="text-lg font-semibold text-red-600 mb-2">Peringatan</h2>
                        <p className="text-gray-700 mb-4">{errorMessage}</p>
                        <button onClick={() => setShowErrorModal(false)} className="w-full py-2 bg-blue-600 text-white rounded-lg">Tutup</button>
                    </div>
                </div>
            )}

            {classesData.length === 0 && !loading ? (
                <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in duration-500">
                    <img src="/images/null/nullimage.png" alt="Data Kosong" className="w-48 h-auto md:w-[400px] md:h-[285px] mb-6" />
                    <p className="text-gray-500 text-center text-sm md:text-md"> Maaf yaaa.. datanya gaada, silahkan klik “Tambah kelas” buat <br />  nambah data kelas!
                    </p>
                </div>
            ) : loading ? (
                <LoadingData loading={loading} type="cardclass" count={9} />
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {classesData.map((classData) => (
                        <ClassCard key={classData.id} classData={classData} />
                    ))}
                </div>
            )}

            <Pagination page={page} lastPage={lastPage} onPageChange={handlePageChange} />
        </div>
    );
};

export default MainClass;