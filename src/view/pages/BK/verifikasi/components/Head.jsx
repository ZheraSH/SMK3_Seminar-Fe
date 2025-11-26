import { CustomDropdown } from "./Filter";
import HeaderPage from "../../../../components/elements/header/Header.Page";
import { Search } from "lucide-react";


export default function HeaderAndControls ({handleClassSelect}) {
    return (
        <>
        <HeaderPage
            h1={"Manajemen Verifikasi Izin Siswa"}
            p={"Laporan Verifikasi Surat Izin Kehadiran Siswa."}
        />
        <div className='w-full h-[81px] bg-white rounded-xl shadow-lg p-5 mb-6'>
            <div className="flex flex-row justify-between items-center">
            <div className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Daftar nama siswa</div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Cari Kelas/Nama..."
                    className="w-full sm:w-[244px] h-10 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm text-sm"
                />
                </div>
                <CustomDropdown
                placeholder="Kelas"
                options={['XII pplg 1', 'XII pplg 2', 'XII pplg 3']}
                onSelect={handleClassSelect}
                />
            </div>
            </div>
        </div>
        </>
    );
}