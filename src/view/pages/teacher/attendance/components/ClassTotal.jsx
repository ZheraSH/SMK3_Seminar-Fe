import { Send } from "lucide-react";


export default function TotalClass ({totalAlpa,totalHadir,totalIzin,totalTerlambat,setIsOpenClass}) {
    return (
        <>
            <div className="pl-[16px] pt-[8px] pb-[8px]">
                <h1 className="text-xl font-semibold font-poppins">Daftar Nama Siswa</h1>
            </div>
            
            <div className="flex gap-2">
                <p className="text-[#4E4D4D] font-poppins font-medium">Total</p>
            
                <div className="flex gap-1">
                    <p className="text-[#10B981] font-poppins font-medium">Hadir: {totalHadir}</p>
                    <p className="text-[#646464]">|</p>
                    <p className="text-[#FF5E53] font-poppins font-medium">Alpa: {totalAlpa}</p>
                    <p className="text-[#646464]">|</p>
                    <p className="text-[#3B82F6] font-poppins font-medium">Izin: {totalIzin}</p>
                    <p className="text-[#646464]">|</p>
                    <p className="text-[#FACC15] font-poppins font-medium">Terlambat: {totalTerlambat}</p>
                </div>
            </div>
            
            <div className="flex gap-[12px]">
                <button className="gap-2 bg-[#3B82F6] w-[111px] text-white hover:bg-blue-600 h-[40px] flex justify-center items-center rounded-xl">
                    <Send className="w-[20px] h-[20px]" />
                    <p className="font-[14px] font-poppins">Submit</p>
                </button>
            
                <button
                    onClick={() => setIsOpenClass(false)}
                    className="bg-white border-2 w-[107px] hover:bg-[#FF5E53] hover:text-white h-[37px] text-[14px] font-poppins border-[#FF5E53] text-[#FF5E53] rounded-xl"
                >
                    ← Kembali
                </button>
            </div>
        </>
    );
}