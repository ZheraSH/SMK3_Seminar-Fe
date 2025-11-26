import React, { useState } from 'react';
import { X, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

function AddLessonHourModal ({ isVisible, onClose, activeDay, addLesson }) {
    
    const [formData, setFormData] = useState({start_time: '', end_time: '', name: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [validationErrors, setValidationErrors] = useState({});
    

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
    

    const getInputClass = (field) => {
        return `w-full p-2 border rounded-lg transition duration-150 ${
            validationErrors[field] 
                ? 'border-red-500 ring-1 ring-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        }`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const errors = {};
        let isValid = true;
        
        if (!formData.start_time.trim()) {
            errors.start_time = "Jam Mulai wajib diisi.";
            isValid = false;
        }
        if (!formData.end_time.trim()) {
            errors.end_time = "Jam Berakhir wajib diisi.";
            isValid = false;
        }
        if (!formData.name.trim()) {
            errors.name = "Penempatan wajib diisi.";
            isValid = false;
        }
        
        setValidationErrors(errors);

        if (!isValid) return;
        
        
        const dataToSend = {
            day: activeDay, 
            name: formData.name, 
            start: formData.start_time.replace('.', ':'), 
            end: formData.end_time.replace('.', ':'),
        };

        setIsSubmitting(true);
        try {
            const result = await addLesson(dataToSend);
            
            onClose();
            setFormData({ start_time: '', end_time: '', name: '' });

        } catch (error) {
            let backendError;
            if (error.errors) {
                backendError = Object.values(error.errors).flat().join('\n');
            } else {
                backendError = error.message || 'Gagal menambahkan data. Periksa input Anda.';
            }
            

            console.error('Error submitting lesson hour:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;
    

    return (
        <div className="fixed inset-0 bg-gray-600/50 flex items-center justify-center z-[1000] transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all duration-300 scale-100">
                
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800">Tambah Jam Pelajaran ({activeDay})</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition" disabled={isSubmitting}>
                        <X size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Mulai</label>
                                <input 
                                    type="text" 
                                    name="start_time" 
                                    value={formData.start_time} 
                                    onChange={handleChange} 
                                    placeholder="07.00 atau 07:00"
                                    className={getInputClass('start_time')} 
                                    disabled={isSubmitting}
                                />
                                {validationErrors.start_time && (
                                    <p className="mt-1 text-xs text-red-600">{validationErrors.start_time}</p>
                                )}
                            </div>
                            
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Berakhir</label>
                                <input 
                                    type="text" 
                                    name="end_time" 
                                    value={formData.end_time} 
                                    onChange={handleChange} 
                                    placeholder="07.45 atau 07:45"
                                    className={getInputClass('end_time')}
                                    disabled={isSubmitting}
                                />
                                {validationErrors.end_time && (
                                    <p className="mt-1 text-xs text-red-600">{validationErrors.end_time}</p>
                                )}
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jam Ke- / Penempatan</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={formData.name} 
                                onChange={handleChange} 
                                placeholder="Cth: Jam ke-1 atau Istirahat"
                                className={getInputClass('name')}
                                disabled={isSubmitting}
                            />
                            {validationErrors.name && (
                                <p className="mt-1 text-xs text-red-600">{validationErrors.name}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button 
                            type="button" 
                            onClick={onClose} 
                            disabled={isSubmitting}
                            className="mr-3 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button 
                            type="submit" 
                            disabled={isSubmitting} 
                            className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300 flex items-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...
                                </>
                            ) : (
                                'Tambah'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLessonHourModal;