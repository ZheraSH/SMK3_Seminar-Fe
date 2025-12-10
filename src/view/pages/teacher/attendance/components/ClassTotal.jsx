import { Send } from "lucide-react";

export default function TotalClass({
  setIsOpenClass,
  summary,
  handleSubmit,
  isSubmitted,
  canSubmit,
  submitting,
  isTimeValid,
}) {
  // ========================================
  // SAFE DEFAULT SUMMARY
  // ========================================
  const safeSummary = summary || {
    present: 0,
    alpha: 0,
    leave: 0,
    late: 0,
    sick: 0,
  };

  // ========================================
  // DEBUG
  // ========================================
  console.log("DEBUG TOTALCLASS:", {
    isSubmitted,
    canSubmit,
    submitting,
    isTimeValid,
    isButtonDisabled:
      submitting ||
      !isTimeValid ||
      (!canSubmit && !isSubmitted)
  });

  const timeValid = isTimeValid ?? true;

  // ========================================
  // DISABLE BUTTON RULE
  // ========================================
  const isButtonDisabled =
    submitting ||
    !timeValid ||
    (!canSubmit && !isSubmitted);

  // ========================================
  // BUTTON TEXT
  // ========================================
  let buttonText = "Submit";

  if (submitting) buttonText = "Mengirim...";
  else if (!timeValid) buttonText = "Lewat Waktu";
  else if (isSubmitted) buttonText = "Update";
  else if (!canSubmit) buttonText = "Lengkapi Status";

  // ========================================
  // MESSAGE
  // ========================================
  let message = null;

  if (!timeValid) {
    message = "⚠️ Waktu cross-check telah lewat (lebih dari 24 jam).";
  } else if (!canSubmit && !isSubmitted) {
    message = "⚠️ Semua siswa harus diberi status sebelum submit!";
  }

  return (
    <>
      <div className="flex gap-2 pb-2 flex-wrap h-full w-full justify-between bg-white shadow-md p-2 rounded-lg mt-4">

        <div className="md:pl-0 lg:pl-[10px] py-[8px]">
          <h1 className="text-lg font-semibold font-poppins">Daftar Nama Siswa</h1>
        </div>

        {/* SUMMARY */}
        <div className="flex gap-2 items-center text-[10px] lg:text-[14px] ">
          <p className="text-[#4E4D4D] font-poppins font-medium">Total Status:</p>
          <div className="flex gap-2">
            <p className="text-[#10B981] font-poppins font-medium">Hadir: {safeSummary.present}</p>
            <p className="text-[#646464]">|</p>
            <p className="text-[#FF5E53] font-poppins font-medium">Alpha: {safeSummary.alpha}</p>
            <p className="text-[#646464]">|</p>
            <p className="text-[#3B82F6] font-poppins font-medium">Izin: {safeSummary.leave}</p>
            <p className="text-[#646464]">|</p>
            <p className="text-[#FACC15] font-poppins font-medium">Terlambat: {safeSummary.late}</p>
            <p className="text-[#646464]">|</p>
            <p className="text-[#8B5CF6] font-poppins font-medium">Sakit: {safeSummary.sick}</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-[12px] items-center">
          <button
            onClick={handleSubmit}
            disabled={isButtonDisabled}
            className={`flex items-center w-[70px] md:w-[100px] lg:w-[100px] justify-center h-[30px] md:h-[37px] rounded-xl text-white font-poppins transition-all 
              ${
                isButtonDisabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }
            `}
          >
            <Send className="w-[12px] h-[12px] md:w-[20px] md:h-[20px]" />
            <p className="text-[8px] md:text-[13px] ml-1">{buttonText}</p>
          </button>

          <button
            onClick={() => setIsOpenClass(false)}
            className="bg-white border-2 w-[80px] md:w-[100px] lg:w-[100px] hover:bg-[#FF5E53] hover:text-white h-[30px] md:h-[35px] text-[12px] md:text-[14px] font-poppins border-[#FF5E53] text-[#FF5E53] rounded-xl"
          >
            ← Kembali
          </button>
        </div>
      </div>

      {/* MESSAGE */}
      {message && (
        <div className="mx-2 p-2 mt-3 bg-red-100 border border-red-400 rounded-lg">
          <p className="text-md text-red-700 font-medium">{message}</p>
        </div>
      )}
    </>
  );
}
