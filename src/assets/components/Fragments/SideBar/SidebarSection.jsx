import { Contact, Home, UserRound, DoorOpen, IdCardLanyard, Calendar1, ChartColumnBig } from "lucide-react";

const SidebarSection = () => {
  return (
    <>
    <div className="bg-[#1E3A8A] w-[250px] h-screen fixed">
        <div className="flex justify-center items-center px-10 gap-3">
            <img className="w-10 h-10 "  src="images/SMKNLOGO1.png" alt="" />
            <div className="flex flex-col items-center justify-center h-20 text-white font-bold">
                SMKN Negri 3 Pamekasan
            </div>
        </div>
      

      <div className="p-6 text-white">
        <div className="flex items-center gap-3 duration-300 hover:bg-white hover:rounded hover:text-[#1E3A8A] p-2 font-bold mb-3 cursor-pointer">
          <Home size={20} />
          <span><a href="">Home</a></span>
        </div>

        <div className="flex items-center gap-3 duration-300 hover:bg-white hover:rounded hover:text-[#1E3A8A] p-2 font-bold mb-3 cursor-pointer">
          <Contact size={20} />
          <span><a href="">Guru</a></span>
        </div>

        <div className="flex items-center gap-3 duration-300 hover:bg-white hover:rounded hover:text-[#1E3A8A] p-2 font-bold mb-3 cursor-pointer">
          <UserRound size={20} />
          <span><a href="">Siswa</a></span>
        </div>

        <div className="flex items-center gap-3 duration-300 hover:bg-white hover:rounded hover:text-[#1E3A8A] p-2 font-bold mb-3 cursor-pointer">
          <DoorOpen size={20} />
          <span><a href="">Kelas & Jurusan</a></span>
        </div>

        <div className="flex items-center gap-3 duration-300 hover:bg-white hover:rounded hover:text-[#1E3A8A] p-2 font-bold mb-3 cursor-pointer">
          <IdCardLanyard size={20} />
          <span><a href="">RFID</a></span>
        </div>

        <div className="flex items-center gap-3 duration-300 hover:bg-white hover:rounded hover:text-[#1E3A8A] p-2 font-bold mb-3 cursor-pointer">
          <Calendar1 size={20} />
          <span><a href="">Tahun Ajaran</a></span>
        </div>

        <div className="flex items-center gap-3 duration-300 hover:bg-white hover:rounded hover:text-[#1E3A8A] p-2 font-bold mb-3 cursor-pointer">
          <ChartColumnBig size={20} />
          <span><a href="">Rekap Absensi</a></span>
        </div>

        <div className="flex items-center gap-3 duration-300 hover:bg-white hover:rounded hover:text-[#1E3A8A] p-2 font-bold mb-3 cursor-pointer">
          <ChartColumnBig size={20} />
          <span><a href="">Jadwal Pelajaran</a></span>
        </div>


      </div>
    </div>
    </>
  )
}

export default SidebarSection;