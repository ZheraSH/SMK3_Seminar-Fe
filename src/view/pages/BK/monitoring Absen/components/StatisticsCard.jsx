import { CircleCheckBig,ClipboardList,Activity,TriangleAlert } from "lucide-react";

export default function StatisticsCrad ({recap}) {

    return (
        <div className="w-[1097px] h-[125px] flex gap-10 mt-6 ml-3">
            <div className={` w-[250px] h-[125px] flex flex-col justify-center items-center gap-2 shadow-md rounded-2xl text-[#10B981] `}>                    
                <CircleCheckBig className="w-[24px] h-[24px]" />
                <p className="text-[14px] font-normal">Jumlah siswa hadir hari ini</p>
                <h2 className="text-[22px] font-semibold">{recap.jumlah_siswa_hadir_hari_ini} </h2>
            </div>
            <div className={` w-[250px] h-[125px] flex flex-col justify-center items-center gap-2 shadow-md rounded-2xl text-[#FACC15]`}>                    
                <ClipboardList className="w-[24px] h-[24px]" />
                <p className="text-[14px] font-normal">Jumlah siswa izin hari ini</p>
                <h2 className="text-[22px] font-semibold">{recap.jumlah_siswa_izin_hari_ini} </h2>
            </div>
            <div className={` w-[250px] h-[125px] flex flex-col justify-center items-center gap-2 shadow-md rounded-2xl text-[#3B82F6] `}>                    
                <Activity className="w-[24px] h-[24px]"/>
                <p className="text-[14px] font-normal">Jumlah siswa sakit hari ini</p>
                <h2 className="text-[22px] font-semibold">{recap.jumlah_siswa_sakit_hari_ini} </h2>
            </div>
            <div className={` w-[250px] h-[125px] flex flex-col justify-center items-center gap-2 shadow-md rounded-2xl text-[#FF5E53] `}>                    
                <TriangleAlert className="w-[24px] h-[24px]" />
                <p className="text-[14px] font-normal">Jumlah siswa alpha hari ini</p>
                <h2 className="text-[22px] font-semibold">{recap.jumlah_siswa_alpha_hari_ini} </h2>
            </div>
     </div>
    );
}