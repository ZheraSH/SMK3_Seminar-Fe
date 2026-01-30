import { Send, ChevronLeft, Users, AlertCircle, ArrowLeft, Clock, CheckCircle2, ClipboardCheck, AlertTriangle } from "lucide-react";
import LoadingData from "../../../../components/elements/loadingData/loading";

export default function TotalClass({ setIsOpenClass, summary, handleSubmit, isSubmitted,loading, canSubmit, submitting, isTimeValid, selectedClass, lessonSchedule, isPastDate, isFutureDate }) {
  const safeSummary = summary || { present: 0, alpha: 0, leave: 0, late: 0, sick: 0 };
  const timeValid = isTimeValid ?? true;
  const sesiDisplay = selectedClass?.lesson?.order_display || selectedClass?.lesson_order;

  const startTime = lessonSchedule?.lesson_hour?.start_time?.substring(0, 5);
  const endTime = lessonSchedule?.lesson_hour?.end_time?.substring(0, 5);
  const timeRange = startTime && endTime ? `${startTime} - ${endTime}` : null;

  const isButtonDisabled = submitting || !timeValid || (!canSubmit && !isSubmitted);

  let buttonText = "Submit";
  if (submitting) buttonText = "Mengirim...";
  else if (isFutureDate) buttonText = "Belum Mulai";
  else if (!isTimeValid) buttonText = "Expired";
  else if (isSubmitted) buttonText = "Update";
  else if (!canSubmit) buttonText = "Lengkapi";

  let message = null;
  if (isFutureDate) {
    message = timeRange ? `Waktu absensi belum dimulai. Sesi ini dapat diisi mulai pukul ${startTime}.` : "Waktu absensi belum dimulai.";
  } else if (!isTimeValid) {
    message = timeRange ? `Waktu cross-check telah lewat. Batas waktu pengisian adalah pukul ${endTime}.` : "Waktu cross-check telah lewat.";
  } else if (!canSubmit && !isSubmitted) {
    message = "Semua siswa harus diberi status sebelum mengirim.";
  }

  return (
    <div className="w-full space-y-6">
      {loading? (<LoadingData loading={loading} type="headerDaftarSiswa" />)
      :(
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 ">
            <div>
              <h1 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                Daftar Nama Siswa
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Ringkasan kehadiran hari ini
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button onClick={handleSubmit} disabled={isButtonDisabled} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-100
                  ${isButtonDisabled ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none" : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"}`}>
                <Send className={`w-4 h-4 ${submitting ? "animate-pulse" : ""}`} />
                {buttonText}
              </button>
              <button onClick={() => setIsOpenClass(false)} className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#FF5E53] text-[#FF5E53] hover:bg-gray-50 transition-all font-medium text-sm">
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {loading?(<LoadingData loading={loading} type="statusCardsFive" />)
      :(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatusCard label="Total Hadir" count={safeSummary.present} color="bg-emerald-500" icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />} iconBg="bg-emerald-50" />
          <StatusCard label="Total Telat" count={safeSummary.late} color="bg-amber-500" icon={<Clock className="w-5 h-5 text-amber-500" />} iconBg="bg-amber-50" />
          <StatusCard label="Total Izin" count={safeSummary.leave} color="bg-blue-500" icon={<ClipboardCheck className="w-5 h-5 text-blue-500" />} iconBg="bg-blue-50" />
          <StatusCard label="Total Sakit" count={safeSummary.sick} color="bg-purple-500" icon={<Users className="w-5 h-5 text-purple-500" />} iconBg="bg-purple-50" />
          <StatusCard label="Total Alpha" count={safeSummary.alpha} color="bg-rose-500" icon={<AlertTriangle className="w-5 h-5 text-rose-500" />} iconBg="bg-rose-50" />
        </div>
      )}

      {loading?(<LoadingData loading={loading} type="create"/>):message && (
        <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="text-sm text-amber-800 font-medium">{message}</p>
        </div>
      )}
    </div>
  );
}

function StatusCard({ label, count, color, icon, iconBg }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
      <div className={`absolute left-0 top-1/4 bottom-1/4 w-1 rounded-r-full ${color}`}></div>
      <div className="ml-2">
        <span className="text-2xl font-bold text-gray-900 block leading-none">{count}</span>
        <span className="text-[12px] font-medium text-gray-400 mt-1 block">{label}</span>
      </div>

      <div className={`p-2.5 rounded-xl ${iconBg}`}>
        {icon}
      </div>
    </div>
  );
}