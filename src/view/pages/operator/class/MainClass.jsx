"use client";

import { useState } from "react";
import { Users, GraduationCap, Search, ChevronDown, X } from "lucide-react";

export const MainClass = () => {
  // Major/Jurusan Data
  const [classData] = useState([
    {
      id: 1,
      img: "/images/major/pplg02.png",
      name: "Pengembangan Perangkat Lunak & Gim (PPLG)",
      code: "PPLG",
    },
    {
      id: 2,
      img: "/images/major/dkv.png",
      name: "Desain Komunikasi Visual (DKV)",
      code: "DKV",
    },
    {
      id: 3,
      img: "/images/major/kcs.png",
      name: "Kecantikan & Spa (KCS)",
      code: "KCS",
    },
    {
      id: 4,
      img: "/images/major/ph.png",
      name: "Perhotelan (PH)",
      code: "PH",
    },
    {
      id: 5,
      img: "/images/major/kuliner.png",
      name: "Kuliner",
      code: "KULINER",
    },
    {
      id: 6,
      img: "/images/major/busana.png",
      name: "Busana",
      code: "BUSANA",
    },
  ]);

  // Class Data
  const [classList] = useState([
    {
      id: 1,
      name: "XII PPLG 3",
      year: "2024/2025",
      teacher: "Deddy Setiawan",
      students: 36,
      major: "PPLG",
      level: "XII",
    },
    {
      id: 2,
      name: "XII PPLG 3",
      year: "2024/2025",
      teacher: "Deddy Setiawan",
      students: 36,
      major: "PPLG",
      level: "XII",
    },
    {
      id: 3,
      name: "XII DKV 2",
      year: "2024/2025",
      teacher: "Rizky Amelia",
      students: 32,
      major: "DKV",
      level: "XII",
    },
    {
      id: 4,
      name: "XI DKV 1",
      year: "2024/2025",
      teacher: "Siti Nurhaliza",
      students: 28,
      major: "DKV",
      level: "XI",
    },
  ]);

  // Student Data
  const [studentList] = useState([
    {
      id: 1,
      name: "Valeri abdollah rahman",
      nisn: "1277639273",
      gender: "LAKI - LAKI",
      status: "Aktif",
      rfd: "12956737ja",
    },
    {
      id: 2,
      name: "Valeri abdollah",
      nisn: "1277639273",
      gender: "LAKI - LAKI",
      status: "Aktif",
      rfd: "12956737ja",
    },
    {
      id: 3,
      name: "Valeri",
      nisn: "1277639273",
      gender: "LAKI - LAKI",
      status: "Aktif",
      rfd: "12956737ja",
    },
  ]);

  const [activeTab, setActiveTab] = useState("jurusan");
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [searchClass, setSearchClass] = useState("");
  const [filterCategory, setFilterCategory] = useState("Show all");
  const [selectedClass, setSelectedClass] = useState(null);
  const [showAddClassModal, setShowAddClassModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [addClassForm, setAddClassForm] = useState({
    major: "",
    level: "",
    teacher: "",
  });

  const [addStudentForm, setAddStudentForm] = useState({
    students: [],
  });

  // Filter classes based on selected major and search
  const filteredClasses = classList.filter((item) => {
    const matchesMajor = selectedMajor
      ? item.major === selectedMajor
      : filterCategory === "Show all"
      ? true
      : item.major === filterCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchClass.toLowerCase()) ||
      item.teacher.toLowerCase().includes(searchClass.toLowerCase());
    return matchesMajor && matchesSearch;
  });

  // Handle lihat detail from major
  const handleMajorDetail = (majorCode) => {
    setSelectedMajor(majorCode);
    setActiveTab("kelas");
    setSearchClass("");
    setFilterCategory("Show all");
  };

  // Get unique major codes for filter
  const majorCodes = ["Show all", ...new Set(classList.map((c) => c.major))];

  const handleAddClassSubmit = () => {
    console.log("Add class:", addClassForm);
    setShowAddClassModal(false);
    setAddClassForm({ major: "", level: "", teacher: "" });
  };

  const handleAddStudentSubmit = () => {
    console.log("Add students:", addStudentForm);
    setShowAddStudentModal(false);
    setAddStudentForm({ students: [] });
  };

  return (
    <div className="justify-center mt-8 mx-7">
      {/* Banner */}
      <div className="relative w-full h-[166px] bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px]">
        <div className="absolute inset-0 items-center justify-center rounded-[6px]">
          <div className="ml-5 mt-2">
            <h1 className="text-white text-[30px] font-semibold">
              {selectedClass ? selectedClass.name : "Jurusan & Kelas"}
            </h1>
            <p className="text-white text-[14px] font-light">
              {selectedClass
                ? "Detail siswa kelas"
                : "Atur jurusan & kelas di sini."}
            </p>
          </div>
        </div>
      </div>

      {!selectedClass ? (
        <>
          {/* Header with tabs */}
          <div className="flex justify-between items-center bg-white shadow-md rounded-xl px-6 py-3 mt-4 border border-gray-300">
            <h1 className="text-black text-[24px] font-medium">
              {activeTab === "jurusan" ? "Daftar Jurusan" : "Daftar Kelas"}
            </h1>

            <div className="flex gap-2">
              {selectedMajor && (
                <button
                  onClick={() => {
                    setSelectedMajor(null);
                    setSearchClass("");
                    setFilterCategory("Show all");
                  }}
                  className="px-4 py-1 rounded-md font-medium text-[14px] bg-gray-200 text-gray-700 hover:bg-gray-300"
                >
                  Show all
                </button>
              )}
              <div className="flex rounded-lg p-1">
                <button
                  onClick={() => {
                    setActiveTab("jurusan");
                    setSelectedMajor(null);
                    setSearchClass("");
                  }}
                  className={`px-4 py-1 rounded-md font-medium text-[18px] transition ${
                    activeTab === "jurusan"
                      ? "bg-blue-500 text-white shadow"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Jurusan
                </button>
                <button
                  onClick={() => setActiveTab("kelas")}
                  className={`px-4 py-1 rounded-md text-[18px] font-medium transition ${
                    activeTab === "kelas"
                      ? "bg-blue-500 text-white shadow"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Kelas
                </button>
              </div>
            </div>
          </div>

          {/* Jurusan Tab */}
          {activeTab === "jurusan" && !selectedMajor && (
            <div className="grid grid-cols-3 gap-y-10 justify-items-center mt-8">
              {classData.map((data) => (
                <div
                  key={data.id}
                  className="border border-gray-300 rounded-2xl w-[320px] min-h-[200px] shadow-lg p-4 bg-white flex flex-col justify-between hover:shadow-xl transition"
                >
                  <div>
                    <div className="flex justify-center mt-2">
                      <div className="w-[120px] h-[120px] rounded-full border border-gray-300 flex items-center justify-center overflow-hidden">
                        <img
                          className="w-full h-full object-cover scale-100 transition-transform duration-500"
                          src={data.img || "/placeholder.svg"}
                          alt={data.name}
                        />
                      </div>
                    </div>
                    <h1 className="text-[18px] font-bold mt-4 text-center">
                      {data.name}
                    </h1>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => handleMajorDetail(data.code)}
                      className="w-[266px] h-10 bg-[#3B82F6] rounded-[10px] text-white font-medium hover:bg-blue-600 transition"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Kelas Tab */}
          {activeTab === "kelas" && (
            <>
              {/* Search and Filter */}
              <div className="flex gap-4 mt-5 items-center">
                <div className="relative flex-1 max-w-xs">
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari Kelas/Wali Kelas..."
                    value={searchClass}
                    onChange={(e) => setSearchClass(e.target.value)}
                    className="border border-gray-600 rounded-full pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {/* Filter Dropdown */}
                <div className="relative">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none pr-10 bg-white"
                  >
                    {majorCodes.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>

                {/* Add Class Button */}
                <button
                  onClick={() => setShowAddClassModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
                >
                  + Tambah Kelas
                </button>
              </div>

              {/* Class Cards */}
              <div className="flex flex-wrap gap-4 mt-5">
                {filteredClasses.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl w-[380px] min-h-[200px] shadow-2xl p-4 bg-white flex flex-col justify-between hover:shadow-xl transition border border-gray-300"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-semibold">
                        <GraduationCap className="w-4 h-4 mr-2" />
                        {item.name}
                      </div>
                      <span className="text-gray-700 text-sm font-medium">
                        {item.year}
                      </span>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-gray-400 text-sm">Wali Kelas :</p>
                        <p className="text-gray-800 font-semibold">
                          {item.teacher}
                        </p>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Users className="w-7 h-7 mr-1" />
                        <span className="font-medium">{item.students}</span>
                      </div>
                    </div>

                    <div className="flex justify-center mt-5">
                      <button
                        onClick={() => setSelectedClass(item)}
                        className="w-full h-9 bg-[#3B82F6] rounded-[10px] text-white font-medium hover:bg-blue-600 transition"
                      >
                        Lihat Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {/* Header with buttons */}
          <div className="flex justify-between items-center bg-white shadow-md rounded-xl px-6 py-3 mt-4 border border-gray-300">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                {selectedClass.name}
              </div>
              <span className="text-gray-600 text-sm">
                {selectedClass.year}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium">
                Lihat Siswa
              </button>
              <button
                onClick={() => setShowAddStudentModal(true)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
              >
                + Tambah Siswa
              </button>
              <button
                onClick={() => setSelectedClass(null)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
              >
                Kembali
              </button>
            </div>
          </div>

          {/* Search and Filter for Students */}
          <div className="flex gap-4 mt-5 items-center">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Cari nama/NISN..."
                className="border border-gray-600 rounded-full pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Student Table */}
          <div className="mt-6 overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    NISN
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Jenis Kelamin
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    RFD
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {studentList.map((student, index) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm">{index + 1}</td>
                    <td className="px-6 py-3 text-sm">{student.name}</td>
                    <td className="px-6 py-3 text-sm">{student.nisn}</td>
                    <td className="px-6 py-3 text-sm">{student.gender}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className="px-2 py-1 bg-green-200 text-green-800 rounded text-xs font-medium">
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs font-medium">
                        {student.rfd}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setShowStudentDetailModal(true);
                        }}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showAddClassModal && (
        <div className="fixed inset-0 backdrop-blur-[3px] bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tambah Kelas</h2>
              <button
                onClick={() => setShowAddClassModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jurusan
                </label>
                <select
                  value={addClassForm.major}
                  onChange={(e) =>
                    setAddClassForm({ ...addClassForm, major: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Pilih Jurusan</option>
                  {classData.map((data) => (
                    <option key={data.id} value={data.code}>
                      {data.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tingkatan
                </label>
                <select
                  value={addClassForm.level}
                  onChange={(e) =>
                    setAddClassForm({ ...addClassForm, level: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Pilih Tingkatan</option>
                  <option value="X">X</option>
                  <option value="XI">XI</option>
                  <option value="XII">XII</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Wali Kelas
                </label>
                <input
                  type="text"
                  value={addClassForm.teacher}
                  onChange={(e) =>
                    setAddClassForm({
                      ...addClassForm,
                      teacher: e.target.value,
                    })
                  }
                  placeholder="Nama Wali Kelas"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddClassModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddClassSubmit}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddStudentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                Tambah Siswa Ke Kelas "{selectedClass?.name}"
              </h2>
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jurusan
                </label>
                <input
                  type="text"
                  value={selectedClass?.major || ""}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tingkatan Kelas
                </label>
                <input
                  type="text"
                  value={selectedClass?.level || ""}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tahun Ajaran
                </label>
                <input
                  type="text"
                  value={selectedClass?.year || ""}
                  disabled
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
                />
              </div>

              {/* Student Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pilih Siswa
                </label>
                <input
                  type="text"
                  placeholder="Cari nama / NIK"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="border border-gray-300 rounded-lg p-3 max-h-40 overflow-y-auto">
                  {studentList.map((student) => (
                    <label
                      key={student.id}
                      className="flex items-center gap-2 py-1 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-sm">{student.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowAddStudentModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                onClick={handleAddStudentSubmit}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
              >
                Tambahkan
              </button>
            </div>
          </div>
        </div>
      )}

      {showStudentDetailModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Detail Siswa</h2>
              <button
                onClick={() => {
                  setShowStudentDetailModal(false);
                  setSelectedStudent(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Nama</p>
                  <p className="text-sm font-semibold">
                    {selectedStudent.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">NISN</p>
                  <p className="text-sm font-semibold">
                    {selectedStudent.nisn}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Jenis Kelamin
                  </p>
                  <p className="text-sm font-semibold">
                    {selectedStudent.gender}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Status</p>
                  <p className="text-sm font-semibold">
                    {selectedStudent.status}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 font-medium">RFD</p>
                <p className="text-sm font-semibold">{selectedStudent.rfd}</p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  setShowStudentDetailModal(false);
                  setSelectedStudent(null);
                }}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
