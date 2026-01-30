import React, { useState, useEffect, useRef } from 'react';
import { Search, Plus, Calendar, MoreVertical, ChevronLeft, ChevronRight, Trash2, Power } from 'lucide-react';
import HeaderPage from '../../../components/elements/header/Header-new';
import useSchoolYears from '../../../../Core/hooks/operator-hooks/schoolyear/schoolyear';
import AddSchoolYearModal from './components/Formschoolyear'; 
import ModalDelete from '../../../components/elements/modaldelete/ModalDelete'; 
import Pagination from './components/Pagination';
import LoadingData from '../../../components/elements/loadingData/loading';

const AcademicYearDashboard = () => {
  const { schoolYears, loading, error, addSchoolYear, activateYear, deleteSchoolYears,pagination,fetchSchoolYears,semester, searchQuery,setSearchQuery,  } = useSchoolYears();
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null, name: ''});

  const dropdownRef = useRef(null);

  const openDeleteConfirm = (item) => {
    setConfirmModal({ show: true, id: item.id, name: item.name });
    setOpenDropdownId(null); 
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSchoolYears(confirmModal.id);
      setConfirmModal({ show: false, id: null, name: '' }); 
    } catch (err) {
      console.error("Gagal menghapus tahun ajaran:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  
  const getNextYear = () => {
  if (!schoolYears || schoolYears.length === 0) return "2024/2025";

  const allYears = schoolYears.map(item => {
    const startYear = parseInt(item.name.split('/')[0]);
    return isNaN(startYear) ? 0 : startYear;
  });

  const maxYear = Math.max(...allYears);

  const nextStart = maxYear + 1;
  const nextEnd = nextStart + 1;

  return `${nextStart}/${nextEnd}`;
};

  const handleAddNewYear = async () => {
    const nextYear = getNextYear();
    try {
      await addSchoolYear({ name: nextYear, active: false });
      setIsModalOpen(false);
    } catch (err) {
      console.error("Gagal menambah tahun ajaran", err);
    }
  };

  const handleAction = async (action, item) => {
    setOpenDropdownId(null);
    if (action === 'toggle_status') {
      try {
        await activateYear(item.id);
      } catch (err) {
        console.error("Gagal mengaktifkan:", err);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans mb-10 md:mb-0">
      {loading?(<LoadingData  loading={loading} type='header1'/>)
      :(
        <HeaderPage span="Kelola Tahun Ajaran" p={`Semester saat ini : ${semester.semester}`} src="/images/particle/particle11.png"/>
      )}
      {loading? (<LoadingData loading={loading} type='create' />)
      :(
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 mt-6">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search size={18} />
            </span>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari Tahun Ajaran" className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"/>
          </div>
          
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium w-full flex justify-center items-center md:w-[258px] ">
            <Plus size={20} /> Tambah Tahun Ajaran
          </button>
        </div>
      )}

      {loading? (
          <LoadingData loading={loading} type='cardclass'/> 
          ) : schoolYears.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 w-full">
              <img  src="/images/null/nullimage.png"  alt="Data Kosong"  className="w-48 h-auto md:w-[400px] md:h-[285px] mb-4" />
              <p className="text-gray-500 text-center max-w-[550px] text-sm md:text-md">
                Maaf yaaa.. datanya gaada, silahkan klik “Tambah Tahun Ajaran” buat nambah data Tahun ajaran!
              </p>
            </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {schoolYears.map((item) => (
          <div key={item.id} className="bg-white h-[140px] p-6 rounded-2xl shadow-sm border border-gray-100 relative">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-500 rounded-lg text-white">
                  <Calendar size={18} />
                </div>
                <span className="text-blue-500 font-bold text-[12px]">Tahun ajaran</span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${item.active ? 'bg-[#DBFFEE] text-green-500' : 'bg-[#FEE2E2] text-red-400'}`}>
                  {item.active ? 'Aktif' : 'Nonaktif'}
                </span>
                
                <div className="relative">
                  <button onClick={() => setOpenDropdownId(openDropdownId === item.id ? null : item.id)} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50">
                    <MoreVertical size={20} />
                  </button>

                  {openDropdownId === item.id && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden py-1 animate-in fade-in zoom-in duration-100">
                      <button  onClick={() => handleAction('toggle_status', item)} disabled={item.active} className={`w-full text-left px-4 py-3 text-sm flex items-center gap-3 transition-colors
                        ${item.active ? 'opacity-50 cursor-not-allowed text-gray-400 bg-gray-50': 'hover:bg-gray-50 text-gray-700'}`}>
                        <Power size={16} className={item.active ? "text-red-500 cursor-disible" : "text-green-500"} />
                        {item.active ? 'Sudah Active' : 'Aktifkan'}
                      </button>
                      <div className="h-[1px] bg-gray-100 mx-2"></div>
                      <button  onClick={() => openDeleteConfirm(item)} className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 flex items-center gap-3 text-red-600">
                        <Trash2 size={16} /> Hapus Tahun Ajaran
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <h2 className="text-[28px] font-black text-gray-800 tracking-tight">Tahun {item.name}</h2>
          </div>
        ))}
      </div>
    )}

      <AddSchoolYearModal  isOpen={isModalOpen}  onClose={() => setIsModalOpen(false)}  onConfirm={handleAddNewYear} nextYear={getNextYear()}/>
      <ModalDelete  isOpen={confirmModal.show}  onConfirm={handleConfirmDelete}  onClose={() => setConfirmModal({ show: false, id: null, name: '' })}  isProcessing={isDeleting}/>

      <div className="flex justify-center items-center mt-12 gap-2 pb-10">
       <Pagination  page={pagination.current_page}  lastPage={pagination.last_page}  onPageChange={(page) => fetchSchoolYears(page,searchQuery)} />
      </div>
    
    </div>
  );
};

export default AcademicYearDashboard;
 