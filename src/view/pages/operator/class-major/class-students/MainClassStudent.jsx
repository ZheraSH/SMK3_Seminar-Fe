import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate ,Link} from "react-router-dom";
import { Search,ArrowUpSquare, RefreshCw, Plus, ArrowLeftToLine, X } from 'lucide-react'; 
import DataTable from './components/TableClassStudent'; 
import PaginationComponent from './components/PaginationComponent';
import FormStudents from "./components/FormClassStudent"; 
import useClassroomDetail from '../../../../../Core/hooks/operator-hooks/class-major/useClassroomDetail';
import Header2 from "../../../../components/elements/header/Header-new2";
import LoadingData from '../../../../components/elements/loadingData/loading';

function ModalAddStudent({ open, onClose, classroom, availableStudents, addStudents }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-4"> 
            <div className="bg-white rounded-xl w-full max-w-lg sm:w-[418px] shadow-2xl p-6 animate-scaleIn relative">
                <button className="absolute right-4 top-4 text-gray-600" onClick={onClose}>
                    <X size={24} className='text-gray-400 hover:text-gray-600' />
                </button>
                <h2 className="text-start text-[24px]  font-semibold mb-6 pr-10 gap-2">
                    Tambah Siswa - {classroom?.name} 
                </h2>
                <FormStudents classroom={classroom} onClose={onClose} availableStudents={availableStudents} addStudents={addStudents} />
            </div>
        </div>
    );
}

const ClassStudents = () => {
    // const { id } = useParams(); 
    const location = useLocation(); 
    const classroomUUID = location.state?.classroomId;

    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [search, setSearch] = useState("");

    const { classroom, students, paginationMeta,loading,studentsLoading,availableStudents, actionLoading,addStudents,removeStudent,fetchStudents,fetchAvailableStudents,fetchStudentDetail, selectedStudentDetail,detailLoading,} = useClassroomDetail(classroomUUID);

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

    const [isSyncing, setIsSyncing] = useState(false);

    const onSyncClick = () => {
        setIsSyncing(true);
        if (handleSync) handleSync();
        
        setTimeout(() => {
            setIsSyncing(false);
        }, 2000);
    };

    const BackButton = () => (
        <Link to="/home/class">
            <button className="flex items-center justify-center lg:w-[130px] md:w-[87px] w-full px-3 py-2 border border-gray-300 rounded-lg lg:text-[14px] text-[10px]  gap-1 shadow-md ">
                <ArrowLeftToLine size={16}/> Kembali
            </button>
        </Link>
    );


    const currentPage = paginationMeta?.current_page || 1;
    const totalPages = paginationMeta?.last_page || 1;
    return (
        <>
            <div className=" md:mb-2 mb-32">
                {loading? (<LoadingData loading={loading} type='header1' />)
                :(
                    <Header2 title = {`Kelas - ${classroom?.name}`} teacher= {classroom?.homeroom_teacher} studentCont = {classroom?.total_students} academicYear={classroom?.school_year} src="/images/particle/particle3.png"/>
                )}
                {loading? (<LoadingData loading={loading} type='create2' />) 
                : (
                    <div className="flex items-center justify-between pt-4 md:flex-row flex-col ">
                        <div className="relative flex-grow md:max-w-sm w-full">
                            <input type="text" placeholder="Cari Nama,NISN" value={search}  onChange={(e) => setSearch(e.target.value)} className="w-full py-2 pl-10 pr-4 rounded-full text-gray-700 border border-gray-300 "/>
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700" />
                        </div>

                        <div className="flex xl:space-x-3 sm:space-x-3 lg:flex-row md:flex-row flex-col justify-end w-full md:mt-0 mt-4 font-medium w-full">
                            <div className='flex flex-row gap-2 mb-2 lg:mb-0 md:mb-0'>
                                <button onClick={onSyncClick} className="flex flex-row items-center px-4 py-2 bg-[#22C55E] rounded-lg transition duration-150 text-[10px] xl:text-[14px] text-white shadow-md">
                                    <RefreshCw size={16} className={`${isSyncing ? 'animate-spin' : ''}`}/><span className="hidden md:inline ml-2">Sync</span>
                                </button>
                                 <button onClick={() => setOpenModal(true)} className="flex items-center justify-center w-full px-3 md:py-2 bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition duration-150 text-[10px] xl:text-[14px]  text-white gap-2 shadow-md">
                                    <Plus size={16}/> Tambah Siswa
                                </button>
                                <BackButton />
                            </div>
                            
                        </div>
                    </div>
                )}
                {loading? (<LoadingData loading={loading} type='tableSiswaKaryawan' count={10} />
                ) : (
                    <>
                        <div className="h-4"></div> 
                        {students.length === 0 ? (
                             <div className="flex flex-col items-center justify-center py-20 w-full animate-in fade-in duration-500">
                                <img src="/images/null/nullimage.png" alt="Data Kosong" className="w-48 h-auto md:w-[400px] md:h-[285px] mb-6" />
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm md:text-md text-center">
                                        Maaf yaaa.. datanya gaada, silahkan klik “Tambah Siswa” buat <br /> nambah data siswa ke kelas ini!
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <DataTable  students={students} loading={studentsLoading} removeStudent={removeStudent} actionLoading={actionLoading} paginationMeta={paginationMeta} fetchStudentDetail={fetchStudentDetail} selectedStudentDetail={selectedStudentDetail} detailLoading={detailLoading} currentPage={currentPage}/>
                                {totalPages > 1 && (
                                    <div className="mt-4 flex justify-center">
                                        <PaginationComponent currentPage={paginationMeta.current_page} totalPages={paginationMeta.last_page} onPageChange={handlePageChange}/>
                                    </div>
                                )}
                            </>
                        )}
                        <ModalAddStudent open={openModal} onClose={() => setOpenModal(false)} classroom={classroom} availableStudents={availableStudents}addStudents={addStudents}/>
                    </>
                )}
            </div>
        </>
    );
};
export default ClassStudents;
