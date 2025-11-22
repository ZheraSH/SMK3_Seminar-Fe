import React, { useState } from 'react';
import { X } from 'lucide-react';

function AddLessonHourModal ({ isVisible, onClose, activeDay, addLesson }) {
 
    const [formData, setFormData] = useState({start_time: '', end_time: '', name: '',});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const startCleaned = formData.start_time.replace('.', ':');
        const endCleaned = formData.end_time.replace('.', ':');

        const dataToSend = {
            day: activeDay, 
            name: formData.name, 
            start: startCleaned, 
            end: endCleaned,
        };

        setIsSubmitting(true);
        try {
            const result = await addLesson(dataToSend);
            alert(result.message);
            onClose();
            setFormData({ start_time: '', end_time: '', name: '' });
            
        } catch (error) {
            const backendError = error.errors ? Object.values(error.errors).flat().join('\n') : error.message || 'Gagal menambahkan data. Periksa input Anda.';
            alert(`Gagal menambahkan data:\n${backendError}`);
            console.error('Error submitting lesson hour:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isVisible) return null;
    
    return (
        <div className="fixed inset-0 bg-gray-600/50 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-4 p-6 transform transition-all duration-300 scale-100">
                
                <div className="flex justify-between items-center mb-4 pb-3">
                    <h3 className="text-xl font-semibold text-gray-800">Tambah Jam Pelajaran</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                        <X size={24} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Mulai</label>
                                <input type="text"  name="start_time" value={formData.start_time} onChange={handleChange} placeholder="jam start" required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Jam Berakhir</label>
                                <input type="text" name="end_time"value={formData.end_time}onChange={handleChange}placeholder="jam end"required
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Jam Ke- / Penempatan</label>
                            <input type="text" name="name"value={formData.name}onChange={handleChange}placeholder="Jam Ke- atau Istirahat"required
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"/>
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button type="button" onClick={onClose} className="mr-3 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                            Batal
                        </button>
                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:bg-blue-300">
                            {isSubmitting ? 'Menyimpan...' : 'Tambah'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLessonHourModal;