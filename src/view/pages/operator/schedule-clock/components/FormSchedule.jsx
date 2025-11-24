import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import useMasterSchedule from "../../../../../Core/hooks/OperatorHooks/schedule/useMasterSchedule"; 

function AddScheduleModal({ isOpen, onClose, initialData, activeDayApi, classroomId, handleSave }) { 

    const { subjects, teachers, lessons, isLoading: isMasterLoading, error: masterError } = useMasterSchedule(activeDayApi); 

    const [formData, setFormData] = useState({id: null,subject_id: '',teacher_id: '',lesson_hour_id: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});

    const isEditMode = !!initialData && !!initialData.id;

    useEffect(() => {
        setSubmitError(null);
        setValidationErrors({});

        if (initialData && isOpen && subjects.length > 0 && teachers.length > 0 && lessons.length > 0) {
            const selectedSubject = subjects.find(
                s => s.name === initialData.subject
            );
            const selectedTeacher = teachers.find(
                t => t.name === initialData.subject_teacher
            );
            const selectedLessonHour = lessons.find(
                l => l.name === initialData.placement 
            );

            setFormData({
                id: initialData.id,
                subject_id: selectedSubject ? selectedSubject.id : '', 
                teacher_id: selectedTeacher ? selectedTeacher.id : '',
                lesson_hour_id: selectedLessonHour ? selectedLessonHour.id : '',
            });

        } else if (!initialData && isOpen) {
            setFormData({ id: null, subject_id: '',  teacher_id: '',  lesson_hour_id: ''});
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
            employee_id: formData.teacher_id,
            lesson_hour_id: formData.lesson_hour_id,
        };

        if (isEditMode) {
            dataToSave.id = formData.id; 
        }

        try {
            await handleSave(dataToSave, isEditMode); 
            const successMessage = isEditMode ? "✅ Jadwal berhasil diperbarui!" : "✅ Jadwal baru berhasil ditambahkan!";
            
        alert(successMessage);
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
            <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 flex items-center justify-center">
                    <Loader2 className="w-6 h-6 animate-spin text-blue-600 mr-2" /> Memuat data master...
                </div>
            </div>
        );
    }
    
    const getSelectClass = (field) => {
        return `w-full border rounded-lg h-11 px-3 text-gray-900 transition duration-150 ${
            validationErrors[field] 
                ? 'border-red-500 ring-1 ring-red-500' 
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
        }`;
    };
    
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000] p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-fade-in">
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
                        <div>
                            <label htmlFor="subject_id" className="block text-sm font-medium text-gray-700 mb-1">Mata Pelajaran</label>
                            <select id="subject_id" name="subject_id" value={formData.subject_id} onChange={handleChange}
                                className={getSelectClass('subject_id')}
                                disabled={isSubmitting}>
                                <option value="" disabled>Pilih Mata Pelajaran</option>
                                {subjects.map(subject => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                            {validationErrors.subject_id && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.subject_id}</p>
                            )}
                        </div>
                        <div>
                            <label htmlFor="teacher_id" className="block text-sm font-medium text-gray-700 mb-1">Guru Pengajar</label>
                            <select id="teacher_id" name="teacher_id"  value={formData.teacher_id} onChange={handleChange}
                                className={getSelectClass('teacher_id')}
                                disabled={isSubmitting}>
                                <option value="" disabled>Pilih Guru Pengajar</option>
                                {teachers.map(teacher => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {teacher.name}
                                    </option>
                                ))}
                            </select>
                            {validationErrors.teacher_id && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.teacher_id}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="lesson_hour_id" className="block text-sm font-medium text-gray-700 mb-1">Jam Ke / Penempatan</label>
                            <select id="lesson_hour_id" name="lesson_hour_id" value={formData.lesson_hour_id} onChange={handleChange}
                                className={getSelectClass('lesson_hour_id')}
                                disabled={isSubmitting}>
                                <option value="" disabled>Pilih Jam Ke / Penempatan</option>
                                {lessons.map(lesson => (
                                    <option key={lesson.id} value={lesson.id}>
                                        {lesson.name} ({lesson.start_time} - {lesson.end_time})
                                    </option>
                                ))}
                            </select>
                            {validationErrors.lesson_hour_id && (
                                <p className="mt-1 text-sm text-red-600">{validationErrors.lesson_hour_id}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold rounded-lg text-gray-600 hover:bg-gray-100 mr-3" disabled={isSubmitting}>
                            Batal
                        </button>
                        <button type="submit" className="px-5 py-2 text-sm font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-md flex items-center" disabled={isSubmitting}>
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