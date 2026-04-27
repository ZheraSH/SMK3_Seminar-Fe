import React, { useState } from 'react';
import { Upload, FileText, X, CheckCircle2, AlertCircle } from 'lucide-react';

const FormImportStudent = ({ classroom, onImport, onClose, loading }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
            if (['xlsx', 'xls', 'csv'].includes(fileExtension)) {
                setFile(selectedFile);
                setError(null);
            } else {
                setFile(null);
                setError('Hanya file Excel (.xlsx, .xls) atau .csv yang diperbolehkan');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!file) {
            setError('Silakan pilih file terlebih dahulu');
            return;
        }

        try {
            const res = await onImport(file);
            if (res.success) {
                onClose();
            }
        } catch (err) {
            let msg = err.response?.data?.message || 'Gagal mengimport data siswa';

            if (msg.includes('Duplicate entry')) {
                msg = "Data sudah terdaftar di sistem. Mohon hapus data lama secara permanen sebelum import ulang.";
            } else if (msg.includes('SQLSTATE')) {
                msg = "Gagal: Terjadi duplikasi data atau kesalahan database.";
            }

            setError(msg);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className=" bg-blue-100/50 text-blue-500 border border-blue-300 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5" />
                <div className="text-sm">
                    <p>informasi</p>
                    <p>Siswa akan dimasukkan ke kelas <strong>{classroom?.name}</strong>.</p>
                </div>
            </div>

            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pilih File Excel
                </label>
                <div className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 text-center ${file ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-blue-400 bg-gray-50'
                    }`}>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        accept=".xlsx, .xls, .csv"
                    />

                    <div className="flex flex-col items-center">
                        {file ? (
                            <>
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                                    <FileText className="text-green-600" size={24} />
                                </div>
                                <p className="text-sm font-semibold text-green-800 truncate max-w-xs">
                                    {file.name}
                                </p>
                                <p className="text-xs text-green-600 mt-1">
                                    {(file.size / 1024).toFixed(2)} KB
                                </p>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                    className="mt-3 text-xs text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
                                >
                                    <X size={14} /> Hapus File
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                    <Upload className="text-blue-600" size={24} />
                                </div>
                                <p className="text-sm font-medium text-gray-700">
                                    Klik atau seret file ke sini
                                </p>
                                <p className="text-sm font-medium text-gray-700">
                                    format yang diperbolehkan: .xlsx, .xls, .csv
                                </p>
                                <p className="text-sm font-medium text-gray-700">
                                    ukuran maksimal : 5 MB
                                </p>
                            </>
                        )}
                    </div>
                </div>

                {error && (
                    <p className="mt-2 text-sm text-red-500 flex items-center gap-1 animate-shake">
                        {error}
                    </p>
                )}
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-200 font-medium text-sm"
                >
                    Batal
                </button>
                <button
                    type="submit"
                    disabled={!file || loading}
                    className={`flex-1 px-4 py-2.5 rounded-xl text-white font-medium text-sm transition duration-200 flex items-center justify-center gap-2 ${!file || loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200'
                        }`}
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Mengimport...
                        </>
                    ) : (
                        <>
                            <CheckCircle2 size={18} />
                            Mulai Import
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default FormImportStudent;
