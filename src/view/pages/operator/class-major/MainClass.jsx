import { useClassFilter } from './components/FilterDropdown';
import useClasses from '../../../../Core/hooks/class-major/useClass';
import { X,Check,ChevronRight, ChevronDown , Search} from "lucide-react";
import ClassCard from './components/ClassCard'; 
import Pagination from './components/PaginitionClass'; 
import Form from './components/FormClass'; 
import Header from './Header'; 
import { useState } from 'react';


const CheckIcon = () => (
   <Check className="h-4 w-4 text-blue-600" />
);

const ChevronRightIcon = () => (
   <ChevronRight className="w-4 h-4 text-gray-500" />
);

const ChevronDownIcon = () => (
   <ChevronDown className="w-4 h-4 text-gray-500" />
);



const MainClass = () => {
    const { classesData, addClass, loading, fetchClass, page,  setPage, isLastPage} = useClasses();
    const [isOpenForm, setIsOpenForm] = useState(false);

    const toggleForm = () => {
       setIsOpenForm(!isOpenForm);
    }

    const { isDropdownOpen, selectedFilter, openCategoryKey, searchTerm, handleFilterSelect, toggleDropdown, toggleCategory, setSearchTerm, filterMenuOptions, filteredClasses} = useClassFilter(classesData);
    
    const handleFormClose = () => {
        setIsOpenForm(false);
    };
    //ini untuk menghadle sukses
    const [successMessage, setSuccessMessage] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const handleSuccess = (msg) => {
    setSuccessMessage(msg);
    setShowSuccessModal(true);
    setIsOpenForm(false); 
    };

    // ini untuk menghadle error
    const [errorMessage, setErrorMessage] = useState("");
    const [showErrorModal, setShowErrorModal] = useState(false);
    const handleError = (msg) => {
        setErrorMessage(msg);
        setShowErrorModal(true);
        setIsOpenForm(false);
    };

    return (
        <div className="p-4 sm:p-8 bg-gray-50 min-h-screen mb-20">
            <div className="relative w-full h-[166px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] mb-4">
                <div className="absolute inset-0 items-center justify-center rounded-[6px]">
                    <div className="ml-5 mt-2">
                        <h1 className="text-white text-[30px] font-semibold">Kelas & Jurusan</h1>
                        <p className="text-white text-[14px] font-light">Kelola data kelas dan jurusan di sekolah Anda</p>
                     </div>
                 </div>
            </div>   
            <Header/> 
            <header className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                <div className="flex items-center space-x-2 w-full md:w-auto">
                    <div className="relative flex items-center md:w-80 w-48 mr-4">
                        <Search className="absolute left-3 text-gray-400"/>
                        <input type="text" placeholder="Cari Kelas/Wali Kelas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
                        className="p-2 pl-10 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <div className="relative">
                        <button onClick={toggleDropdown} className="flex items-center space-x-1 px-4 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <span>{selectedFilter}</span> 
                            <span className={`transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-90' : 'rotate-0'}`}>&gt;</span>
                        </button>
                        {isDropdownOpen && (
                         <div className="absolute z-20 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-2xl right-0 md:left-0 p-1">
                            <div className="px-3 py-2 text-sm font-semibold text-gray-800">Pilih Kategori</div>
                                {filterMenuOptions.map((option, index) => {
                                    if (option.type === 'item') {
                                        return (
                                            <button key={index} onClick={() => handleFilterSelect(option.filterValue)} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center rounded-lg">
                                                {option.label}
                                                {option.filterValue === selectedFilter && <CheckIcon />}
                                            </button>
                                        );
                                    }
                                    if (option.type === 'category') {
                                        const isOpen = openCategoryKey === option.key;
                                            return (
                                                    <div key={index} className="mt-1">
                                                        <button onClick={() => toggleCategory(option.key)} className="w-full text-left px-3 py-2 text-sm font-semibold text-gray-800 flex justify-between items-center rounded-lg hover:bg-gray-100">
                                                            {option.label}
                                                            {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />} 
                                                        </button>
                                                     {isOpen && (
                                                      <div className="bg-white border-t border-gray-100">
                                                            {option.items.map((item, itemIndex) => (
                                                                <button key={itemIndex} onClick={() => handleFilterSelect(item)} className="w-full text-left pl-7 pr-3 py-1.5 text-sm text-gray-600 hover:bg-blue-50 flex justify-between items-center">
                                                                    {item}
                                                                    {item === selectedFilter && <CheckIcon className="text-blue-500 z-100" />}
                                                                </button>
                                                            ))}
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
                    <button onClick={toggleForm} className="w-full md:w-auto px-4 py-2 bg-[#3B82F6] text-white font-semibold rounded-lg shadow-md  transition flex items-center justify-center space-x-1">
                        <span>+</span> <span>Tambah Kelas</span>
                    </button>
                </header>
            {isOpenForm &&
                  (
                    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-2xl max-w-2xl w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800">Tambah Kelas</h2>
                                <button onClick={() => handleFormClose()}><X className='text-gray-400 hover:text-red-900'/></button>
                            </div>
                            <Form onClassAdded={handleFormClose} addClass={addClass} onError={handleError}   onSuccess={handleSuccess} /> 
                        </div>
                    </div>
                   )
             }
            {/* modal sukses */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-80">
                        <h2 className="text-lg font-semibold text-green-600 mb-2">
                            Berhasil
                        </h2>

                        <p className="text-gray-700 mb-4">{successMessage}</p>

                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full py-2 bg-green-600 text-white rounded-lg"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            )}
            {/* modal error */}
                {showErrorModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-xl shadow-xl w-80">
                            <h2 className="text-lg font-semibold text-red-600 mb-2">
                                Peringatan
                            </h2>

                            <p className="text-gray-700 mb-4">{errorMessage}</p>

                            <button
                                onClick={() => setShowErrorModal(false)}
                                className="w-full py-2 bg-blue-600 text-white rounded-lg"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}

       
            {filteredClasses.length === 0 && searchTerm && (
                <p className="text-center text-gray-500 text-lg">Tidak ada kelas yang cocok dengan "{searchTerm}".</p>
            )}
            {filteredClasses.length === 0 && !searchTerm && (
                <p className="text-center text-gray-500 text-lg">Belum ada data kelas yang ditambahkan.</p>
            )}
            {
               loading ? (
                    <div className="flex justify-center items-center h-screen bg-gray-50">
                        <div className="text-lg ">Memuat data kelas...</div>
                    </div>
                ) : (
            
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {filteredClasses.map((classData) => (
                    <ClassCard key={classData.id} classData={classData} />
                ))}
            </div>
            )}          
              <Pagination page={page} lastPage={isLastPage} onPageChange={(p) => fetchClass(p)}/>   
        </div>
    );
};

export default MainClass;