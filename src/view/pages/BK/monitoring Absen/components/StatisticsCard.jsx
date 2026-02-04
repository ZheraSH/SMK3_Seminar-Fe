import { CircleCheckBig,ClipboardList,Activity,TriangleAlert } from "lucide-react";

export default function StatisticsCrad ({recap}) {

    return (
        <div className=" w-full h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-y-4 mx-3 mt-6 justify-center">
            <div className={` w-[150px] md:w-[220px] h-[125px] flex flex-col justify-center items-center gap-2 shadow-md rounded-2xl text-[#10B981] `}>                    
                <CircleCheckBig className="w-[24px] h-[24px]" />
                <p className="text-[12px] px-3 md:px-0 md:text-[14px] font-normal">Jumlah siswa hadir hari ini</p>
                <h2 className="text-[18px] md:text-xl font-semibold">{recap.jumlah_siswa_hadir_hari_ini} </h2>
            </div>
            <div className={` w-[150px] md:w-[220px]  h-[125px] flex flex-col justify-center items-center gap-2 shadow-md rounded-2xl text-[#FACC15]`}>                    
                <ClipboardList className="w-[24px] h-[24px]" />
                <p className=" text-[12px] px-3 md:px-0 md:text-[14px] font-normal">Jumlah siswa izin hari ini</p>
                <h2 className="text-[18px] md:text-xl font-semibold">{recap.jumlah_siswa_izin_hari_ini} </h2>
            </div>
            <div className={` w-[150px] md:w-[220px]  h-[125px] flex flex-col justify-center items-center gap-2 shadow-md rounded-2xl text-[#3B82F6] `}>                    
                <Activity className="w-[24px] h-[24px]"/>
                <p className="text-[12px] px-3 md:px-0 md:text-[14px] font-normal">Jumlah siswa sakit hari ini</p>
                <h2 className="text-[18px] md:text-xl font-semibold">{recap.jumlah_siswa_sakit_hari_ini} </h2>
            </div>
            <div className={` w-[150px] md:w-[220px]  h-[125px] flex flex-col justify-center items-center gap-2 shadow-md rounded-2xl text-[#FF5E53] `}>                    
                <TriangleAlert className="w-[24px] h-[24px]" />
                <p className="text-[12px] px-3 md:px-0 md:text-[14px] font-normal">Jumlah siswa alpha hari ini</p>
                <h2 className="text-[18px] md:text-xl font-semibold">{recap.jumlah_siswa_alpha_hari_ini} </h2>
            </div>
     </div>
    );
}