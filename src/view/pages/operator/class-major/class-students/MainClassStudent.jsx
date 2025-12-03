import React, { useState, useEffect } from 'react';
import { useParams, useNavigate ,Link} from "react-router-dom";
import { Search, Users, UserCheck2, Calendar, GraduationCap, RefreshCw, Plus, ArrowLeft, X } from 'lucide-react'; 
import DataTable from './components/TableClassStudent'; 
import PaginationComponent from './components/PaginationComponent';
import FormStudents from "./components/FormClassStudent"; 
import useClassroomDetail from '../../../../../Core/hooks/operator-hooks/class-major/useClassroomDetail';

function ModalAddStudent({ open, onClose, classroom, availableStudents, addStudents }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"> 
            <div className="bg-white rounded-xl w-full max-w-lg sm:w-[418px] shadow-2xl p-6 animate-scaleIn relative">

                <button className="absolute right-4 top-4 text-gray-600" onClick={onClose}>
                    <X size={24} className='text-gray-400 hover:text-gray-600' />
                </button>

                <h2 className="text-start text-lg font-semibold mb-4 pr-10">
                    Tambah Siswa Ke Kelas <br /> <span className='text-xl  font-semibold'>“ {classroom?.name} ”</span>
                </h2>
                <FormStudents classroom={classroom} onClose={onClose} availableStudents={availableStudents} addStudents={addStudents} />
            </div>
        </div>
    );
}

const ClassStudents = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");

    const { 
        classroom, 
        students, 
        paginationMeta,
        loading,
        studentsLoading,
        availableStudents, 
        actionLoading,
        addStudents,
        removeStudent,
        fetchStudents, // Fungsi yang sudah dimodifikasi di hook
        fetchAvailableStudents,
        fetchStudentDetail, 
        selectedStudentDetail,
        detailLoading,
        
    } = useClassroomDetail(id);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchStudents(1, search); 
        }, 500);

        return () => clearTimeout(delaySearch);
    }, [search, fetchStudents]); 

    const handlePageChange = (newPage) => {
        fetchStudents(newPage, search);
    };

    const handleSync = () => {
        const currentPage = paginationMeta?.current_page || 1;
        fetchStudents(currentPage, search); 
        fetchAvailableStudents();
    };

const BackButton = () => (
        <Link to="/home/class">
            <button 
            // onClick={() => navigate(-1)} 
           className="flex items-center justify-center px-3 py-2 border border-[#FF5E53] rounded-lg transition duration-150 text-xs sm:text-sm text-[#FF5E53] gap-1 shadow-md  w-auto"
        >
            <ArrowLeft size={16}/> Kembali
        </button>
        </Link>
    );

     if (loading && !classroom) return <div className="p-10">Loading Detail Kelas...</div>;
    
    if (!classroom) {
        return (
            <div className="p-10">
                <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-xl font-bold text-red-500'>Data Kelas Tidak Ditemukan</h2>
                    <BackButton />
                </div>
                <p className='text-gray-600'>ID kelas yang diminta mungkin tidak valid atau sudah dihapus.</p>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen p-2">
                <div className="md:max-w-7xl w-full mx-auto md:mb-2 mb-32">
                    <div className="relative w-full h-[142px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] mb-4">
                        <div className="flex justify-between items-center mb-6 text-white">
                            <div>
                                <span className='text-center flex flex-row gap-3 text-xl font-semibold ml-4 mt-4'>
                                    <GraduationCap size={25}/>
                                    {classroom?.name}
                                </span>
                                <p className="ml-5 text-sm">Kelas - {classroom?.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-8 text-blue-200 mt-10 ml-4">
                            <div className="flex items-center space-x-2">
                                <UserCheck2 size={20}/>
                                <span className='text-sm text-center'>{classroom?.homeroom_teacher?.name}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users size={20}/>
                                <span className='text-sm text-center'>{classroom?.statistics.total_students}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar size={20}/>
                                <span className='text-sm text-center'>{classroom?.school_year?.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between md:space-x-4 pt-4 md:flex-row flex-col">
                        <div className="relative flex-grow md:max-w-sm w-full">
                            <input type="text" placeholder="Cari Nama/NISN" value={search} 
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full py-2 pl-10 pr-4 rounded-full text-gray-700 border border-gray-800 "
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700" />
                        </div>

                        <div className="flex lg:space-x-3 space-x-3  md:mt-0 mt-4">
                            <button onClick={handleSync} className="flex items-center px-4 md:py-2 bg-[#FACC15] rounded-lg transition duration-150 text-[10px] text-[14px] text-white gap-2 shadow-md">
                                <RefreshCw size={16}/> Sync
                            </button>
                            <button onClick={() => setOpenModal(true)} className="flex items-center px-4 md:py-2 bg-[#3B82F6] rounded-lg transition duration-150 text-[10px] lg:text-[14px]  text-white gap-2 shadow-md">
                                <Plus size={16}/> Tambah Siswa
                            </button>
                           <BackButton />
                        </div>
                    </div>

                    <div className="h-4"></div> 

                    <DataTable  students={students} loading={studentsLoading} removeStudent={removeStudent} actionLoading={actionLoading} paginationMeta={paginationMeta} fetchStudentDetail={fetchStudentDetail} selectedStudentDetail={selectedStudentDetail} detailLoading={detailLoading}/>
                    
                    {paginationMeta && paginationMeta.last_page > 1 && (
                        <div className="mt-4 flex justify-center">
                            <PaginationComponent currentPage={paginationMeta.current_page} totalPages={paginationMeta.last_page} onPageChange={handlePageChange}/>
                        </div>
                    )}

                    <ModalAddStudent open={openModal} onClose={() => setOpenModal(false)} classroom={classroom} availableStudents={availableStudents}addStudents={addStudents}/>
                </div>
            </div>
        </>
    );
};
export default ClassStudents;