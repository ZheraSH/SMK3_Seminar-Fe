import React, { useState, useEffect } from 'react';
import { X, ChevronRight, Check, User, School, ArrowUpSquare, RefreshCw } from 'lucide-react';

function ModalPromoteClass({ open, onClose, classroom, teachers, teachersLoading, onPromote, loading }) {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);
    const [error, setError] = useState("");
    
    useEffect(() => {
        if (!open) {
            setSelectedTeacher(null);
            setIsOpenDropdown(false);
            setError("");
        }
    }, [open]);

    if (!open) return null;

    const filteredTeachers = teachers?.filter(t => 
        t.roles?.some(r => r.value === 'homeroom_teacher')
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        
        if (!selectedTeacher) {
            setError("Silahkan pilih wali kelas terlebih dahulu");
            return;
        }

        try {
            await onPromote(selectedTeacher.id);
        } catch (err) {
            setError(err.message || "Terjadi kesalahan saat memproses kenaikan kelas");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 -mt-14 md:-mt-0 p-4 transition-all duration-300 overflow-y-auto">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-scaleIn relative border border-gray-100 my-auto sm:my-0">
                <div className=" px-6 py-4 relative rounded-t-2xl">
                    <button className="absolute right-4 top-4  hover:text-red-700 transition-colors" onClick={onClose}>
                        <X size={24} />
                    </button>
                    <h2 className=" text-xl font-semibold flex items-center gap-2">
                        Konfirmasi Kenaikan Kelas
                    </h2>
                </div>

                <div className="p-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
                        <h3 className="text-blue-800 font-semibold mb-3 flex items-center gap-2">
                            <School size={18} />
                            Informasi
                        </h3>
                        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                            Penting: Anda akan menaikkan tingkat seluruh siswa aktif di kelas {classroom?.name} secara massal. Proses ini akan memindahkan data mereka ke tahun ajaran berikutnya.
                        </p>
                    </div>

                    
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="relative">
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <User size={16} className="text-gray-400" />
                                Pilih Wali Kelas Baru
                            </label>
                            
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => !teachersLoading && setIsOpenDropdown(!isOpenDropdown)}
                                    disabled={teachersLoading}
                                    className={`w-full flex items-center justify-between p-3 bg-white border-2 rounded-xl transition-all duration-200 outline-none
                                        ${isOpenDropdown ? 'border-blue-500 ring-4 ring-blue-50/50' : 'border-gray-200 hover:border-gray-300'}
                                        ${teachersLoading ? 'bg-gray-50 cursor-not-allowed' : 'cursor-pointer'}
                                    `}
                                >
                                    {teachersLoading ? (
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <RefreshCw size={18} className="animate-spin" />
                                            <span>Memuat data guru...</span>
                                        </div>
                                    ) : (
                                        <span className={selectedTeacher ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                                            {selectedTeacher ? selectedTeacher.name : '-- Pilih Wali Kelas --'}
                                        </span>
                                    )}
                                    <ChevronRight size={20} className={`text-gray-400 transition-transform duration-200 ${isOpenDropdown ? 'rotate-90' : ''}`} />
                                </button>

                                {isOpenDropdown && (
                                    <div className="absolute z-[100] w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto animate-fadeIn py-1">
                                        {filteredTeachers?.length > 0 ? (
                                            filteredTeachers.map((t) => (
                                                <button
                                                    key={t.id}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedTeacher(t);
                                                        setIsOpenDropdown(false);
                                                        setError("");
                                                    }}
                                                    className={`w-full flex items-center justify-between px-4 py-3 hover:bg-blue-50 transition-colors group
                                                        ${selectedTeacher?.id === t.id ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}
                                                    `}
                                                >
                                                    <span className="font-medium group-hover:text-blue-600">{t.name}</span>
                                                    {selectedTeacher?.id === t.id && <Check size={18} />}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="p-4 text-center text-gray-400 text-sm">
                                                Tidak ada data wali kelas tersedia
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            
                            {error && (
                                <p className="text-red-500 text-xs mt-2 flex items-center gap-1 font-medium bg-red-50 p-2 rounded-lg border border-red-100">
                                    <X size={14} className="bg-red-500 text-white rounded-full p-0.5" />
                                    {error}
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4">
                            <button  type="button" onClick={onClose} className="flex-1 px-6 py-3 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition duration-150 border border-gray-200">
                                Batalkan
                            </button>
                            <button type="submit" disabled={loading || teachersLoading} className={`flex-[2] px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 flex items-center justify-center gap-2
                                    ${(loading || teachersLoading) ? 'opacity-50 cursor-not-allowed !translate-y-0 shadow-none' : ''}`}>
                                {loading ? (
                                    <>
                                        <RefreshCw size={20} className="animate-spin" />
                                        <span>Memproses...</span>
                                    </>
                                ) : (
                                    <>
                                        <ArrowUpSquare size={20} />
                                        <span>Proses Naik Kelas</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalPromoteClass;
