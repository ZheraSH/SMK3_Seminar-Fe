"use client";

import React from "react";
import { X } from "lucide-react";

export const PermissionFormModal = ({
  isOpen,
  onClose,
  formData,
  onFormChange,
  onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Buat Izin Baru</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 ">
          {/* Jenis Izin */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Jenis Izin
            </label>
            <select
              value={formData.type}
              onChange={
                (e) => onFormChange({ ...formData, type: e.target.value }) // <- ini benar
              }
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">-- Pilih Jenis Izin --</option>
              <option value="sick">Sakit</option>
              <option value="permission">Izin</option>
              <option value="dispensation">Dispensasi</option>
            </select>
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
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
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
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
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
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
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
              className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
          >
            Kirim Izin
          </button>
        </form>
      </div>
    </div>
  );
};
