export default function CardStudent ({student,loading,error}) {
    if (loading) {
        return (
            <div className="p-4 md:p-8 text-center text-blue-600">
                <p>Memuat data Siswa...</p>
            </div>
        )
    }
    if (error) {
        return (
            <div className="p-4 md:p-8 text-center text-red-500">
                <p>Gagal ambil data siswa...</p>
            </div>
        )
    }
    return (
        <div className="mt-5">
            <h1 className=" text-[18px] md:text-[24px] font-semibold text-black ml-2 ">Daftar Siswa</h1>
            <div className=" w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 md:gap-4 mt-4 ml-2 md:ml-0">
                {student.map((s) => (
                    <div
                    key={s.id}
                    className="relative bg-[url('/images/cardbg/CardBg.png')] bg-center w-[150px] h-[110px] md:w-[220px] md:h-[150px] mb-4 shadow-md hover:shadow-lg transition-shadow rounded-2xl flex flex-col items-center"
                    >
                        <img
                            src={s.image}
                            alt="student"
                            className=" w-[40px] h-[40px] md:w-[64px] md:h-[64px] rounded-full border border-white absolute left-1/2 -translate-x-1/2 top-[30px] z-30"
                        />
                        <div className="absolute bottom-0 bg-white w-full h-[60px] md:h-[82px] rounded-2xl flex items-center justify-center pt-5 pb-3 z-20">
                            <p className=" text-[10px] md:text-[14px] font-semibold text-black">{s.name}</p>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}