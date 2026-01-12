import { useState } from "react";
import { ChevronRight } from "lucide-react";
import useMasterData from "../../../../../Core/hooks/operator-hooks/class-major/useMasterData"; 

function Dropdown({ label, value, placeholder, data = [], onChange, error }) {
  const [open, setOpen] = useState(false);
  const dropdownItems = Array.isArray(data) ? data : [];

  return (
    <div className="w-full relative">
    <label className="block text-gray-700 text-sm font-medium ml-1">{label}</label>
    <div onClick={() => setOpen(!open)} className={`w-full px-4 py-3 bg-white border ${  error ? "border-red-500" : "border-gray-300"} rounded-xl flex justify-between items-center cursor-pointer`}>
      <span className={value ? "text-black" : "text-gray-500"}>
        {value ? dropdownItems.find((i) => i.id === value)?.code || dropdownItems.find((i) => i.id === value)?.name : placeholder}
      </span>
      <ChevronRight className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ${open ? 'rotate-90' : 'rotate-0'}`} />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    {open && (
      <div className="absolute mt-1 w-full bg-white shadow-lg rounded-xl max-h-56 overflow-y-auto z-50">
        {dropdownItems.length === 0 && ( <p className="px-4 py-2 text-gray-500 text-sm"> Tidak ada data </p> )}
        {dropdownItems.map((item) => (
          <div key={item.id} onClick={() => { onChange(item.id); setOpen(false);}} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            {item.code || item.name}
          </div>
        ))}
      </div>
    )}
  </div>
 );
}

export default function Form({ onClassAdded, addClass, onError }) {
  const [majorId, setMajorId] = useState("");
  const [classNameInput, setClassNameInput] = useState("");
  const [schoolYearId, setSchoolYearId] = useState("");
  const [levelClassId, setLevelClassId] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { majors, schoolYears, levelClass, teachers, loading: loadingMaster} = useMasterData();

  const validateForm = () => {
    let newErr = {};

    if (!levelClassId) newErr.levelClassId = "Tingkatan wajib dipilih";
    if (!majorId) newErr.majorId = "Jurusan wajib dipilih";
    if (!classNameInput) newErr.classNameInput = "No kelas wajib diisi";
    if (!schoolYearId) newErr.schoolYearId = "Tahun ajaran wajib dipilih";
    if (!teacherId) newErr.teacherId = "Wali kelas wajib dipilih";

    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = { major_id: majorId, school_year_id: schoolYearId, level_class_id: levelClassId, homeroom_teacher_id: teacherId, name: classNameInput,};

    try {
      await addClass(payload);
      if (onClassAdded) onClassAdded();
    } catch (err) {
      const msg = err?.response?.data?.message || "Maaf kelas yang anda buat telah ada ";
      if (onError) onError(msg);
      return;
    } finally {
      setIsSubmitting(false);
    }
  };
  const activeSchoolYears = schoolYears.filter((year) => year.active === true || year.active === 1);

  if (loadingMaster) return <div>Memuat data master...</div>;

 return (
  <form onSubmit={handleSubmit}>
   <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
    <Dropdown label="Tingkatan" placeholder="Pilih Tingkatan" data={levelClass || []} value={levelClassId} onChange={(val) => { setLevelClassId(val); setErrors({ ...errors, levelClassId: "" }); }} error={errors.levelClassId} />
    <Dropdown label="Jurusan" placeholder="Pilih Jurusan" data={majors || []} value={majorId} onChange={(val) => { setMajorId(val); setErrors({ ...errors, majorId: "" }); }} error={errors.majorId} />

    <div className="w-full">
      <label className="block text-gray-700 text-[14px] font-medium ml-1"> No Kelas </label>
      <input type="number" placeholder="Masukkan No" className={`w-full px-4 py-3 bg-white border ${ errors.classNameInput ? "border-red-500" : "border-gray-300" } rounded-xl`} value={classNameInput} onChange={(e) => { setClassNameInput(e.target.value); setErrors({ ...errors, classNameInput: "" }); }} />
      {errors.classNameInput && ( <p className="text-red-500 text-xs mt-1">{errors.classNameInput}</p>)}
    </div>

    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
     <Dropdown label="Tahun Ajaran" placeholder="Pilih Tahun Ajaran" data={activeSchoolYears} value={schoolYearId} onChange={(val) => { setSchoolYearId(val); setErrors({ ...errors, schoolYearId: "" }); }} error={errors.schoolYearId} />
     <Dropdown label="Wali Kelas" placeholder="Pilih Guru Pengajar" data={teachers || []} value={teacherId} onChange={(val) => { setTeacherId(val); setErrors({ ...errors, teacherId: "" }); }} error={errors.teacherId} />
    </div>
   </div>

  <div className="flex justify-end mt-6">
    <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow">
      {isSubmitting ? "Menyimpan..." : "Tambah"}
    </button>
  </div>
  </form>
 );
}