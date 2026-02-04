export function FirstLessonView({ setIsOpenClass }) {
  return (
    <div className="mx-5 mb-10 mt-5">
      <div className="p-8 bg-white shadow-xl rounded-xl border-t-4 border-blue-600 text-center">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">
          Absensi Jam Pelajaran ke-1 (RFID)
        </h2>
        <p className="text-gray-700 text-lg font-medium">
          Absensi jam pertama dilakukan otomatis menggunakan RFID.
        </p>
        <div className="mt-8">
          <button
            onClick={() => setIsOpenClass(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            ← Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
