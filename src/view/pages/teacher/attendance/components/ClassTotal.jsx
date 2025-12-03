// TotalClass.jsx
import { Send } from "lucide-react";

export default function TotalClass({
  setIsOpenClass,
  summary,
  handleSubmit,
  isSubmitted,
  canSubmit,
  submitting,
  isTimeValid
}) {
  const isButtonDisabled = isSubmitted || !canSubmit || submitting || !isTimeValid; 

  return (
    <>
        <div className="flex gap-2 pb-2 flex-wrap h-full w-full justify-between bg-white shadow-md p-2 rounded-lg mt-4">

            <div className="md:pl-0 lg:pl-[16px] py-[8px]">
                <h1 className="text-xl font-semibold font-poppins">Daftar Nama Siswa</h1>
                <p className="text-xs text-gray-500">
                Total: {summary.present + summary.alpha + summary.leave + summary.late + summary.sick} siswa {/* 🌟 Tambah summary.sick */}
                </p>
            </div>

            <div className="flex gap-2 items-center text-[10px] lg:text-[16px] ">
                <p className="text-[#4E4D4D] font-poppins font-medium">Total Status:</p>
                <div className="flex gap-2">
                <p className="text-[#10B981] font-poppins font-medium">Hadir: {summary.present}</p>
                <p className="text-[#646464]">|</p>
                <p className="text-[#FF5E53] font-poppins font-medium">Alpha: {summary.alpha}</p>
                <p className="text-[#646464]">|</p>
                <p className="text-[#3B82F6] font-poppins font-medium">Izin: {summary.leave}</p>
                <p className="text-[#646464]">|</p>
                <p className="text-[#FACC15] font-poppins font-medium">Terlambat: {summary.late}</p>
                <p className="text-[#646464]">|</p>
                <p className="text-[#8B5CF6] font-poppins font-medium">Sakit: {summary.sick}</p> {/* 🌟 Warna ungu */}
                </div>
            </div>

            <div className="flex gap-[12px] items-center">

                <button
                onClick={handleSubmit}
                disabled={isButtonDisabled}
                className={`flex items-center gap-1 w-[80px] md:w-[100px] lg:w-[120px] justify-center h-[37px] rounded-xl text-white font-poppins ${
                    isButtonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                >
                <Send className=" w-[15px] h-[15px] md:w-[20px] md:h-[20px]" />
                <p className=" text-[12px] md:text-[14px]">
                    {submitting ? "Mengirim..." : isSubmitted ? "Terkirim" : "Submit"}
                </p>
                </button>

            
                <button
                onClick={() => setIsOpenClass(false)}
                className="bg-white border-2 w-[80px] md:w-[100px] lg:w-[107px] hover:bg-[#FF5E53] hover:text-white h-[37px] text-[12px] md:text-[14px] font-poppins border-[#FF5E53] text-[#FF5E53] rounded-xl"
                >
                ← Kembali
                </button>
            </div>

            </div>
            <div>
                {!isTimeValid && !isSubmitted && (
                <div className="ml-2 p-2 mt-5 bg-red-100 border border-red-400 rounded-lg">
                    <p className="text-md text-red-700 font-medium">
                    ⚠️ Di luar jam absensi!
                    </p>
                </div>
                )}
            </div>
    </>
  );
}
