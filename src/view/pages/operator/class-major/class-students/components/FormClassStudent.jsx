import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";


export default function FormStudent({ classroom, onClose, availableStudents, addStudents }) {

    const [major] = useState(classroom.major?.name || "");
    const [gradeLevel] = useState(classroom.level_class?.name || "");
    const [schoolYear] = useState(classroom.school_year?.name || "");

    const [search, setSearch] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [students, setStudents] = useState([]);

    useEffect(() => {
        setStudents(availableStudents || []);
    }, [availableStudents]);

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const handleCheckboxChange = (id) => {
        if (selectedStudents.includes(id)) {
            setSelectedStudents(selectedStudents.filter(s => s !== id));
        } else {
            setSelectedStudents([...selectedStudents, id]);
        }
    };

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.nisn.includes(search)
    );
    
   
    const handleSubmit = async () => {
        if (selectedStudents.length === 0) return;

        setIsLoading(true);
        
        try {
            const result = await addStudents(selectedStudents);

           onClose();
        } catch (error) {
           console.log(error)
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-3 mt-4">
                <div>
                    <label className="text-sm font-semibold">Jurusan</label>
                    <input type="text" value={major} readOnly
                        className="w-full mt-1 border border-gray-300 p-2 rounded-lg bg-gray-100" />
                </div>
                <div>
                    <label className="text-sm font-semibold">Tingkatan Kelas</label>
                    <input type="text" value={gradeLevel} readOnly
                        className="w-full mt-1 border border-gray-300 p-2 rounded-lg bg-gray-100" />
                </div>
                <div>
                    <label className="text-sm font-semibold">Tahun Ajaran</label>
                    <input type="text" value={schoolYear} readOnly
                        className="w-full mt-1 border border-gray-300 p-2 rounded-lg bg-gray-100" />
                </div>
                <div className="relative">
                    <label className="text-sm font-semibold">Pilih Siswa</label>
                    <div className="relative mt-1">
                        <input type="text"
                            value={
                                selectedStudents.length > 0
                                ? `${selectedStudents.length} siswa dipilih`
                                : search
                            }
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari nama "
                            className="w-full border p-2 rounded-lg pr-10"
                            onFocus={() => setDropdownOpen(true)}
                            readOnly={selectedStudents.length > 0} 
                        />

                        <ChevronRight
                            onClick={(e) => {e.stopPropagation(); setDropdownOpen(!dropdownOpen);}}
                            className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer transition-transform duration-200
                                ${dropdownOpen ? "rotate-90" : ""}`}/>
                    </div>

                    {dropdownOpen && (
                        <div className="absolute w-full bg-white border mt-2 rounded-lg shadow-md max-h-40 overflow-y-auto z-30" onClick={(e) => e.stopPropagation()}>
                            {filteredStudents.length === 0 && (
                                <p className="p-3 text-sm text-gray-500">Tidak ada siswa ditemukan</p>
                            )}

                            {filteredStudents.map((s) => (
                                <label key={s.id} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer" onClick={(e) => e.stopPropagation()}>
                                    <input type="checkbox" checked={selectedStudents.includes(s.id)} onChange={() => handleCheckboxChange(s.id)}/>
                                    <span>{s.name}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="text-end">
                    <button onClick={handleSubmit} disabled={isLoading || selectedStudents.length === 0} 
                        className={`px-4 text-white py-2 rounded-lg mt-3 
                            ${isLoading || selectedStudents.length === 0 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-[#3B82F6] hover:bg-blue-700'}`
                        }>
                    {isLoading ? "Memproses..." : "Tambah"}
                    </button>
                </div>
            </div>
            
        </>
    );
}