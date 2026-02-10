"use client";

import { useState, useEffect } from "react";
import { Plus, Search, X } from "lucide-react";
import Header from "../../../components/elements/header/Header-new";
import LoadingData from "../../../components/elements/loadingData/loading"; 
import { getMastercards, postMastercard } from "../../../../Core/api/role-operator/mastercard/MasterCard";

export default function MasterCard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData] = useState({ name: "", email: "", rfid: "" });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const filteredData = data.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.email?.toLowerCase().includes(search.toLowerCase()) ||
      item.rfid?.includes(search)
  );

  const handleInputChange = (e) => {
    setNewData({ ...newData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    setError(null);
    try {
      await postMastercard(newData);
      setIsModalOpen(false);
      setNewData({ name: "", email: "", rfid: "" });
      fetchData(); 
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menambahkan data");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        {loading ? (<LoadingData loading={loading} type="header1" />)
          : (
            <Header
              span="Master Card"
              p="Data inti dan identitas siswa"
              src="/images/particle/mastercard.png"
            />
          )}
      </div>
      {loading ? (<LoadingData loading={loading} type="create" />)
        : (
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="flex items-center w-full max-w-full sm:max-w-[300px] md:max-w-[320px] border rounded-full px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition gap-2 border-[#CBD5E1]">
              <Search size={20} className="text-gray-600 flex-shrink-0" />
              <input
                type="text"
                placeholder="Cari nama / Email / RFID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full outline-none text-sm bg-transparent placeholder:text-gray-600"
              />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              <Plus size={16} />
              Tambah Master Card
            </button>
          </div>
        )}

      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        {loading ? (
          <LoadingData loading={loading} type="tableSchedule" cou />
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#3B82F6] text-white">
                <th className="px-4 py-3 text-sm font-semibold border-r border-blue-500">
                  No
                </th>
                <th className="px-4 py-3 text-sm font-semibold border-r border-blue-500">
                  Nama
                </th>
                <th className="px-4 py-3 text-sm font-semibold border-r border-blue-500">
                  Email
                </th>
                <th className="px-4 py-3 text-sm font-semibold">RFID</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? filteredData.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-100"}
                >
                  <td className="px-4 py-3 border-b border-gray-200 text-sm">
                    {idx + 1}.
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-sm">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-sm">
                    {item.email}
                  </td>
                  <td className="px-4 py-3 border-b border-gray-200 text-sm">
                    {item.rfid}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">Tidak ada data</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-[15px] w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Tambah Master Card</h2>
              <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
            </div>

            {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nama<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  placeholder="Masukkan Nama"
                  value={newData.name}
                  onChange={handleInputChange}
                  className="w-full border border-[#CBD5E1] rounded-[7px] p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email<span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  placeholder="Masukkan email"
                  value={newData.email}
                  onChange={handleInputChange}
                  className="w-full border border-[#CBD5E1] rounded-[7px] p-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">RFID<span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="rfid"
                  placeholder="Masukkan RFID"
                  value={newData.rfid}
                  onChange={handleInputChange}
                  className="w-full border border-[#CBD5E1] rounded-[7px] p-2"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-[7px] hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {submitLoading ? "Menyimpan..." : "+ Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
