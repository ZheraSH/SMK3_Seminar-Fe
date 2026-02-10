"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, ArrowLeftToLine, ChevronRight } from "lucide-react";
import LoadingData from "../loadingData/loading";
import useProfile from "../../../../Core/hooks/operator-hooks/profile/useProfileOperator";
import { notify } from "../../../../Core/hooks/notification/notify";

export default function ProfileOperator() {
  const [isOpenFrom, setIsOpenFrom] = useState(false);
  const navigate = useNavigate();
  const { data, loading, error, year, handleUpdate, updating } = useProfile();

  if (isOpenFrom) {
    return (
      <FormClassStudent
        onClose={() => setIsOpenFrom(false)}
        user={data}
        onUpdate={handleUpdate}
        isUpdating={updating}
        error={error}
      />
    );
  }

  if (loading) {
    return <LoadingData loading={loading} type="profileOperator" />;
  }


  return (
    <div className="p-0 md:p-3 min-h-screen font-sans bg-gray-50">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-8 max-w-6xl mx-auto">
        <div className="flex flex-row justify-between items-center mb-6 gap-2">
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 leading-tight">
            Informasi Sekolah
          </h2>
          <button
            onClick={() => setIsOpenFrom(true)}
            className="bg-[#10B981] hover:bg-emerald-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap"
          >
            Edit Informasi
          </button>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 rounded-2xl border border-gray-100 flex items-center justify-center p-2 overflow-hidden bg-white shadow-sm">
              <img
                src={data?.logo}
                alt="Logo Sekolah"
                className="w-full h-full object-contain"
                onError={(e) => { e.target.src = "https://via.placeholder.com/100?text=LOGO" }}
              />
            </div>

            <div className="flex-1">
              <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-1 leading-tight">
                {data?.name || "-"}
              </h1>
              <span className="inline-block bg-blue-50 text-blue-600 text-[10px] md:text-xs px-2.5 py-0.5 rounded-full font-bold uppercase">
                Negeri
              </span>
            </div>
          </div>

          <div className="w-full md:w-auto text-left md:text-right px-4 py-2 bg-gray-50 md:bg-transparent rounded-lg border-l-4 border-emerald-500 md:border-l-0">
            <p className="text-gray-500 text-[10px] md:text-sm uppercase font-bold">Tahun Ajaran</p>
            <p className="text-gray-900 font-bold text-base">{year?.name || "-"}</p>
          </div>
        </div>

        <hr className="border-gray-100 mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-6">
          <div className="space-y-5">
            <InfoRow label="Kepala Sekolah" value={data?.principal_name} />
            <InfoRow label="NPSN" value={data?.npsn} />
            <InfoRow label="No. Telepon" value={data?.phone} />
            <InfoRow label="E-Mail" value={data?.email} />
          </div>

          <div className="space-y-5">
            <InfoRow label="Jenjang Pendidikan" value={data?.school_type?.label} />
            <InfoRow label="Akreditasi" value={data?.accreditation?.label} />
            <InfoRow label="Alamat" value={data?.address} alignTop={true} />
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-gray-100 flex justify-end items-center gap-6">
          <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-gray-600 font-medium text-sm flex items-center gap-2">
            <ArrowLeftToLine size={18} /> <span>Kembali</span>
          </button>
          <button onClick={() => { localStorage.clear(); navigate("/login"); }} className="text-red-400 hover:text-red-600 font-medium text-sm flex items-center gap-2">
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, alignTop = false }) {
  return (

    <div className={`flex flex-col sm:flex-row ${alignTop ? 'items-start' : 'items-start sm:items-center'} gap-1 sm:gap-0`}>
      <div className="w-full sm:w-40 md:w-48 flex-shrink-0 font-bold text-gray-800 text-sm md:text-base">
        {label}
      </div>
      <div className="hidden sm:block mr-3 font-semibold text-gray-800">:</div>
      <div className="text-gray-700 text-sm md:text-base break-words sm:break-normal flex-1 leading-relaxed font-medium">
        {value || "-"}
      </div>
    </div>
  );
}

const CustomSelect = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-[#F8FAFC] border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition"
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption ? selectedOption.label : label}
        </span>
        <ChevronRight
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-90" : "rotate-0"
            }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-200 p-2 z-50 mt-2 max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={`block w-full text-left text-sm px-3 py-2 rounded-lg transition ${value === opt.value
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-50 text-gray-700"
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


function FormClassStudent({ onClose, user, onUpdate, isUpdating }) {
  const getStringValue = (val) => {
    if (typeof val === "string") return val.toLowerCase();
    if (typeof val === "object" && val !== null) return val.value?.toLowerCase() || val.label?.toLowerCase() || "";
    return "";
  };

  const [form, setForm] = useState({
    name: user?.name || "",
    principal_name: user?.principal_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    school_type: getStringValue(user?.school_type),
    accreditation: getStringValue(user?.accreditation),
    npsn: user?.npsn || "",
  });

  const [localError, setLocalError] = useState({});
  const [previewImage, setPreviewImage] = useState(user?.logo || "https://via.placeholder.com/100?text=LOGO");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        principal_name: user.principal_name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        school_type: getStringValue(user.school_type),
        accreditation: getStringValue(user.accreditation),
        npsn: user.npsn || "",
      });
      setPreviewImage(user.logo || "https://via.placeholder.com/100?text=LOGO");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError({});

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("principal_name", form.principal_name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("address", form.address);
      formData.append("npsn", form.npsn);
      formData.append("school_type", form.school_type);
      formData.append("accreditation", form.accreditation);

      if (imageFile) {
        formData.append("logo", imageFile);
      }

      await onUpdate(formData);
      notify("Berhasil Memperbarui Data!", "success");
      onClose();
    } catch (err) {
      if (err.response?.data?.errors) {
        setLocalError(err.response.data.errors);
        notify(err.response?.data?.message || "Terjadi kesalahan saat memperbarui data", "error");
      } else {
        setLocalError({ general: err.response?.data?.message || "Terjadi kesalahan sistem" });
      }
    }
  };

  const inputStyle = (fieldName) => `
    w-full bg-[#F8FAFC] border rounded-xl px-4 py-2.5 text-sm outline-none transition
    ${localError[fieldName]
      ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
      : "border-gray-200 focus:ring-2 focus:ring-blue-500/20"}
  `;

  return (
    <div className="relative justify-center pb-5 mt-8 mb-15">
      <div>
        <div className="bg-white w-full rounded-3xl border border-gray-200 shadow-md py-5">
          <div className="px-8 pt-8 pb-4">
            <h2 className="text-xl font-bold text-gray-900">Edit Informasi Sekolah</h2>
            {localError.general && (
              <p className="text-red-500 text-xs mt-2 bg-red-50 p-2 rounded-lg border border-red-100 italic">
                {localError.general}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-6">

            <div className="flex flex-col items-center justify-center gap-4 py-4">
              <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                <img src={previewImage} alt="Logo Sekolah" className="max-w-full max-h-full object-contain p-2" />
              </div>
              <label className="cursor-pointer bg-[#4F84FF] hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition shadow-sm">
                Ganti Logo
                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImageFile(file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }} />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Nama Sekolah</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputStyle("name")}
                />
                {localError.name && <p className="text-red-500 text-[11px] mt-1 ml-1">* {localError.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Kepala Sekolah</label>
                <input
                  required
                  type="text"
                  value={form.principal_name}
                  onChange={(e) => setForm({ ...form, principal_name: e.target.value })}
                  className={inputStyle("principal_name")}
                />
                {localError.principal_name && <p className="text-red-500 text-[11px] mt-1 ml-1">* {localError.principal_name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">E-mail Sekolah</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputStyle("email")}
                />
                {localError.email && <p className="text-red-500 text-[11px] mt-1 ml-1">* {localError.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Telepon Sekolah</label>
                <input
                  required
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className={inputStyle("phone")}
                />
                {localError.phone && <p className="text-red-500 text-[11px] mt-1 ml-1">* {localError.phone}</p>}
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Alamat Sekolah</label>
                <textarea
                  required
                  rows="3"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className={inputStyle("address") + " resize-none"}
                ></textarea>
                {localError.address && <p className="text-red-500 text-[11px] mt-1 ml-1">* {localError.address}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Jenjang Sekolah</label>
                <CustomSelect
                  label="Pilih Jenjang Sekolah"
                  value={form.school_type}
                  onChange={(val) => setForm({ ...form, school_type: val })}
                  options={[{ value: "sd", label: "SD" }, { value: "smp", label: "SMP" }, { value: "sma", label: "SMA" }, { value: "smk", label: "SMK" }, { value: "ma", label: "MA" }]}
                />
                {localError.school_type && <p className="text-red-500 text-[11px] mt-1">* {localError.school_type}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Akreditasi</label>
                <CustomSelect
                  label="Pilih Akreditasi"
                  value={form.accreditation}
                  onChange={(val) => setForm({ ...form, accreditation: val })}
                  options={[{ value: "a", label: "A" }, { value: "b", label: "B" }, { value: "c", label: "C" }, { value: "not_accredited", label: "Belum Terakreditasi" }]}
                />
                {localError.accreditation && <p className="text-red-500 text-[11px] mt-1">* {localError.accreditation}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">NPSN</label>
                <input
                  type="text"
                  value={form.npsn}
                  onChange={(e) => setForm({ ...form, npsn: e.target.value })}
                  className={inputStyle("npsn")}
                />
                {localError.npsn && <p className="text-red-500 text-[11px] mt-1 ml-1">* {localError.npsn}</p>}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button type="button" onClick={onClose} className="px-8 py-2 bg-[#3B82F6] text-white rounded-xl font-semibold text-sm transition hover:bg-blue-600">
                Kembali
              </button>
              <button type="submit" disabled={isUpdating} className="px-8 py-2 bg-[#22C55E] text-white rounded-xl font-semibold text-sm transition shadow-md hover:bg-emerald-600 disabled:opacity-50">
                {isUpdating ? "Memproses..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}