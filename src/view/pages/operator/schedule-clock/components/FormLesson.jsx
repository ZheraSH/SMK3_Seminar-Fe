import React, { useState, useEffect, useRef } from 'react';
import { X, Loader2, AlertTriangle, ChevronRight, BookOpen, Coffee } from 'lucide-react';

const ErrorModal = ({ show, title, message, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-600/70 flex items-center justify-center z-[1100]">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm mx-4 p-6 transform transition-all duration-300 scale-100 border-t-4 border-red-500">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                        <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
                        <h3 className="text-xl font-semibold text-red-600">{title}</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <X size={20} />
                    </button>
                </div>
                <p className="text-sm text-gray-700 mt-2">{message}</p>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

function AddLessonHourModal({ isVisible, onClose, activeDay, addLesson, activeDayDisplay, updateLesson, initialData }) {

    const [formData, setFormData] = useState({ start_time: '', end_time: '', name: 'Jam ke -' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [errorModal, setErrorModal] = useState({ show: false, title: '', message: '' });
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const isEditMode = !!initialData;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (isVisible) {
            if (initialData) {
                setFormData({
                    start_time: initialData.start_time || '',
                    end_time: initialData.end_time || '',
                    name: initialData.name || 'Jam ke -'
                });
            } else {
                setFormData({ start_time: '', end_time: '', name: '' });
            }
            setValidationErrors({});
            setIsOpen(false);
        }
    }, [initialData, isVisible]);

    useEffect(() => {
        if (!isVisible) {
            setFormData({ start_time: '', end_time: '', name: '' });
            setValidationErrors({});
        }
    }, [isVisible]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setValidationErrors(prev => ({
            ...prev,
            [e.target.name]: '',
        }));
    };

    const handleSelect = (val) => {
        setFormData({ ...formData, name: val });
        setValidationErrors(prev => ({ ...prev, name: '' }));
        setIsOpen(false);
    };

    const handleCloseErrorModal = () => {
        setErrorModal({ show: false, title: '', message: '' });
    };

    const getInputClass = (field) => {
        return `w-full p-2 border rounded-lg transition duration-150 outline-none  ${validationErrors[field]
                ? 'border-red-500 ring-1 ring-red-500'
                : 'border-gray-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
            }`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!formData.start_time.trim()) errors.start_time = "Jam Mulai wajib diisi.";
        if (!formData.end_time.trim()) errors.end_time = "Jam Berakhir wajib diisi.";
        if (!formData.name) errors.name = "Penempatan wajib dipilih.";

        setValidationErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const isLessonValue = formData.name === 'Jam ke -' ? "true" : "false";

        const dataToSend = {
            day: activeDay,
            name: formData.name,
            start: formData.start_time.replace('.', ':'),
            end: formData.end_time.replace('.', ':'),
            is_lesson: isLessonValue
        };

        setIsSubmitting(true);
        try {
            if (isEditMode) {
                await updateLesson(initialData.id, dataToSend);
            } else {
                await addLesson(dataToSend);
            }
            onClose();
        } catch (error) {
            let errorMessage = error.response?.data?.message || 'Gagal menyimpan data.';
            setErrorModal({ show: true, title: 'Gagal Simpan', message: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-[1000] transition-opacity duration-300">
            <ErrorModal show={errorModal.show} title={errorModal.title} message={errorModal.message} onClose={handleCloseErrorModal} />
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all duration-300 scale-100">

                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800">{isEditMode ? 'Edit Jam Pelajaran' : 'Tambah Jam Pelajaran'} </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition" disabled={isSubmitting}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Mulai</label>
                                <input type="text" name="start_time" value={formData.start_time} onChange={handleChange} placeholder="07.00" className={getInputClass('start_time')} disabled={isSubmitting} />
                                {validationErrors.start_time && (
                                    <p className="mt-1 text-xs text-red-600">{validationErrors.start_time}</p>
                                )}
                            </div>

                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Berakhir</label>
                                <input type="text" name="end_time" value={formData.end_time} onChange={handleChange} placeholder="07.45" className={getInputClass('end_time')} disabled={isSubmitting} />
                                {validationErrors.end_time && (
                                    <p className="mt-1 text-xs text-red-600">{validationErrors.end_time}</p>
                                )}
                            </div>
                        </div>

                        <div className="relative" ref={dropdownRef}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jam Ke- / Penempatan</label>
                            <div onClick={() => !isSubmitting && setIsOpen(!isOpen)} className={`w-full p-2 border rounded-lg bg-white flex justify-between items-center cursor-pointer transition duration-150 ${validationErrors.name ? 'border-red-500 ring-1 ring-red-500' :
                                    isOpen ? 'border-gray-300 ring-1 ring-blue-500' : 'border-gray-300'}`}>
                                <span className={`flex items-center gap-2 ${formData.name ? 'text-gray-800' : 'text-gray-400'}`}>
                                    {formData.name === 'Istirahat' && <Coffee size={16} className="text-orange-500" />}
                                    {formData.name === 'Jam ke -' && <BookOpen size={16} className="text-blue-500" />}
                                    {formData.name || 'Pilih Penempatan'}
                                </span>
                                <ChevronRight size={18} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                            </div>

                            {validationErrors.name && (
                                <p className="mt-1 text-xs text-red-600">{validationErrors.name}</p>
                            )}

                            {isOpen && (
                                <div className="absolute z-[1050] w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                                    <div onClick={() => handleSelect('Jam ke -')} className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 border-b border-gray-50">
                                        <BookOpen size={18} className="text-blue-500" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-700">Jam ke -</span>
                                            <span className="text-[10px] text-gray-400 italic">Otomatis urut oleh sistem</span>
                                        </div>
                                    </div>
                                    <div onClick={() => handleSelect('Istirahat')} className="px-4 py-3 hover:bg-orange-50 cursor-pointer flex items-center gap-3">
                                        <Coffee size={18} className="text-orange-500" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium text-gray-700">Istirahat</span>
                                            <span className="text-[10px] text-gray-400 italic">Waktu jeda istirahat</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition disabled:bg-blue-300 flex items-center">
                            {isSubmitting ? (
                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...</>
                            ) : (
                                isEditMode ? 'Simpan Perubahan' : 'Tambah'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLessonHourModal;