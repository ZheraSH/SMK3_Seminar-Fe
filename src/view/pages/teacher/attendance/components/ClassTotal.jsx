import { Send } from "lucide-react";
const useSubmissionState = ({ 
    isFutureDate, 
    isPastDate, 
    isTimeValid, 
    isSubmitted, 
    canSubmit, 
    submitting 
}) => {
    let message = null;
    let messageStyle = "";
    let isDisabled = submitting; 
    let buttonText = isSubmitted ? "Update" : "Submit";
    
    if (submitting) {
        buttonText = isSubmitted ? "Memperbarui..." : "Mengirim...";
    }

    if (isFutureDate) {
        message = "⚠️ Periode cross-check BELUM DIBUKA. Silakan kembali pada hari yang sesuai.";
        messageStyle = "bg-yellow-100 border-yellow-400 text-yellow-700";
        isDisabled = true; 
    } 
    else if (!isTimeValid) {
        if (isPastDate) {
            message = "🛑 Data tanggal lampau sudah TERKUNCI. Batas waktu update telah berakhir.";
        } else {
            message = "🛑 Batas waktu cross-check telah berakhir untuk hari ini. Tidak dapat submit/update.";
        }
        messageStyle = "bg-red-100 border-red-400 text-red-700";
        isDisabled = true;
    }
    else if (isTimeValid) {
        if (isSubmitted) { 
            message = isPastDate 
                ? "✅ Anda masih diizinkan memperbarui data tanggal lampau ini." 
                : "✅ Absensi sudah tersubmit. Anda dapat mengubah dan memperbaruinya.";
            messageStyle = "bg-green-100 border-green-400 text-green-700";
            isDisabled = submitting; 
        } else if (!canSubmit) { 
            message = "⚠️ Semua siswa harus diberi status sebelum submit!";
            messageStyle = "bg-red-100 border-red-400 text-red-700";
            isDisabled = true; 
        } else {
            message = "📝 Data lengkap. Siap untuk pengiriman pertama.";
            messageStyle = "bg-blue-100 border-blue-400 text-blue-700";
            isDisabled = submitting; 
        }
    }

    return { message, messageStyle, isDisabled, buttonText };
};


export default function TotalClass({
    setIsOpenClass,
    summary,
    handleSubmit,
    isSubmitted,
    canSubmit,
    submitting,
    isTimeValid,
    isPastDate, 
    isFutureDate,
}) {
    const safeSummary = summary || {
        present: 0, alpha: 0, leave: 0, late: 0, sick: 0, total: summary?.total || 0,
    };

    const { 
        message, 
        messageStyle, 
        isDisabled: isButtonDisabled, 
        buttonText 
    } = useSubmissionState({
        isFutureDate, 
        isPastDate, 
        isTimeValid: isTimeValid ?? false, 
        isSubmitted, 
        canSubmit,
        submitting,
    });
    
    return (
        <>
            <div className="flex flex-col md:flex-row lg:flex-row lg:flex-nowrap  items-stretch lg:items-center justify-between w-full bg-white shadow-md p-3 rounded-lg mt-4 gap-y-3 gap-x-2">

                <div className="order-1 flex-shrink-0 flex items-center">
                    <h1 className="text-lg md:text-[15px] font-semibold font-poppins text-gray-800">Daftar Nama Siswa</h1>
                </div>
                <div className=" order-2 flex flex-col md:flex-row gap-x-1 gap-y-1 text-[14px] md:text-[12px] lg:text-[15px] font-poppins justify-start md:justify-center items-center w-full lg:w-auto  lg:mt-0">
                        <p className="font-medium text-gray-600 text-[16px] md:text-[12px] lg:text-[15px] ">Total:</p>
                        <div className="flex gap-x-1.5 flex-wrap justify-center items-center">
                            <p className="text-[#10B981] font-medium">Hadir: {safeSummary.present}</p>
                            <span className="text-gray-300 hidden sm:inline">|</span>
                            <p className="text-[#FF5E53] font-medium">Alpha: {safeSummary.alpha}</p>
                            <span className="text-gray-300 hidden sm:inline">|</span>
                            <p className="text-[#3B82F6] font-medium">Izin: {safeSummary.leave}</p>
                            <span className="text-gray-300 hidden sm:inline">|</span>
                            <p className="text-[#FACC15] font-medium">Terlambat: {safeSummary.late}</p>
                            <span className="text-gray-300 hidden sm:inline">|</span>
                            <p className="text-[#8B5CF6] font-medium">Sakit: {safeSummary.sick}</p>
                        </div>
                </div>
                <div className=" order-3 flex w-full md:w-auto flex-col md:flex-row gap-3 md:ml-2 justify-center md:justify-end md:items-center">
                        <button
                            onClick={handleSubmit}
                            disabled={isButtonDisabled}
                            className={`flex items-center  md:w-[100px] justify-center h-[37px] rounded-md text-white font-poppins text-sm transition-all 
                                ${
                                    isButtonDisabled
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-blue-600 hover:bg-blue-700 shadow-md"
                                }
                            `}
                        >
                            <Send className="w-[16px] h-[16px]" />
                            <p className="ml-2">{buttonText}</p>
                        </button>

                        <button
                            onClick={() => setIsOpenClass(false)}
                            className="flex justify-center items-center h-[37px] md:w-[100px] px-3 space-x-1 text-[#FF5E53] font-semibold border border-[#FF5E53] rounded-lg text-[13px] hover:bg-red-50 transition-colors"
                        >
                            ← Kembali
                        </button>
                    </div>
                </div>
            {message && (
                <div className={` p-3 mt-3 border rounded-lg ${messageStyle} shadow-sm`}>
                    <p className="text-sm font-medium">{message}</p>
                </div>
            )}
        </>
    );
}