export default function CardStudent ({currentStudents}) {
    return (
        <div className="mt-5">
            <h1 className="text-[24px] font-semibold text-black">Daftar Siswa</h1>
            <div className="w-[1090px] grid grid-cols-4 gap-4 mt-4">

            {currentStudents.map((s) => (
                <div
                key={s.id}
                className="relative bg-[url('/images/cardbg/CardBg.png')] bg-center w-[220px] h-[150px] mb-4 shadow-md hover:shadow-lg transition-shadow rounded-2xl flex flex-col items-center"
                >
                    <img
                        src={s.img}
                        alt=""
                        className="w-[64px] h-[64px] rounded-full border border-white absolute left-1/2 -translate-x-1/2 top-[30px] z-30"
                    />
                    <div className="absolute bottom-0 bg-white w-full h-[82px] rounded-2xl flex items-center justify-center pt-5 pb-3 z-20">
                        <p className="text-[14px] font-semibold text-black">{s.name}</p>
                    </div>
                </div>
            ))}

            </div>
        </div>
    );
}