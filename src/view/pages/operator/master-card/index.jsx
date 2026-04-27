"use client";

import { useState, useEffect, useRef } from "react";
import { Plus, Search, CreditCard, MoreVertical, Trash2, X } from "lucide-react";
import Header from "@elements/header/header-new-1";
import LoadingData from "@elements/loading-data/loading";
import { getMastercards, postMastercard, deleteMastercard } from "@services/role-operator/mastercard/master-card-api";
import { LoadingSpinner } from "@elements/loading-button/loading";
import ModalDelete from "@elements/modaldelete/modal-delete";
import { notify } from "@core/hooks/notification/notify";
import PaginationMasterCard from "./components/pagination-master-card";

export default function MasterCardPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRfid, setNewRfid] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const dropdownRef = useRef(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getMastercards();
      setData(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Failed to fetch mastercards", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = data.filter((item) =>
    item.rfid?.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);
    try {
      await postMastercard({ rfid: newRfid });
      setIsModalOpen(false);
      setNewRfid("");
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambahkan data");
    } finally {
      setSubmitLoading(false);
    }
  };

  const openDeleteConfirm = (item) => {
    setConfirmModal({ show: true, id: item.id });
    setOpenDropdownId(null);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteMastercard(confirmModal.id);
      notify("Master Card Berhasil Dihapus", "success");
      setConfirmModal({ show: false, id: null });
      fetchData();
    } catch (err) {
      notify("Gagal menghapus Master Card", "error");
      console.error("Gagal menghapus mastercard:", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans mb-10 md:mb-0">
      {/* Header */}
      {loading ? (
        <LoadingData loading={loading} type="header1" />
      ) : (
        <Header
          span="Master Card"
          p="Data kartu RFID siswa"
          src="/images/particle/mastercard.png"
        />
      )}

      {/* Search + Tambah */}
      {loading ? (
        <LoadingData loading={loading} type="create" />
      ) : (
        <div className="flex flex-row justify-between items-center mb-8 gap-4 mt-6">
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari RFID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3B82F6] text-white px-3 py-3 items-center md:px-4 md:py-2 flex gap-1 rounded-full md:rounded-[6px] hover:bg-blue-700 transition text-2xl md:text-sm font-medium whitespace-nowrap"
          >
            <Plus size={20} />
            <span className="hidden md:block">Tambah Master Card</span>
          </button>
        </div>
      )}

      {/* Card Grid */}
      {loading ? (
        <LoadingData loading={loading} type="cardclass" />
      ) : filteredData.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-full">
          <img
            src="/images/null/nullimage.png"
            alt="Data Kosong"
            className="w-72 h-auto md:w-[400px] md:h-[285px] mb-6"
          />
          <p className="text-gray-500 text-center max-w-[550px] text-sm md:text-md">
            Maaf yaaa.. datanya gaada, silahkan klik "Tambah Master Card" buat
            nambah data Master Card!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((item, idx) => (
            <div
              key={item.id || idx}
              className="bg-white h-[140px] p-6 rounded-2xl shadow-sm border border-gray-100 relative"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-500 rounded-lg text-white">
                    <CreditCard size={18} />
                  </div>
                  <span className="text-blue-500 font-bold text-[12px]">
                    Master Card
                  </span>
                </div>

                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenDropdownId(
                        openDropdownId === (item.id || idx) ? null : (item.id || idx)
                      )
                    }
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50"
                  >
                    <MoreVertical size={20} />
                  </button>

                  {openDropdownId === (item.id || idx) && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden py-1 animate-in fade-in zoom-in duration-100"
                    >
                      <button
                        onClick={() => openDeleteConfirm(item)}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 flex items-center gap-3 text-red-600"
                      >
                        <Trash2 size={16} /> Hapus Master Card
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <h2 className="text-[22px] font-black text-gray-800 tracking-tight truncate">
                {item.rfid}
              </h2>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-12 gap-2 pb-10">
        <PaginationMasterCard
          page={1}
          lastPage={1}
          onPageChange={() => { }}
        />
      </div>

      {/* Modal Tambah Master Card */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white rounded-3xl p-8 shadow-2xl w-[90%] max-w-md transform transition-all animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Tambah Master Card
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X size={24} />
              </button>
            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-xl mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  RFID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rfid"
                  placeholder="Masukkan kode RFID"
                  value={newRfid}
                  onChange={(e) => setNewRfid(e.target.value)}
                  className="w-full border border-[#CBD5E1] rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  required
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className={`flex-1 py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95 ${submitLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {submitLoading ? <LoadingSpinner /> : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      <ModalDelete
        isOpen={confirmModal.show}
        onConfirm={handleConfirmDelete}
        onClose={() => setConfirmModal({ show: false, id: null })}
        isProcessing={isDeleting}
      />
    </div>
  );
}
