import { Send, ArrowLeft } from "lucide-react";

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
            ? "Data tanggal lampau sudah TERKUNCI." 
            : "Batas waktu cross-check hari ini telah berakhir.";
        messageStyle = "bg-red-100 border-red-400 text-red-700";
        isDisabled = true;
    }
    else {
        if (!isSubmitted && !canSubmit) {
            message = "Semua siswa harus diberi status sebelum submit!";
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
            <div className="bg-white shadow-md rounded-xl border border-gray-100 mt-4 overflow-hidden">
                <div className="p-4 flex flex-col xl:flex-row items-center justify-between gap-2">
                    
                    <div className="w-full md:w-auto flex justify-center md:justify-start border-b md:border-b-0 pb-3 xl:pb-0 border-gray-100">
                        <h1 className="text-[24px] md:text-xl font-semibold text-black tracking-tight">
                            Daftar Nama Siswa
                        </h1>
                    </div>

                    <div className="flex flex-col md:flex-row gap-x-2 gap-y-1 text-[13px] md:text-[17px] lg:text-[14px] justify-start md:justify-center items-center w-full lg:w-auto">
                        <p className="font-bold text-gray-600">Total:</p>
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

                    <div className="flex flex-col-reverse sm:flex-row w-full xl:w-auto gap-3 justify-end">

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isDisabled}
                            className={`flex items-center justify-center px-4 py-2.5 sm:py-2 text-sm font-medium text-white rounded-lg shadow-sm transition-all active:scale-95 w-full sm:w-auto
                                ${isDisabled 
                                    ? "bg-gray-400 cursor-not-allowed shadow-none" 
                                    : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                                }`}
                        >
                            <Send className="w-4 h-4 mr-2" />
                            {buttonText}
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsOpenClass()} 
                            className="flex items-center justify-center px-2 py-2.5 sm:py-2 text-sm font-semibold text-[#FF5E53] bg-white border border-[#FF5E53] rounded-lg hover:bg-red-50 active:scale-95 transition-all w-full sm:w-auto"
                        >
                            <ArrowLeft className="w-4 h-4 mr-1.5" />
                            Kembali
                        </button>
                    </div>
                </div>
            </div>

            {message && (
                <div className={`flex items-start p-4 mt-3 border rounded-lg ${messageStyle} shadow-sm animate-in fade-in slide-in-from-top-2 duration-300`}>
                    <p className="text-sm font-medium w-full text-center md:text-left">{message}</p>
                </div>
            )}
        </div>
    );
}