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
        message = "Periode cross-check BELUM DIBUKA.";
        messageStyle = "bg-yellow-100 border-yellow-400 text-yellow-700";
        isDisabled = true; 
    } 
    else if (!isTimeValid) {
        message = isPastDate 
            ? " Data tanggal lampau sudah TERKUNCI." 
            : " Batas waktu cross-check hari ini telah berakhir.";
        messageStyle = "bg-red-100 border-red-400 text-red-700";
        isDisabled = true;
    }
    // Jika waktu valid, cek status kelengkapan
    else {
        if (!isSubmitted && !canSubmit) {
            message = " Semua siswa harus diberi status sebelum submit!";
            messageStyle = "bg-orange-100 border-orange-400 text-orange-700";
            isDisabled = true;
        } else {
            message = isSubmitted 
                ? "Data sudah tersimpan. Anda dapat memperbaruinya jika perlu." 
                : "Data lengkap. Siap untuk pengiriman pertama.";
            messageStyle = "bg-green-50 border-green-400 text-green-700";
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
    // Sesuai JSON Postman: hadir, alpha, izin, terlambat, sakit
    const safeSummary = {
        present: summary?.present || 0,
        alpha: summary?.alpha || 0,
        leave: summary?.leave || 0,
        late: summary?.late || 0,
        sick: summary?.sick || 0,
        total: summary?.total || 0,
    };

    const { message, messageStyle, isDisabled, buttonText } = useSubmissionState({
        isFutureDate, 
        isPastDate, 
        isTimeValid, 
        isSubmitted, 
        canSubmit,
        submitting,
    });
    
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col md:flex-row lg:flex-nowrap items-stretch lg:items-center justify-between w-full bg-white shadow-md p-3 rounded-lg mt-4 gap-y-3 gap-x-2">
                
                <div className="flex-shrink-0 flex items-center">
                    <h1 className="text-lg md:text-[15px] font-semibold text-gray-800">Daftar Nama Siswa</h1>
                </div>

                <div className="flex flex-col md:flex-row gap-x-2 gap-y-1 text-[13px] lg:text-[14px] justify-start md:justify-center items-center w-full lg:w-auto">
                    <p className="font-bold text-gray-600">Ringkasan:</p>
                    <div className="flex gap-x-2 flex-wrap justify-center items-center">
                        <p className="text-[#10B981] font-medium">Hadir: {safeSummary.present}</p>
                        <span className="text-gray-300 hidden sm:inline">|</span>
                        <p className="text-[#FF5E53] font-medium">Alpha: {safeSummary.alpha}</p>
                        <span className="text-gray-300 hidden sm:inline">|</span>
                        <p className="text-[#3B82F6] font-medium">Izin: {safeSummary.leave}</p>
                        <span className="text-gray-300 hidden sm:inline">|</span>
                        <p className="text-[#FACC15] font-medium">Telat: {safeSummary.late}</p>
                        <span className="text-gray-300 hidden sm:inline">|</span>
                        <p className="text-[#8B5CF6] font-medium">Sakit: {safeSummary.sick}</p>
                    </div>
                </div>

                <div className="flex w-full md:w-auto gap-3 justify-center md:justify-end">
                    <button
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        className={`flex items-center px-4 justify-center h-[37px] rounded-md text-white text-sm transition-all shadow-sm
                            ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                    >
                        <Send className="w-4 h-4 mr-2" />
                        {buttonText}
                    </button>

                    <button
                        onClick={() => setIsOpenClass(false)}
                        className="flex justify-center items-center h-[37px] px-3 text-[#FF5E53] font-semibold border border-[#FF5E53] rounded-lg text-[13px] hover:bg-red-50 transition-colors"
                    >
                        ← Kembali
                    </button>
                </div>
            </div>

            {message && (
                <div className={`p-3 mt-3 border rounded-lg ${messageStyle} shadow-sm animate-in fade-in slide-in-from-top-1`}>
                    <p className="text-sm font-medium">{message}</p>
                </div>
            )}
        </div>
    );
}