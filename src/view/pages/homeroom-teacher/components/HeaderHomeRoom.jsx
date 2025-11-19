import { GraduationCap, UsersRound } from "lucide-react";

const HeaderHomeRoom = () => {
  return (
    <div className="relative w-full h-[166px] mt-6 bg-[url('/images/background/bg03.png')] bg-center bg-cover bg-no-repeat rounded-[15px] mb-10 shadow-md">
      <div className="absolute inset-0 flex flex-col mt-2 rounded-[6px]">
        <div className="ml-6">
          <h1 className="text-white text-[30px] font-semibold drop-shadow-lg">
            Monitoring & Rekap Absensi Kelas
          </h1>
          <p className="text-white text-[14px] font-light drop-shadow-md">
            Lihat rekap dan statistik absensi kelas Anda
          </p>
          <div className="flex items-center mt-15 gap-2 text-white text-[14px]">
            <GraduationCap className="" />
            <p>XI PPLG 3</p>
            <p>|</p>
            <UsersRound className="w-5" />
            <p>36</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHomeRoom;
