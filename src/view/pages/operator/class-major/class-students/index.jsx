import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Search, ArrowUpSquare, RefreshCw, Plus, ArrowLeftToLine, X } from 'lucide-react';
import DataTable from './components/table-class-student';
import PaginationComponent from './components/pagination-component';
import FormStudents from "./components/form-class-student";
import FormImportStudent from "./components/form-import-student";
import useClassroomDetail from '@core/hooks/operator/class-major/use-classroom-detail';
import Header2 from "@elements/header/header-new-2";
import LoadingData from '@elements/loading-data/loading';

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

function ModalImportStudent({ open, onClose, classroom, onImport, loading }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-lg shadow-2xl p-6 animate-scaleIn relative">
                <button className="absolute right-4 top-4 text-gray-600" onClick={onClose}>
                    <X size={24} className='text-gray-400 hover:text-gray-600' />
                </button>
                <h2 className="text-start text-[20px] font-semibold mb-6 pr-10">
                    Import Siswa ke {classroom?.name}
                </h2>
                <FormImportStudent 
                    classroom={classroom} 
                    onImport={onImport} 
                    onClose={onClose} 
                    loading={loading} 
                />
            </div>
        </div>
    );
}

const ClassStudentsPage = () => {
    const location = useLocation();
    const classroomUUID = location.state?.classroomId;

    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [openImportModal, setOpenImportModal] = useState(false);
    const [search, setSearch] = useState("");

    const { classroom, students, paginationMeta, loading, studentsLoading, availableStudents, actionLoading, addStudents, removeStudent, fetchStudents, fetchAvailableStudents, fetchStudentDetail, selectedStudentDetail, detailLoading, importStudents } = useClassroomDetail(classroomUUID);

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            fetchStudents(1, search, search === "");
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
            <button className="flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg lg:text-[14px] text-[10px] gap-1 shadow-md whitespace-nowrap w-full md:w-auto">
                <ArrowLeftToLine size={16} /> Kembali
            </button>
        </Link>
    );


    const currentPage = paginationMeta?.current_page || 1;
    const totalPages = paginationMeta?.last_page || 1;
    return (
        <>
            <div className=" md:mb-2 mb-32">
                {loading ? (<LoadingData loading={loading} type='header1' />)
                    : (
                        <Header2 title={`Kelas - ${classroom?.name}`} teacher={classroom?.homeroom_teacher} studentCont={classroom?.total_students} academicYear={classroom?.school_year} src="/images/particle/particle3.png" />
                    )}
                {loading ? (<LoadingData loading={loading} type='create2' />)
                    : (
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
                            <div className="relative w-full md:max-w-sm">
                                <input type="text" placeholder="Cari Nama,NISN" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full py-2 pl-10 pr-4 rounded-full text-gray-700 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-700" />
                            </div>

                            <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-end gap-2 w-full md:w-auto">
                                <button onClick={onSyncClick} className="flex flex-row items-center justify-center px-4 py-2 bg-[#22C55E] rounded-lg transition duration-150 text-[10px] xl:text-[14px] text-white shadow-md whitespace-nowrap w-full md:w-auto">
                                    <RefreshCw size={16} className={`${isSyncing ? 'animate-spin' : ''}`} /><span className="ml-2">Sync</span>
                                </button>
                                <button onClick={() => setOpenModal(true)} className="flex items-center justify-center px-3 py-2 bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition duration-150 text-[10px] xl:text-[14px] text-white gap-2 shadow-md whitespace-nowrap w-full md:w-auto">
                                    <Plus size={16} /> Tambah Siswa
                                </button>
                                <button onClick={() => setOpenImportModal(true)} className="flex items-center justify-center px-3 py-2 bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition duration-150 text-[10px] xl:text-[14px] text-white gap-2 shadow-md whitespace-nowrap w-full md:w-auto">
                                    <Plus size={16} /> Import Siswa
                                </button>
                                <BackButton />
                            </div>
                        </div>
                    )}
                {loading ? (<LoadingData loading={loading} type='tableSiswaKaryawan' count={10} />
                ) : (
                    <>
                        <div className="h-4"></div>
                        {students.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10 w-full animate-in fade-in duration-500">
                                <img src="/images/null/nullimage.png" alt="Data Kosong" className="w-72 h-auto md:w-[400px] md:h-[285px] mb-6" />
                                <div className="text-center">
                                    <p className="text-gray-500 text-sm md:text-md text-center">
                                        Maaf yaaa.. datanya gaada, silahkan klik “Tambah Siswa” buat <br /> nambah data siswa ke kelas ini!
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <DataTable students={students} loading={studentsLoading} removeStudent={removeStudent} actionLoading={actionLoading} paginationMeta={paginationMeta} fetchStudentDetail={fetchStudentDetail} selectedStudentDetail={selectedStudentDetail} detailLoading={detailLoading} currentPage={currentPage} />
                                {totalPages > 1 && (
                                    <div className="mt-4 flex justify-center">
                                        <PaginationComponent currentPage={paginationMeta.current_page} totalPages={paginationMeta.last_page} onPageChange={handlePageChange} />
                                    </div>
                                )}
                            </>
                        )}
                        <ModalAddStudent open={openModal} onClose={() => setOpenModal(false)} classroom={classroom} availableStudents={availableStudents} addStudents={addStudents} />
                        <ModalImportStudent open={openImportModal} onClose={() => setOpenImportModal(false)} classroom={classroom} onImport={importStudents} loading={actionLoading} />
                    </>
                )}
            </div>
        </>
    );
};
export default ClassStudentsPage;

