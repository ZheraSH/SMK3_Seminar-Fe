import React, { useState } from 'react';
import { Upload, FileText, X, CheckCircle2 } from 'lucide-react';

const FormImportTeacher = ({ onImport, onClose, loading }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [importErrors, setImportErrors] = useState([]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (!(selectedFile instanceof File)) {
                setError('Upload harus berupa file.');
                setFile(null);
                e.target.value = '';
                return;
            }

            const allowedExtensions = ['xlsx', 'xls', 'csv'];
            const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension)) {
                setError('Format file harus berupa xlsx, xls, atau csv.');
                setFile(null);
                e.target.value = '';
                return;
            }

            if (selectedFile.size > 5 * 1024 * 1024) {
                setError('Ukuran file maksimal 5MB.');
                setFile(null);
                e.target.value = '';
                return;
            }

            setFile(selectedFile);
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!file) {
            setError('File Excel wajib di-upload.');
            return;
        }

        try {
            const res = await onImport(file);
            if (res.success && res.hasErrors) {
                setImportErrors(res.data.errors || []);
            } else if (res.success) {
                onClose();
            }
        } catch (err) {
            let errorMsg = 'Gagal mengimport data guru. Silakan periksa kembali file Anda.';
            
            if (err.response?.data?.errors) {
                const firstError = Object.values(err.response.data.errors)[0];
                if (Array.isArray(firstError)) {
                    errorMsg = firstError[0];
                } else if (typeof firstError === 'string') {
                    errorMsg = firstError;
                }
                setError(errorMsg);
            } else if (err.response?.data?.message && err.response.data.message !== 'The given data was invalid.') {
                let rawMsg = err.response.data.message;
                if (rawMsg.includes('Duplicate entry')) {
                    let friendlyMsg = 'Terdapat data ganda yang sudah terdaftar.';
                    let kolom = 'Data';
                    if (rawMsg.includes('users_email_unique')) {
                        friendlyMsg = 'NIP/Email ini sudah terdaftar.';
                        kolom = 'NIP / Email';
                    } else if (rawMsg.includes('nip')) {
                        friendlyMsg = 'NIP sudah terdaftar di sistem.';
                        kolom = 'NIP';
                    } else if (rawMsg.includes('nik')) {
                        friendlyMsg = 'NIK sudah terdaftar di sistem.';
                        kolom = 'NIK';
                    }
                    
                    setImportErrors([{
                        kolom: kolom,
                        message: friendlyMsg,
                        rows: ['Tidak Diketahui']
                    }]);
                    setError(null);
                } else {
                    setError(rawMsg);
                }
            } else {
                setError(errorMsg);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className=" bg-blue-100/50 text-blue-500 border border-blue-300 rounded-lg p-4 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5" />
                <div className="text-sm">
                    <p className="font-semibold">Informasi</p>
                    <p>Guru yang diimport akan ditambahkan ke sistem.</p>
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
                                    onClick={(e) => { e.stopPropagation(); setFile(null); setImportErrors([]); }}
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

                {importErrors.length > 0 && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 max-h-40 overflow-y-auto">
                        <p className="text-sm font-semibold text-red-800 mb-2">Beberapa baris gagal diimport:</p>
                        <ul className="text-xs text-red-600 space-y-1 list-disc list-inside">
                            {importErrors.map((err, idx) => (
                                <li key={idx}>
                                    <strong>{err.kolom || 'Error'}</strong>: {err.message}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition duration-200 font-medium text-sm"
                >
                    Tutup
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

export default FormImportTeacher;
