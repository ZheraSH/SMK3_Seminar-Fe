import React, { useState, useRef, useEffect } from 'react';
import { X, Loader2, ChevronRight } from 'lucide-react'; 
import useMasterSchedule from "../../../../../Core/hooks/operator-hooks/schedule/useMasterSchedule"; 

const CustomSelect = ({ label, id, name, value, options, onChange, placeholder = "Pilih...", error, disabled,getDisplayLabel }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    const selectedOption = options.find(option => String(option.id) === String(value));
    const displayLabel = selectedOption ? getDisplayLabel(selectedOption) : '';
    const displayOptions = options;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionId) => {
        onChange({ target: { name, value: optionId } });
        setIsOpen(false);
    };

    const handleInputClick = () => {
        if (!disabled) {
            setIsOpen(prev => !prev);
        }
    };
    
    const handleClear = (e) => {
        e.stopPropagation(); 
        onChange({ target: { name, value: '' } });
    }

    const inputClass = `w-full border rounded-lg h-11 px-3 text-gray-900 transition duration-150 flex items-center justify-between cursor-pointer bg-white ${
        error 
            ? 'border-red-500 ring-1 ring-red-500' 
            : 'border-gray-300 focus-within:border-blue-500 focus-within:ring-blue-500'
    } ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`;

    return (
        <div className="relative" ref={containerRef}>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <div  className={inputClass} onClick={handleInputClick} aria-expanded={isOpen}>
                <span className={`flex-1 truncate ${displayLabel ? 'text-gray-900' : 'text-gray-500'}`}>
                    {displayLabel || placeholder}
                </span>
                <div className='flex items-center space-x-2'>
                    {displayLabel && !disabled && (
                        <button type="button" onClick={handleClear} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"aria-label="Hapus pilihan">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                    <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-90' : 'rotate-0'}`} />
                </div>
            </div>

            {error && (
                <p className="mt-1 text-sm text-red-600">{error}</p>
            )}

            {isOpen && !disabled && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    <ul className="py-1">
                        {displayOptions.length > 0 ? (
                            displayOptions.map((option) => (
                                <li key={option.id} className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
                                        String(option.id) === String(value) ? 'bg-blue-100 font-semibold' : ''}`} onClick={() => handleSelect(option.id)}>
                                    {getDisplayLabel(option)}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-sm text-gray-500">
                                Tidak ada pilihan tersedia.
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

function AddScheduleModal({ isOpen, onClose, initialData, activeDayApi, classroomId, handleSave }) { 

    const { subjects, teachers, lessons, isLoading: isMasterLoading, error: masterError } = useMasterSchedule(activeDayApi); 

    const [formData, setFormData] = useState({id: null,subject_id: '',teacher_id: '',lesson_hour_id: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const isEditMode = !!initialData && !!initialData.id;
    const resetForm = () => {
        setFormData({ id: null, subject_id: '', teacher_id: '', lesson_hour_id: ''});
        setValidationErrors({});
        setSubmitError(null);
    };

    useEffect(() => {
        if (isOpen) {
            if (initialData && subjects.length > 0) {
                const s_id = initialData.subject_id || subjects.find(s => s.name === initialData.subject?.name)?.id;
                const t_id = initialData.teacher_id || teachers.find(t => t.name === initialData.teacher?.name)?.id;
                const l_id = initialData.lesson_hour_id || lessons.find(l => l.name === initialData.lesson_hour?.name)?.id;
                setFormData({ id: initialData.id, subject_id: s_id || '', teacher_id: t_id || '', lesson_hour_id: l_id || '',});
            } else if (!initialData) {
                setFormData({ id: null, subject_id: '', teacher_id: '', lesson_hour_id: ''});
            }
        }
    }, [initialData, isOpen, subjects, teachers, lessons]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
        
        setValidationErrors(prev => ({
            ...prev,
            [name]: '', 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = {};
        let isValid = true;

        if (!formData.subject_id) {
            errors.subject_id = "Mata pelajaran wajib dipilih.";
            isValid = false;
        }
        if (!formData.teacher_id) {
            errors.teacher_id = "Guru pengajar wajib dipilih.";
            isValid = false;
        }
        if (!formData.lesson_hour_id) {
            errors.lesson_hour_id = "Jam/Penempatan wajib dipilih.";
            isValid = false;
        }

        setValidationErrors(errors);
        if (!isValid) {
            setSubmitError(null);
            return;
        }
        
        setIsSubmitting(true);
        setSubmitError(null);

        let dataToSave = {
            classroom_id: classroomId, 
            day: activeDayApi, 
            subject_id: formData.subject_id,
            teacher_id: formData.teacher_id,
            lesson_hour_id: formData.lesson_hour_id,
        };

        if (isEditMode) {
            dataToSave.id = formData.id; 
        }

        try {
            await handleSave(dataToSave, isEditMode);
            if (!isEditMode) {
                resetForm();
            } 
            onClose();
        } catch (error) {
            const errorMessage = error?.message || error?.error || "Gagal menyimpan jadwal. Coba periksa input atau server.";
            setSubmitError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };
    
    const modalTitle = isEditMode ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran Baru";
    const submitButtonLabel = isEditMode ? "Simpan Perubahan" : "Tambah";

    if (!isOpen) return null;

    if (isMasterLoading) {
        return (
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4 ">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 flex items-center justify-center  ">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" /> Memuat data master...
                </div>
            </div>
        );
    }
    
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-fade-in mb-20">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">{modalTitle}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                {(submitError || masterError) && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {submitError || masterError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <CustomSelect label="Mata Pelajaran" id="subject_id" name="subject_id" value={formData.subject_id} options={subjects} onChange={handleChange} placeholder="Pilih Mata Pelajaran" error={validationErrors.subject_id} disabled={isSubmitting} getDisplayLabel={(subject) => subject.name}/>
                        <CustomSelect label="Guru Pengajar" id="teacher_id" name="teacher_id" value={formData.teacher_id} options={teachers} onChange={handleChange} placeholder="Pilih Guru Pengajar" error={validationErrors.teacher_id} disabled={isSubmitting} getDisplayLabel={(teacher) => teacher.name}/>
                        <CustomSelect label="Jam Ke / Penempatan" id="lesson_hour_id" name="lesson_hour_id" value={formData.lesson_hour_id} options={lessons} onChange={handleChange} placeholder="Pilih Jam Ke / Penempatan" error={validationErrors.lesson_hour_id} disabled={isSubmitting} getDisplayLabel={(lesson) => `${lesson.name} (${lesson.start_time} - ${lesson.end_time})`}/>
                    </div>
                    <div className="flex justify-end mt-6">
                        <button type="submit" className="px-5 py-2 text-sm font-semibold rounded-lg text-white bg-[#3B82F6] hover:bg-[#2563EB]  shadow-md flex items-center" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {submitButtonLabel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddScheduleModal;