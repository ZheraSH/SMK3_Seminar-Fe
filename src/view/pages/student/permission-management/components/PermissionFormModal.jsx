"use client";

import React from "react";
import { X } from "lucide-react";

export const PermissionFormModal = ({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onSubmit,
  errors,
  isSubmitting = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Buat Izin Baru</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="text-gray-500 hover:text-gray-700 transition disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Error General */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {errors.general[0]}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          {/* Jenis Izin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Izin
            </label>
            <select
              value={formData.type}
              onChange={(e) =>
                onFormChange({ ...formData, type: e.target.value })
              }
              disabled={isSubmitting}
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 
             focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50
             appearance-none"
            >
              <option value="">-- Pilih Jenis Izin --</option>
              <option value="sick">Sakit</option>
              <option value="permission">Izin</option>
              <option value="dispensation">Dispensasi</option>
            </select>

            {errors.type && (
              <p className="text-red-600 text-sm mt-1">{errors.type[0]}</p>
            )}
          </div>

          {/* Tanggal Mulai */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Mulai
            </label>
            <input
              type="date"
              required
              value={formData.start_date}
              onChange={(e) =>
                onFormChange({ ...formData, start_date: e.target.value })
              }
              disabled={isSubmitting}
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
            {errors.start_date && (
              <p className="text-red-600 text-sm mt-1">
                {errors.start_date[0]}
              </p>
            )}
          </div>

          {/* Tanggal Selesai */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Selesai
            </label>
            <input
              type="date"
              required
              value={formData.end_date}
              onChange={(e) =>
                onFormChange({ ...formData, end_date: e.target.value })
              }
              disabled={isSubmitting}
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
            {errors.end_date && (
              <p className="text-red-600 text-sm mt-1">{errors.end_date[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bukti
            </label>
            <input
              type="file"
              onChange={(e) =>
                onFormChange({ ...formData, proof: e.target.files[0] })
              }
              disabled={isSubmitting}
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50"
            />
            {errors.proof && (
              <p className="text-red-600 text-sm mt-1">{errors.proof[0]}</p>
            )}
          </div>

          {/* Alasan */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alasan
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) =>
                onFormChange({ ...formData, reason: e.target.value })
              }
              placeholder="Tuliskan alasan izin Anda"
              disabled={isSubmitting}
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none disabled:opacity-50"
              rows={4}
            />
            {errors.reason && (
              <p className="text-red-600 text-sm mt-1">{errors.reason[0]}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Mengirim...
              </>
            ) : (
              "Kirim Izin"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
